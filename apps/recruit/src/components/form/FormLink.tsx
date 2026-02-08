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
    const rawLinks = value ?? internalLinks;

    const displayLinks = rawLinks
      .flatMap((link) => link.split(','))
      .map((link) => link.trim())
      .filter((link) => link !== '');

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
          <div className='flex flex-col gap-2'>
            {displayLinks.length > 0 ? (
              displayLinks.map((link, index) => (
                <div
                  key={index}
                  className={clsx(
                    formFieldStyles.field,
                    formFieldStyles.readOnlyForm,
                    'flex flex-row items-center gap-5 rounded-lg px-4 py-3'
                  )}>
                  <label className='text-h5 shrink-0 text-neutral-600'>
                    링크 {displayLinks.length > 1 && index + 1}
                  </label>
                  <a
                    href={link.startsWith('http') ? link : `https://${link}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue flex-1 truncate underline'>
                    {link}
                  </a>
                </div>
              ))
            ) : (
              <p className='text-body-m text-neutral-400'>
                등록된 링크가 없습니다.
              </p>
            )}
          </div>
        ) : (
          <div
            className={clsx(
              formFieldStyles.field,
              'flex flex-row items-center gap-5 rounded-lg px-4 py-3'
            )}>
            <label className='text-h5 shrink-0 text-neutral-600'>링크</label>
            <input
              ref={ref}
              type='text'
              placeholder={
                placeholder ?? '쉼표(,)로 여러 링크를 구분할 수 있습니다.'
              }
              value={rawLinks[0] || ''}
              onChange={handleChange}
              className='flex-1 outline-none'
              {...props}
            />
          </div>
        )}
      </div>
    );
  }
);
