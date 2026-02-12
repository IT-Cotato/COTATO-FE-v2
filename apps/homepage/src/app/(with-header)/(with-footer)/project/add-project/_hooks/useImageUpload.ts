import {useState, useCallback} from 'react';
import {ImageInfo} from '@/schemas/project/project-type';
import {DragEndEvent} from '@dnd-kit/core';
import {arrayMove} from '@dnd-kit/sortable';
import {
  getPresignedUrl,
  uploadFileToS3,
} from '@/services/api/project/project.api';

export const useImageUpload = (
  onImagesChange: (images: ImageInfo[]) => void,
  initialImages: ImageInfo[] = []
) => {
  const [images, setImages] = useState<ImageInfo[]>(initialImages);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialImages.length > 0 ? initialImages[0].id : null
  );

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

    try {
      const newUploadedImages = await Promise.all(
        filteredFiles.map(async (file) => {
          // Presigned URL 요청
          const {presignedUrl, s3Key} = await getPresignedUrl({
            fileName: file.name,
            contentType: file.type,
          });

          // 발급받은 URL로 S3에 파일 업로드
          await uploadFileToS3(presignedUrl, file);

          return {
            id: s3Key, // id를 s3Key로 사용
            s3Key: s3Key,
            publicUrl: URL.createObjectURL(file), // 미리보기용 Blob URL
            order: 0,
          };
        })
      );

      const updated = [
        ...images,
        ...newUploadedImages.map((img, idx) => ({
          ...img,
          order: images.length + idx,
        })),
      ];
      updateImages(updated);

      updateImages(updated);
      if (images.length === 0 && updated.length > 0)
        setSelectedId(updated[0].id);
    } catch (error) {
      console.error(error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    }
  };

  const handleReorder = (event: DragEndEvent) => {
    const {active, over} = event;
    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((item) => item.id === active.id);
      const newIndex = images.findIndex((item) => item.id === over.id);
      const newArray = arrayMove(images, oldIndex, newIndex);
      const updated = newArray.map((item, index) => ({
        ...item,
        order: index,
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
      order: index,
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
