'use client';

import {useEffect, useRef, useState, type PointerEvent} from 'react';
import {createPortal} from 'react-dom';
import {useHomepageImageFrame} from '@/hooks/useHomepageImageFrame';
import Camera from '@/assets/sidebar/homepage-images.svg';
import {
  CENTERED_IMAGE_CROP,
  type HomepageImageDefinition,
} from '@/constants/homepage-images';
import type {
  HomepageImage,
  HomepageImageCrop,
} from '@/schemas/homepage-images.schema';
import {useSaveHomepageImageMutation} from '@/hooks/mutations/useHomepageImages.mutation';
import {
  draggedHomepageImageCrop,
  clampImagePosition,
} from '@/utils/homepage-image-crop';

interface HomepageImageEditorProps {
  definition: HomepageImageDefinition;
  saved: HomepageImage | undefined;
  onClose: () => void;
  onSaved: () => void;
}

/** 저장 전에는 브라우저 미리보기만 변경한다. PC·모바일 크롭을 같은 파일에 각각 보관한다. */
export const HomepageImageEditor = ({
  definition,
  saved,
  onClose,
  onSaved,
}: HomepageImageEditorProps) => {
  // 편집 시작 시점의 값과 revision을 유지해 충돌 후 재시도가 다른 저장을 덮어쓰지 않게 한다.
  const [initialSettings] = useState(saved);
  const [file, setFile] = useState<File | null>(null);
  const [source, setSource] = useState(
    initialSettings?.imageUrl ?? definition.fallback
  );
  const [desktop, setDesktop] = useState<HomepageImageCrop>(
    initialSettings?.desktop ?? CENTERED_IMAGE_CROP
  );
  const [mobile, setMobile] = useState<HomepageImageCrop>(
    initialSettings?.mobile ?? CENTERED_IMAGE_CROP
  );
  const [error, setError] = useState('');
  const [dirty, setDirty] = useState(false);
  const [previewWidth, setPreviewWidth] = useState(0);
  const frame = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const drag = useRef<{x: number; y: number; crop: HomepageImageCrop} | null>(
    null
  );
  const mutation = useSaveHomepageImageMutation();
  const probe = useHomepageImageFrame(definition.slot, source, desktop, mobile);
  const device = probe.frame?.mode ?? 'desktop';
  const crop = device === 'desktop' ? desktop : mobile;
  const aspect = probe.frame ? probe.frame.width / probe.frame.height : 1.7;
  const natural = {
    width: probe.frame?.naturalWidth ?? 0,
    height: probe.frame?.naturalHeight ?? 0,
  };
  const scale =
    probe.frame && previewWidth ? previewWidth / probe.frame.width : 0;
  // 확대된 브라우저의 소수 픽셀 반올림 때문에 1024px이 경계 아래로 내려가지 않게 한다.
  const pixelRatio =
    typeof window === 'undefined' ? 1 : window.devicePixelRatio;
  const viewportPixelWidth =
    Math.ceil(probe.viewportWidth * pixelRatio) / pixelRatio;
  const presets = [375, 430, 768, 1024, 1280, 1440, 1920];
  const viewportChoices = presets.includes(probe.viewportWidth)
    ? presets
    : [...presets, probe.viewportWidth].sort((a, b) => a - b);
  const selectViewport = (width: number) => {
    drag.current = null;
    probe.setViewportWidth(width);
  };

  useEffect(() => {
    if (!frame.current) return;
    const observer = new ResizeObserver(() =>
      setPreviewWidth(frame.current?.getBoundingClientRect().width ?? 0)
    );
    observer.observe(frame.current);
    setPreviewWidth(frame.current.getBoundingClientRect().width);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const previousFocus = document.activeElement;
    closeButton.current?.focus();
    const before = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = before;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected)
        previousFocus.focus();
    };
  }, []);
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setSource(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const changeCrop = (value: HomepageImageCrop) => {
    if (device === 'desktop') setDesktop(value);
    else setMobile(value);
    setDirty(true);
  };
  const chooseFile = (next: File | undefined) => {
    if (!next) return;
    if (
      !['image/jpeg', 'image/png', 'image/webp'].includes(next.type) ||
      next.size === 0 ||
      next.size > 8 * 1024 * 1024
    ) {
      setError('8MB 이하의 JPG, PNG, WEBP 파일을 선택해 주세요.');
      return;
    }
    setError('');
    setFile(next);
    setDesktop({...CENTERED_IMAGE_CROP});
    setMobile({...CENTERED_IMAGE_CROP});
    setDirty(true);
  };
  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || mutation.isPending || !probe.synced) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {x: event.clientX, y: event.clientY, crop: {...crop}};
  };
  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (mutation.isPending || !drag.current || !frame.current) return;
    const bounds = frame.current.getBoundingClientRect();
    changeCrop(
      draggedHomepageImageCrop(drag.current.crop, natural, bounds, {
        x: event.clientX - drag.current.x,
        y: event.clientY - drag.current.y,
      })
    );
  };
  const save = async () => {
    setError('');
    try {
      await mutation.mutateAsync({
        slot: definition.slot,
        file,
        objectKey: initialSettings?.objectKey ?? null,
        desktop,
        mobile,
        expectedRevision: initialSettings?.revision ?? null,
      });
      onSaved();
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : '사진을 저장하지 못했습니다.'
      );
    }
  };

  return createPortal(
    <div
      className='fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-3 backdrop-blur-[2px]'
      onKeyDown={(event) => {
        if (event.key === 'Escape' && !mutation.isPending) onClose();
        if (event.key === 'Tab') {
          const nodes = event.currentTarget.querySelectorAll<HTMLElement>(
            'button:not(:disabled),input:not(:disabled):not([type="file"]),select:not(:disabled),[tabindex="0"]'
          );
          const first = nodes[0],
            last = nodes[nodes.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }
      }}>
      <section
        role='dialog'
        aria-modal='true'
        aria-labelledby='homepage-image-editor-title'
        className='flex max-h-[calc(100dvh-24px)] w-full max-w-[1120px] flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl'>
        <header className='flex shrink-0 items-start justify-between border-b border-neutral-100 px-5 py-5 sm:px-8'>
          <div>
            <p className='mb-1 text-xs font-semibold text-[#f87d02]'>
              홈페이지 사진 관리
            </p>
            <h2
              id='homepage-image-editor-title'
              className='text-xl font-bold text-neutral-800 sm:text-2xl'>
              {definition.label} 사진 편집
            </h2>
          </div>
          <button
            ref={closeButton}
            type='button'
            disabled={mutation.isPending}
            onClick={onClose}
            aria-label='사진 편집 닫기'
            className='flex h-9 w-9 items-center justify-center rounded-full text-2xl text-neutral-500 hover:bg-neutral-100 disabled:opacity-40'>
            ×
          </button>
        </header>
        <div className='grid min-h-0 gap-7 overflow-y-auto p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_260px]'>
          <div className='min-w-0'>
            <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
              <div
                className='inline-flex rounded-lg bg-neutral-100 p-1'
                aria-label='사진 미리보기 기기'>
                {(['desktop', 'mobile'] as const).map((value) => (
                  <button
                    key={value}
                    type='button'
                    disabled={mutation.isPending}
                    aria-pressed={device === value}
                    onClick={() =>
                      selectViewport(value === 'desktop' ? 1440 : 375)
                    }
                    className={`rounded-md px-5 py-2 text-sm font-semibold transition ${device === value ? 'bg-white text-neutral-800 shadow-sm' : 'text-neutral-400 hover:text-neutral-600'}`}>
                    {value === 'desktop' ? 'PC' : '모바일'}
                  </button>
                ))}
              </div>
              <label className='flex items-center gap-2 text-xs text-neutral-500'>
                화면 너비
                <select
                  aria-label='미리보기 화면 너비'
                  value={probe.viewportWidth}
                  disabled={mutation.isPending}
                  onChange={(event) =>
                    selectViewport(Number(event.target.value))
                  }
                  className='rounded-md border border-neutral-200 bg-white px-2 py-2 text-sm text-neutral-700'>
                  {viewportChoices.map((width) => (
                    <option key={width} value={width}>
                      {width}px
                    </option>
                  ))}
                </select>
                <button
                  type='button'
                  disabled={mutation.isPending}
                  onClick={() =>
                    selectViewport(
                      Math.min(
                        2560,
                        Math.max(320, Math.round(window.innerWidth))
                      )
                    )
                  }
                  className='underline underline-offset-4'>
                  현재 창
                </button>
              </label>
            </div>
            <div className='flex min-h-[310px] items-center justify-center rounded-2xl border border-neutral-100 bg-neutral-50 p-4 lg:min-h-[430px]'>
              <div
                ref={frame}
                role='group'
                aria-label='사진 위치 조정 영역'
                aria-disabled={mutation.isPending}
                tabIndex={0}
                onPointerDown={startDrag}
                onPointerMove={moveDrag}
                onPointerUp={() => {
                  drag.current = null;
                }}
                onPointerCancel={() => {
                  drag.current = null;
                }}
                onKeyDown={(event) => {
                  if (mutation.isPending || !probe.frame?.imageReady) return;
                  if (
                    ![
                      'ArrowLeft',
                      'ArrowRight',
                      'ArrowUp',
                      'ArrowDown',
                    ].includes(event.key)
                  )
                    return;
                  event.preventDefault();
                  const step = event.shiftKey ? 5 : 1;
                  changeCrop({
                    ...crop,
                    x: clampImagePosition(
                      crop.x +
                        (event.key === 'ArrowLeft'
                          ? -step
                          : event.key === 'ArrowRight'
                            ? step
                            : 0)
                    ),
                    y: clampImagePosition(
                      crop.y +
                        (event.key === 'ArrowUp'
                          ? -step
                          : event.key === 'ArrowDown'
                            ? step
                            : 0)
                    ),
                  });
                }}
                style={{
                  aspectRatio: aspect,
                  width: Math.min(740, aspect * 420),
                  maxWidth: '100%',
                  touchAction: 'none',
                  overflowAnchor: 'none',
                }}
                data-preview-ready={probe.synced}
                data-frame-mode={probe.frame?.mode}
                data-frame-width={probe.frame?.width}
                data-frame-height={probe.frame?.height}
                data-frame-viewport={probe.frame?.viewportWidth}
                className='relative isolate cursor-grab overflow-clip bg-neutral-100 shadow-md outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#f87d02] active:cursor-grabbing'>
                <iframe
                  key={`${definition.slot}-${probe.attempt}`}
                  ref={probe.iframe}
                  title={`${definition.label} 실제 홈페이지 미리보기`}
                  src={`/homepage-image-frame?slot=${definition.slot}`}
                  aria-hidden='true'
                  tabIndex={-1}
                  onLoad={probe.onLoad}
                  style={{
                    position: 'absolute',
                    width: viewportPixelWidth,
                    height: 2400,
                    maxWidth: 'none',
                    border: 0,
                    left: -(probe.frame?.left ?? 0) * scale,
                    top: -(probe.frame?.top ?? 0) * scale,
                    transform: `scale(${scale || 1})`,
                    transformOrigin: '0 0',
                    visibility: probe.frame && scale ? 'visible' : 'hidden',
                    pointerEvents: 'none',
                  }}
                />
                {!probe.synced && (
                  <div
                    className='pointer-events-none absolute inset-0 flex items-center justify-center bg-neutral-100/80 text-sm text-neutral-500'
                    role='status'>
                    사진 미리보기 준비 중…
                  </div>
                )}
              </div>
            </div>
            <div
              className='mt-3 text-center text-xs leading-5 text-neutral-500'
              aria-live='polite'>
              {probe.frame && (
                <p>
                  홈페이지 사진 영역 {Math.round(probe.frame.width)} ×{' '}
                  {Math.round(probe.frame.height)}px ·{' '}
                  {device === 'desktop' ? 'PC' : '모바일'} 위치 적용
                </p>
              )}
              {probe.error && (
                <p role='alert'>
                  {probe.error}{' '}
                  <button
                    type='button'
                    onClick={probe.retry}
                    className='underline'>
                    다시 시도
                  </button>
                </p>
              )}
            </div>
            <p className='mt-3 text-center text-xs leading-5 text-neutral-400'>
              사진을 드래그하거나 방향키로 움직여 주세요. 확대하면 위치를 더
              넓게 조절할 수 있어요.
            </p>
          </div>
          <aside className='flex flex-col gap-6'>
            <div>
              <p className='mb-3 text-sm font-bold text-neutral-700'>
                사진 선택
              </p>
              <input
                ref={fileInput}
                type='file'
                accept='image/jpeg,image/png,image/webp'
                aria-label='새 홈페이지 사진 선택'
                className='sr-only'
                disabled={mutation.isPending}
                onChange={(event) => chooseFile(event.target.files?.[0])}
              />
              <button
                type='button'
                disabled={mutation.isPending}
                onClick={() => fileInput.current?.click()}
                className='flex w-full items-center justify-center gap-2 rounded-xl border border-[#f87d02] px-4 py-3 text-sm font-semibold text-[#f87d02] transition hover:bg-orange-50 disabled:opacity-50'>
                <Camera className='h-5 w-5' />새 사진 업로드
              </button>
              <p className='mt-2 text-xs leading-5 text-neutral-400'>
                JPG, PNG, WEBP · 최대 8MB
                <br />
                저장하기 전까지 홈페이지는 바뀌지 않아요.
              </p>
              {file && (
                <p className='mt-2 text-xs font-medium text-neutral-600'>
                  새 사진 선택됨 · {(file.size / 1024 / 1024).toFixed(2)}MB
                </p>
              )}
            </div>
            <div className='border-t border-neutral-100 pt-5'>
              <div className='mb-5 flex items-center justify-between'>
                <p className='text-sm font-bold text-neutral-700'>
                  {device === 'desktop' ? 'PC' : '모바일'} 표시 설정
                </p>
                <button
                  type='button'
                  disabled={mutation.isPending}
                  onClick={() => changeCrop({...CENTERED_IMAGE_CROP})}
                  className='text-xs text-neutral-400 underline underline-offset-4 hover:text-neutral-600'>
                  위치 초기화
                </button>
              </div>
              {(
                [
                  {key: 'zoom', label: '확대', min: 1, max: 3, step: 0.01},
                  {key: 'x', label: '가로 위치', min: 0, max: 100, step: 0.1},
                  {key: 'y', label: '세로 위치', min: 0, max: 100, step: 0.1},
                ] as const
              ).map((control) => (
                <label key={control.key} className='mb-5 block'>
                  <span className='mb-2 flex justify-between text-sm text-neutral-500'>
                    <span>{control.label}</span>
                    <span className='font-semibold text-neutral-700'>
                      {control.key === 'zoom'
                        ? `${crop.zoom.toFixed(2)}×`
                        : `${Math.round(crop[control.key])}%`}
                    </span>
                  </span>
                  <input
                    type='range'
                    aria-label={control.label}
                    min={control.min}
                    max={control.max}
                    step={control.step}
                    value={crop[control.key]}
                    disabled={mutation.isPending || !probe.frame?.imageReady}
                    onChange={(event) =>
                      changeCrop({
                        ...crop,
                        [control.key]: Number(event.target.value),
                      })
                    }
                    className='w-full cursor-pointer accent-[#f87d02]'
                  />
                </label>
              ))}
            </div>
            <div className='rounded-xl bg-neutral-50 p-4 text-xs leading-5 text-neutral-500'>
              PC와 모바일은 사진이 보이는 영역이 달라요. 두 화면을 확인한 뒤
              저장해 주세요.
            </div>
          </aside>
        </div>
        <footer className='shrink-0 border-t border-neutral-100 px-5 py-4 sm:px-8'>
          {error && (
            <p role='alert' className='mb-3 text-sm text-red-600'>
              {error}
            </p>
          )}
          <div className='flex items-center justify-between gap-4'>
            <p className='hidden text-xs text-neutral-400 sm:block'>
              선택한 영역의 사진과 표시 설정만 저장합니다.
            </p>
            <div className='ml-auto flex gap-2'>
              <button
                type='button'
                disabled={mutation.isPending}
                onClick={onClose}
                className='rounded-lg border border-neutral-200 px-5 py-3 text-sm font-semibold text-neutral-500 disabled:opacity-40'>
                취소
              </button>
              <button
                type='button'
                onClick={save}
                disabled={!dirty || mutation.isPending || !probe.synced}
                className='rounded-lg bg-[#f87d02] px-7 py-3 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400'>
                {mutation.isPending ? '사진 저장 중…' : '사진 저장'}
              </button>
            </div>
          </div>
        </footer>
      </section>
    </div>,
    document.body
  );
};
