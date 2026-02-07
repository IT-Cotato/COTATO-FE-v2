'use client';

import {useRef} from 'react';
import {
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from '@dnd-kit/core';
import {sortableKeyboardCoordinates} from '@dnd-kit/sortable';
import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {ImageInfo} from '@/schemas/project/project-type';
import {ImagePreviewer} from './ImagePreviewer';
import {ImageSortableList} from './ImageSortableList';
import {useImageUpload} from '../_hooks/useImageUpload';

export const ImageUploadField = ({
  onImagesChange,
}: {
  onImagesChange: (imgs: ImageInfo[]) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    images,
    selectedImage,
    setSelectedId,
    handleUpload,
    handleReorder,
    handleRemove,
  } = useImageUpload(onImagesChange);

  const sensors = useSensors(
    useSensor(PointerSensor, {activationConstraint: {distance: 8}}),
    useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates})
  );

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleUpload(e.target.files);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className='flex w-full gap-4'>
      <div className='flex flex-col gap-4.75'>
        <ImagePreviewer selectedImage={selectedImage} onRemove={handleRemove} />
        <FullButton
          label='이미지 업로드'
          labelTypo='body_l_sb'
          height={46}
          borderRadius={5}
          backgroundColor='neutral-400'
          textColor='neutral-50'
          onClick={() => fileInputRef.current?.click()}
        />
        <input
          type='file'
          ref={fileInputRef}
          className='hidden'
          accept='.jpg,.png,.jpeg'
          multiple
          onChange={onFileChange}
        />
      </div>
      <ImageSortableList
        images={images}
        sensors={sensors}
        onDragEnd={handleReorder}
        onSelect={setSelectedId}
      />
    </div>
  );
};
