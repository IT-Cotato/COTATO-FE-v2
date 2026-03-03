import {useState} from 'react';
import {
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {arrayMove} from '@dnd-kit/sortable';
import {SessionImage} from '@/schemas/admin/admin-sessions.schema';
import {
  useDeleteSessionImage,
  useUploadSessionImage,
  useChangeSessionImageOrder,
} from '@/hooks/mutations/useSession.mutation';

export const MAX_IMAGES = 5;

interface UseSessionImageCarouselParams {
  sessionId: number;
  images: SessionImage[];
  onChange: (updater: (prev: SessionImage[]) => SessionImage[]) => void;
}

export const useSessionImageCarousel = ({
  sessionId,
  images,
  onChange,
}: UseSessionImageCarouselParams) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const safeIndex =
    images.length === 0 ? -1 : Math.min(currentIndex, images.length - 1);
  const currentImage = safeIndex >= 0 ? images[safeIndex] : null;
  const canAddMore = images.length < MAX_IMAGES;

  const sensors = useSensors(
    useSensor(PointerSensor, {activationConstraint: {distance: 5}})
  );

  const handlePrev = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => Math.min(images.length - 1, prev + 1));
  const handleThumbnailClick = (index: number) => setCurrentIndex(index);

  const {mutate: uploadImage} = useUploadSessionImage();
  const {mutate: deleteImage} = useDeleteSessionImage();
  const {mutate: changeOrder} = useChangeSessionImageOrder();

  const handleAdd = (file: File) => {
    if (images.length >= MAX_IMAGES) {
      alert(`이미지는 최대 ${MAX_IMAGES}장까지 추가할 수 있습니다.`);
      return;
    }

    const nextOrder =
      images.length === 0 ? 0 : Math.max(...images.map((img) => img.order)) + 1;
    uploadImage(
      {sessionId, file, order: nextOrder},
      {
        onSuccess: (newImage) => {
          onChange((prev) => [
            ...prev,
            {
              imageId: newImage.imageId,
              imageUrl: newImage.imageUrl,
              s3Key: newImage.s3Key,
              order: newImage.order ?? nextOrder,
            },
          ]);
          setCurrentIndex(images.length);
        },
      }
    );
  };

  const handleDelete = () => {
    if (safeIndex < 0) return;
    const imageToDelete = images[safeIndex];

    if (imageToDelete.imageId < 0) {
      // 새 세션 임시 이미지: API 호출 없이 로컬 상태만 업데이트
      URL.revokeObjectURL(imageToDelete.imageUrl);
      onChange((prev) =>
        prev
          .filter((img) => img.imageId !== imageToDelete.imageId)
          .map((img, i) => ({...img, order: i}))
      );
      setCurrentIndex((prev) => Math.max(0, prev - 1));
      return;
    }

    deleteImage(
      {imageId: imageToDelete.imageId, sessionId},
      {
        onSuccess: () => {
          onChange((prev) =>
            prev
              .filter((img) => img.imageId !== imageToDelete.imageId)
              .map((img, i) => ({...img, order: i}))
          );
          setCurrentIndex((prev) => Math.max(0, prev - 1));
        },
      }
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;
    if (!over || active.id === over.id) return;

    const oldIdx = images.findIndex((img) => img.imageId === active.id);
    const newIdx = images.findIndex((img) => img.imageId === over.id);
    if (oldIdx === -1 || newIdx === -1) return;

    const newImages = arrayMove(images, oldIdx, newIdx).map((img, i) => ({
      ...img,
      order: i,
    }));

    onChange(() => newImages);
    setCurrentIndex(newIdx);

    if (sessionId !== -1) {
      changeOrder({
        sessionId,
        orderInfos: newImages.map((img) => ({
          imageId: img.imageId,
          order: img.order,
        })),
      });
    }
  };

  return {
    safeIndex,
    currentImage,
    canAddMore,
    sensors,
    handlePrev,
    handleNext,
    handleThumbnailClick,
    handleAdd,
    handleDelete,
    handleDragEnd,
  };
};
