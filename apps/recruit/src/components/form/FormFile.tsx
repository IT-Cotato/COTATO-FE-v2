'use client';

import {
  forwardRef,
  useEffect,
  useMemo,
  useState,
  type InputHTMLAttributes,
} from 'react';
import clsx from 'clsx';
import FolderIcon from '@/assets/icons/folder.svg';
import DeleteIcon from '@/assets/icons/delete.svg';
import {formFieldStyles} from '@/components/form/form.styles';

interface FormFileProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  placeholder?: string;
  value?: string[];
  maxCount?: number;
  maxSize?: number;
  onFilesChange?: (files: File[]) => void;
  isUploading?: boolean;
}

export const FormFile = forwardRef<HTMLInputElement, FormFileProps>(
  function FormFile(
    {
      label,
      className,
      placeholder,
      value,
      onFilesChange,
      maxCount,
      maxSize,
      isUploading,
      ...props
    },
    ref
  ) {
    const [files, setFiles] = useState<File[]>([]);

    const fileUrls = useMemo(() => {
      return files.map((f) => URL.createObjectURL(f));
    }, [files]);

    useEffect(() => {
      const urls = files.map((f) => URL.createObjectURL(f));
      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    }, [files]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.readOnly || isUploading) return;
      if (!e.target.files || e.target.files.length === 0) return;

      const newFiles = Array.from(e.target.files);

      const existingCount =
        files.length > 0 ? files.length : (value?.length ?? 0);
      if (maxCount && existingCount + newFiles.length > maxCount) {
        alert(`파일은 최대 ${maxCount}개까지 업로드할 수 있습니다.`);
        e.target.value = '';
        return;
      }

      if (maxSize) {
        const oversizedFiles = newFiles.filter((file) => file.size > maxSize);
        if (oversizedFiles.length > 0) {
          const maxSizeMB = Math.floor(maxSize / (1024 * 1024));
          alert(`파일 크기는 ${maxSizeMB}MB 이하여야 합니다.`);
          e.target.value = '';
          return;
        }
      }

      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
      e.target.value = '';
    };

    const handleDelete = (index: number) => {
      if (props.readOnly || isUploading) return;
      const updatedFiles = files.filter((_, i) => i !== index);
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
    };

    /**
     * 파일 렌더링
     * readOnly: value가 url로 전달됨.
     * edit: value가 파일명으로 전달됨.
     *
     * value가 없으면 (undefined 또는 빈 배열) files도 무시하고 빈 배열 반환
     * → 외부에서 value 초기화 시 UI도 빈 상태로 표시
     */
    const filesToRender =
      !value || value.length === 0
        ? []
        : props.readOnly
          ? value.map((name) => ({name, url: name}))
          : files.length > 0
            ? files.map((f, i) => ({name: f.name, url: fileUrls[i]}))
            : value.map((name) => ({name, url: ''}));

    return (
      <div className={clsx(formFieldStyles.wrapper, className)}>
        {label && (
          <label className={clsx(formFieldStyles.label, className)}>
            {label}
          </label>
        )}

        {filesToRender.map((file, index) => (
          <div
            key={index}
            className={clsx(
              formFieldStyles.field,
              'mb-2 flex h-18.25 flex-row items-center rounded-[10px] px-10 py-4 text-h5 text-black'
            )}>
            <FolderIcon />
            {props.readOnly ? (
              <a
                href={file.url || '#'}
                download={file.name}
                className='flex w-full justify-center truncate underline'
                target='_blank'
                rel='noopener noreferrer'>
                {file.name}
              </a>
            ) : (
              <>
                <span className='flex w-full justify-center truncate'>
                  {file.name}
                </span>
                <button type='button' onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </button>
              </>
            )}
          </div>
        ))}

        {!props.readOnly && (
          <label
            className={clsx(
              'flex h-19 items-center justify-center rounded-[10px] bg-neutral-400 px-10 py-4 text-center text-h5 text-white',
              isUploading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
            )}>
            <span>{isUploading ? '파일 업로드 중입니다' : placeholder}</span>
            <input
              ref={ref}
              type='file'
              accept='.pdf'
              multiple
              className='hidden'
              disabled={isUploading}
              onChange={handleChange}
              {...props}
            />
          </label>
        )}
      </div>
    );
  }
);
