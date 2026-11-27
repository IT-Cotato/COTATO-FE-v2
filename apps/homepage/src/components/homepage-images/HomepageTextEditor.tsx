'use client';

import {useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {
  getHomepageCopyDefaults,
  type HomepageImageDefinition,
} from '@/constants/homepage-images';
import type {HomepageImage} from '@/schemas/homepage-images.schema';
import {useSaveHomepageTextMutation} from '@/hooks/mutations/useHomepageImages.mutation';

/** 카드의 제목·설명·일정을 한 번에 저장하는 창이다. 취소는 저장 요청을 보내지 않는다. */
export const HomepageTextEditor = ({
  definition,
  saved,
  onClose,
  onSaved,
}: {
  definition: HomepageImageDefinition;
  saved?: HomepageImage;
  onClose: () => void;
  onSaved: () => void;
}) => {
  const defaults = getHomepageCopyDefaults(definition);
  const [title, setTitle] = useState(saved?.displayTitle ?? defaults.title);
  const [description, setDescription] = useState(
    saved?.displayDescription ?? defaults.description
  );
  const isSchedule = definition.group === 'schedule';
  const original = saved?.displaySchedule ?? definition.subtitle;
  const [mode, setMode] = useState<'date' | 'text'>(
    /^\d{4}\.\d{2}\.\d{2}$/.test(original) ? 'date' : 'text'
  );
  const [date, setDate] = useState(
    /^\d{4}\.\d{2}\.\d{2}$/.test(original) ? original.replaceAll('.', '-') : ''
  );
  const [text, setText] = useState(original);
  const mutation = useSaveHomepageTextMutation();
  const dialog = useRef<HTMLDivElement>(null);
  const value = mode === 'date' ? date.replaceAll('-', '.') : text.trim();
  useEffect(() => {
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (!mutation.isPending) onClose();
      }
      if (event.key !== 'Tab') return;
      const items = dialog.current?.querySelectorAll<HTMLElement>(
        'button:not(:disabled),input,select,textarea'
      );
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (
        event.shiftKey &&
        (document.activeElement === first ||
          document.activeElement === dialog.current)
      ) {
        event.preventDefault();
        last?.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last ||
          document.activeElement === dialog.current)
      ) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = overflow;
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [onClose, mutation.isPending]);
  return createPortal(
    <div className='fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 p-4'>
      <div
        ref={dialog}
        tabIndex={-1}
        role='dialog'
        aria-modal='true'
        aria-labelledby='text-editor-title'
        className='max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl'>
        <h2
          id='text-editor-title'
          className='text-xl font-bold text-neutral-800'>
          {definition.label} 텍스트 수정
        </h2>
        <p className='mt-2 text-sm leading-6 text-neutral-500'>
          사진 위에 표시되는 문구를 수정합니다. 사진과 위치는 유지됩니다.
        </p>
        <label className='mt-5 block text-sm font-semibold'>
          제목
          <input
            aria-label='제목'
            value={title}
            maxLength={80}
            disabled={mutation.isPending}
            onChange={(event) => setTitle(event.target.value)}
            className='mt-2 w-full rounded-lg border border-neutral-200 p-3'
          />
        </label>
        {!isSchedule && (
          <label className='mt-4 block text-sm font-semibold'>
            설명
            <textarea
              aria-label='설명'
              rows={6}
              maxLength={2000}
              disabled={mutation.isPending}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className='mt-2 w-full resize-y rounded-lg border border-neutral-200 p-3'
            />
            <span className='mt-1 block text-right text-xs font-normal text-neutral-400'>
              {description.length}/2000자
            </span>
          </label>
        )}
        {isSchedule && (
          <>
            <label className='mt-6 block text-sm font-semibold'>
              표시 방식
              <select
                value={mode}
                disabled={mutation.isPending}
                onChange={(event) =>
                  setMode(event.target.value as 'date' | 'text')
                }
                className='mt-2 w-full rounded-lg border border-neutral-200 p-3'>
                <option value='date'>날짜 선택</option>
                <option value='text'>일정 문구 입력</option>
              </select>
            </label>
            <label className='mt-4 block text-sm font-semibold'>
              {mode === 'date' ? '날짜' : '일정 문구'}
              {mode === 'date' ? (
                <input
                  type='date'
                  value={date}
                  disabled={mutation.isPending}
                  onChange={(event) => setDate(event.target.value)}
                  onInput={(event) => setDate(event.currentTarget.value)}
                  className='mt-2 w-full min-w-0 rounded-lg border border-neutral-200 p-3'
                />
              ) : (
                <input
                  type='text'
                  value={text}
                  maxLength={80}
                  disabled={mutation.isPending}
                  onChange={(event) => setText(event.target.value)}
                  placeholder='예: 매주 금요일 19시'
                  className='mt-2 w-full rounded-lg border border-neutral-200 p-3'
                />
              )}
            </label>
            <p className='mt-3 text-sm text-neutral-500'>
              표시 미리보기: {value || '일정을 입력해 주세요'}
            </p>
          </>
        )}
        {mutation.isError && (
          <p role='alert' className='mt-4 text-sm text-red-600'>
            {mutation.error.message}
          </p>
        )}
        <div className='mt-6 flex justify-end gap-3'>
          <button
            type='button'
            onClick={onClose}
            disabled={mutation.isPending}
            className='rounded-lg border border-neutral-200 px-5 py-2.5'>
            취소
          </button>
          <button
            type='button'
            disabled={
              mutation.isPending ||
              !title.trim() ||
              title.trim().length > 80 ||
              description.length > 2000 ||
              (isSchedule && (!value || value.length > 80)) ||
              (title.trim() === (saved?.displayTitle ?? defaults.title) &&
                description.trim() ===
                  (saved?.displayDescription ?? defaults.description).trim() &&
                (!isSchedule || value === original))
            }
            onClick={() =>
              mutation.mutate(
                {
                  slot: definition.slot,
                  displayTitle: title.trim(),
                  displayDescription: description.trim(),
                  displaySchedule: isSchedule ? value : null,
                  expectedRevision: saved?.revision ?? null,
                },
                {onSuccess: onSaved}
              )
            }
            className='bg-primary rounded-lg px-5 py-2.5 font-semibold text-white disabled:bg-neutral-300'>
            {mutation.isPending ? '저장 중' : '텍스트 저장'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
