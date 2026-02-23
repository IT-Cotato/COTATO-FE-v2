import {useState} from 'react';
import {
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {arrayMove} from '@dnd-kit/sortable';
import {SessionImage} from '@/schemas/admin/session.schema';
import {
  useDeleteSessionImage,
  useUploadSessionImage,
  useChangeSessionImageOrder,
} from '@/hooks/mutations/useSession.mutation';

const MAX_IMAGES = 5;

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
    uploadImage(
      {sessionId, file, order: images.length},
      {
        onSuccess: (newImage) => {
          onChange((prev) => [
            ...prev,
            {
              imageId: newImage.imageId,
              imageUrl: newImage.imageUrl,
              s3Key: newImage.s3Key,
              order: newImage.order,
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

    deleteImage(imageToDelete.imageId, {
      onSuccess: () => {
        onChange((prev) =>
          prev
            .filter((img) => img.imageId !== imageToDelete.imageId)
            .map((img, i) => ({...img, order: i}))
        );
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      },
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;
    if (!over || active.id === over.id) return;

    let newImages: SessionImage[] = [];

    onChange((prev) => {
      const oldIdx = prev.findIndex((img) => img.imageId === active.id);
      const newIdx = prev.findIndex((img) => img.imageId === over.id);
      if (oldIdx === -1 || newIdx === -1) return prev;

      newImages = arrayMove(prev, oldIdx, newIdx).map((img, i) => ({
        ...img,
        order: i,
      }));

      setTimeout(() => setCurrentIndex(newIdx), 0);
      return newImages;
    });

    if (sessionId !== -1 && newImages.length > 0) {
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
