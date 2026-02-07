import {useState, useCallback} from 'react';
import {ImageInfo} from '@/schemas/project/project-type';
import {DragEndEvent} from '@dnd-kit/core';
import {arrayMove} from '@dnd-kit/sortable';

export const useImageUpload = (
  onImagesChange: (images: ImageInfo[]) => void
) => {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const updateImages = useCallback(
    (newImages: ImageInfo[]) => {
      setImages(newImages);
      onImagesChange(newImages);
    },
    [onImagesChange]
  );

  // 업로드 시뮬레이션
  const handleUpload = async (files: FileList) => {
    const newUploadedImages = await Promise.all(
      Array.from(files).map(async (file) => {
        const mockS3Key = `projects/${Date.now()}-${file.name}`;
        await new Promise((resolve) => setTimeout(resolve, 500));
        return {
          id: Math.random().toString(36).slice(2, 11),
          s3Key: mockS3Key,
          publicUrl: URL.createObjectURL(file),
          order: 0,
        };
      })
    );

    setImages((prev) => {
      const updated = [
        ...prev,
        ...newUploadedImages.map((img, idx) => ({
          ...img,
          order: prev.length + idx + 1,
        })),
      ];
      onImagesChange(updated);
      if (prev.length === 0 && updated.length > 0) setSelectedId(updated[0].id);
      return updated;
    });
  };

  const handleReorder = (event: DragEndEvent) => {
    const {active, over} = event;
    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((item) => item.id === active.id);
      const newIndex = images.findIndex((item) => item.id === over.id);
      const newArray = arrayMove(images, oldIndex, newIndex);
      updateImages(
        newArray.map((item, index) => ({...item, order: index + 1}))
      );
    }
  };

  const handleRemove = (id: string) => {
    const target = images.find((img) => img.id === id);
    if (target) URL.revokeObjectURL(target.publicUrl);

    const filtered = images.filter((img) => img.id !== id);
    const updated = filtered.map((item, index) => ({
      ...item,
      order: index + 1,
    }));
    updateImages(updated);
    if (selectedId === id)
      setSelectedId(updated.length > 0 ? updated[0].id : null);
  };

  return {
    images,
    selectedImage: images.find((img) => img.id === selectedId),
    setSelectedId,
    handleUpload,
    handleReorder,
    handleRemove,
  };
};
