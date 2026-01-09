'use client';

import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import clsx from 'clsx';
import DeleteIcon from '@/assets/icons/delete.svg';
import {formFieldStyles} from '@/components/form/form.styles';

interface FormLinkProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  placeholder?: string;
  value?: string;
}

export const FormLink = forwardRef<HTMLInputElement, FormLinkProps>(
  function FormLink({label, className, placeholder, value, ...props}, ref) {
    const [links, setLinks] = useState<string[]>(value ? [value] : ['']);

    const handleChange = (
      index: number,
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const val = e.target.value;
      setLinks((prev) => {
        const updated = [...prev];
        updated[index] = val;
        return updated;
      });

      if (props.onChange) props.onChange(e);
    };

    const handleKeyDown = (
      index: number,
      e: ReactKeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        setLinks((prev) => {
          const updated = [...prev];
          if (index === prev.length - 1 && updated[index].trim() !== '') {
            updated.push('');
          }
          return updated;
        });
      }
    };

    const handleDelete = (index: number) => {
      setLinks((prev) => prev.filter((_, i) => i !== index));
    };

    return (
      <div className={formFieldStyles.wrapper}>
        {label && (
          <label className={clsx(formFieldStyles.label, className)}>
            {label}
          </label>
        )}

        {links.map((link, index) => (
          <div
            key={index}
            className={clsx(
              formFieldStyles.field,
              props.readOnly && formFieldStyles.readOnlyForm,
              'flex flex-row items-center gap-5 rounded-lg px-4 py-3'
            )}>
            <label className='text-h5 text-neutral-600'>링크</label>

            {props.readOnly ? (
              <a
                href={link}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue flex-1 truncate underline'>
                {link}
              </a>
            ) : (
              <>
                <input
                  ref={ref}
                  type='text'
                  placeholder={placeholder || '링크를 붙여넣기 해주세요.'}
                  value={link}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className='flex-1'
                  {...props}
                />
                {link.trim() !== '' && (
                  <button type='button' onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    );
  }
);
