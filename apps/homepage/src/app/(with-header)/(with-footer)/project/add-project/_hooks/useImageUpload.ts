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

  const handleUpload = async (files: FileList) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const filteredFiles = Array.from(files).filter((file) =>
      allowedTypes.includes(file.type)
    );

    if (filteredFiles.length === 0) {
      alert('JPG, JPEG, PNG 파일만 업로드 가능합니다.');
      return;
    }

    const newUploadedImages = await Promise.all(
      filteredFiles.map(async (file) => {
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

    const updated = [
      ...images,
      ...newUploadedImages.map((img, idx) => ({
        ...img,
        order: images.length + idx + 1,
      })),
    ];

    updateImages(updated);
    if (images.length === 0 && updated.length > 0) setSelectedId(updated[0].id);
  };

  const handleReorder = (event: DragEndEvent) => {
    const {active, over} = event;
    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((item) => item.id === active.id);
      const newIndex = images.findIndex((item) => item.id === over.id);
      const newArray = arrayMove(images, oldIndex, newIndex);
      const updated = newArray.map((item, index) => ({
        ...item,
        order: index + 1,
      }));
      updateImages(updated);
    }
  };

  const handleRemove = (id: string) => {
    const target = images.find((img) => img.id === id);
    if (target) URL.revokeObjectURL(target.publicUrl);

    const filtered = images.filter((img) => img.id !== id);
    const updated = filtered.map((prev, index) => ({
      ...prev,
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
