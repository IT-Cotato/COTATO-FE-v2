'use client';

import {forwardRef, useState, type InputHTMLAttributes} from 'react';
import clsx from 'clsx';
import FolderIcon from '@/assets/icons/folder.svg';
import DeleteIcon from '@/assets/icons/delete.svg';
import {formFieldStyles} from '@/components/form/form.styles';

interface FormFileProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  placeholder?: string;
  value?: string[];
}

export const FormFile = forwardRef<HTMLInputElement, FormFileProps>(
  function FormFile({label, className, placeholder, value, ...props}, ref) {
    const [files, setFiles] = useState<File[]>([]);
    const [fileUrls] = useState(() =>
      props.readOnly && value ? value.map((v) => v) : []
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.readOnly) return;
      if (!e.target.files || e.target.files.length === 0) return;

      const newFile = e.target.files[0];
      if (newFile) {
        setFiles((prev) => [...prev, newFile]);
      }

      e.target.value = '';
    };

    const handleDelete = (index: number) => {
      if (props.readOnly) return;
      setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const filesToRender =
      props.readOnly && value
        ? value.map((name, i) => ({name, url: fileUrls[i]}))
        : files.map((f) => ({name: f.name, url: URL.createObjectURL(f)}));

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
          <label className='flex h-19 cursor-pointer items-center justify-center rounded-[10px] bg-neutral-100 px-10 py-4 text-center text-h5 text-neutral-400'>
            <span>{placeholder}</span>
            <input
              ref={ref}
              type='file'
              accept='.pdf'
              multiple
              className='hidden'
              onChange={handleChange}
              {...props}
            />
          </label>
        )}
      </div>
    );
  }
);
