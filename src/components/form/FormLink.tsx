'use client';

import {forwardRef, useState, type InputHTMLAttributes} from 'react';
import clsx from 'clsx';
import {formFieldStyles} from '@/components/form/form.styles';

interface FormLinkProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> {
  label?: string;
  error?: string;
  placeholder?: string;
  value?: string[];
  onChange?: (links: string[]) => void;
}

export const FormLink = forwardRef<HTMLInputElement, FormLinkProps>(
  function FormLink(
    {label, className, placeholder, value, onChange, ...props},
    ref
  ) {
    const [internalLinks, setInternalLinks] = useState<string[]>(['']);
    const links = value ?? internalLinks;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      const updated = [val];
      if (!value) setInternalLinks(updated);
      onChange?.(updated);
    };

    return (
      <div className={formFieldStyles.wrapper}>
        {label && (
          <label className={clsx(formFieldStyles.label, className)}>
            {label}
          </label>
        )}

        {props.readOnly ? (
          links.map((link, index) => (
            <div
              key={index}
              className={clsx(
                formFieldStyles.field,
                formFieldStyles.readOnlyForm,
                'flex flex-row items-center gap-5 rounded-lg px-4 py-3'
              )}>
              <label className='text-h5 text-neutral-600'>링크</label>
              <a
                href={link}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue flex-1 truncate underline'>
                {link}
              </a>
            </div>
          ))
        ) : (
          <div
            className={clsx(
              formFieldStyles.field,
              'flex flex-row items-center gap-5 rounded-lg px-4 py-3'
            )}>
            <label className='text-h5 text-neutral-600'>링크</label>
            <input
              ref={ref}
              type='text'
              placeholder={placeholder}
              value={links[0] || ''}
              onChange={handleChange}
              className='flex-1'
              {...props}
            />
          </div>
        )}
      </div>
    );
  }
);
