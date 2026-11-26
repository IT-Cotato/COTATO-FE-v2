'use client';

import Image from 'next/image';
import Camera from '@/assets/sidebar/homepage-images.svg';
import {useState} from 'react';
import {
  HOMEPAGE_IMAGE_DEFINITIONS,
  type HomepageImageDefinition,
} from '@/constants/homepage-images';
import {
  useHomepageImagesQuery,
  useHomepageImagePermissionQuery,
} from '@/hooks/queries/useHomepageImages.query';
import {HomepageImageEditor} from './HomepageImageEditor';
import {homepageImageCropStyle} from '@/utils/homepage-image-crop';

/** 관리자 화면과 로컬 미리보기가 공유하는 사진 관리 UI다. 버튼 표시와 서버 권한 결과를 일치시킨다. */
export const HomepageImageManager = () => {
  const [group, setGroup] = useState<'schedule' | 'part'>('schedule');
  const [selected, setSelected] = useState<HomepageImageDefinition | null>(
    null
  );
  const [notice, setNotice] = useState('');
  const images = useHomepageImagesQuery();
  const permission = useHomepageImagePermissionQuery();
  const canEdit = permission.data?.canEdit === true;
  const definitions = HOMEPAGE_IMAGE_DEFINITIONS.filter(
    (value) => value.group === group
  );

  return (
    <section className='flex w-full min-w-0 flex-col px-6 py-10 md:p-12.5'>
      <header className='mb-8 flex flex-wrap items-start justify-between gap-5'>
        <div>
          <h1 className='text-h2 text-neutral-800'>홈페이지 사진 관리</h1>
          <p className='mt-3 text-sm leading-6 text-neutral-500'>
            홈페이지에 표시할 활동 사진과 파트 사진을 관리합니다.
            <br className='sm:hidden' /> 사진을 선택해 위치와 크기를 조절해
            주세요.
          </p>
        </div>
        <span
          className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold ${canEdit ? 'bg-orange-50 text-[#f87d02]' : 'bg-neutral-100 text-neutral-500'}`}>
          <span
            className={`h-1.5 w-1.5 rounded-full ${canEdit ? 'bg-[#f87d02]' : 'bg-neutral-400'}`}
          />
          {permission.isPending
            ? '권한 확인 중'
            : canEdit
              ? '운영진 편집 가능'
              : '읽기 전용'}
        </span>
      </header>
      {!permission.isPending && !canEdit && (
        <div
          role='status'
          className='mb-6 rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-sm leading-6 text-neutral-500'>
          {permission.data?.reason ??
            '사진 수정 권한을 확인하지 못했습니다. 로그인 상태를 확인해 주세요.'}
        </div>
      )}
      {notice && (
        <div
          role='status'
          className='mb-6 flex items-center justify-between rounded-xl bg-orange-50 px-5 py-4 text-sm text-orange-800'>
          <span>{notice}</span>
          <button
            type='button'
            onClick={() => setNotice('')}
            aria-label='저장 안내 닫기'
            className='px-2 text-lg'>
            ×
          </button>
        </div>
      )}
      {images.isError && (
        <div
          role='alert'
          className='mb-6 flex items-center justify-between gap-4 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700'>
          <span>
            사진 설정을 불러오지 못했습니다. 기본 사진을 표시하고 있어요.
          </span>
          <button
            type='button'
            onClick={() => images.refetch()}
            className='shrink-0 font-semibold underline'>
            다시 시도
          </button>
        </div>
      )}
      <div
        className='mb-7 flex items-end gap-6 border-b border-neutral-100'
        role='tablist'
        aria-label='홈페이지 사진 분류'>
        {(
          [
            {value: 'schedule', label: '주요 활동 일정', count: 6},
            {value: 'part', label: '파트 소개', count: 4},
          ] as const
        ).map((tab) => (
          <button
            key={tab.value}
            type='button'
            role='tab'
            aria-selected={group === tab.value}
            onClick={() => setGroup(tab.value)}
            className={`text-body-l-sb relative flex items-center gap-2.5 px-3 pb-2 transition-colors ${group === tab.value ? 'border-primary text-primary border-b-2' : 'text-neutral-800'}`}>
            {tab.label}
            <span
              className={
                'text-body-m inline-flex h-5.25 min-w-4.75 items-center justify-center rounded-full bg-neutral-500 px-[5.5px] text-white'
              }>
              {tab.count}
            </span>
          </button>
        ))}
      </div>
      <div className='mb-4 flex items-center justify-between gap-4'>
        <h2 className='text-sm font-bold text-neutral-700'>
          {group === 'schedule' ? '주요 활동 일정' : '파트 소개'} 사진{' '}
          <span className='ml-1 text-[#f87d02]'>{definitions.length}</span>
        </h2>
        <p className='text-xs text-neutral-400'>
          사진을 저장하면 홈페이지에 반영돼요
        </p>
      </div>
      <div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-3'>
        {definitions.map((definition) => {
          const saved = images.data?.find(
            (value) => value.slot === definition.slot
          );
          const crop = saved?.desktop ?? {x: 50, y: 50, zoom: 1};
          return (
            <article
              key={definition.slot}
              className='overflow-hidden rounded-[10px] border border-neutral-100 bg-white'
              data-image-slot={definition.slot}>
              <div className='relative aspect-[16/10] overflow-hidden bg-neutral-100'>
                <Image
                  src={saved?.imageUrl ?? definition.fallback}
                  alt={`${definition.label} 현재 사진`}
                  fill
                  unoptimized
                  sizes='(min-width:1280px) 340px,50vw'
                  style={homepageImageCropStyle(crop)}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0' />
                <span className='absolute top-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-neutral-600'>
                  {saved?.imageUrl ? '설정된 사진' : '기본 사진'}
                </span>
                <p className='absolute right-5 bottom-4 left-5 text-lg font-bold text-white'>
                  {definition.label}
                </p>
              </div>
              <div className='flex items-center justify-between gap-2 px-4 py-4'>
                <div className='min-w-0'>
                  <p className='text-sm font-semibold text-neutral-700'>
                    {definition.group === 'part'
                      ? definition.subtitle
                      : definition.label}
                  </p>
                  <p className='mt-1 text-xs text-neutral-400'>
                    {definition.group === 'part'
                      ? '파트 소개 배경 사진'
                      : definition.subtitle}
                  </p>
                </div>
                {canEdit && (
                  <button
                    type='button'
                    onClick={() => {
                      setNotice('');
                      setSelected(definition);
                    }}
                    aria-label={`${definition.label} 사진 수정`}
                    className='text-body-m hover:border-primary hover:text-primary flex shrink-0 items-center gap-1.5 rounded-[5px] border border-neutral-200 px-3 py-2 font-semibold text-neutral-800 transition-colors'>
                    <Camera className='h-4 w-4' />
                    사진 수정
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
      <p className='mt-7 text-xs leading-5 text-neutral-400'>
        현재 디자인의 제목과 일정은 유지됩니다. 사진을 바꿀 때는 PC·모바일
        미리보기를 함께 확인해 주세요.
      </p>
      {selected && canEdit && (
        <HomepageImageEditor
          definition={selected}
          saved={images.data?.find((value) => value.slot === selected.slot)}
          onClose={() => setSelected(null)}
          onSaved={() => {
            setNotice(`${selected.label} 사진과 표시 설정을 저장했습니다.`);
            setSelected(null);
          }}
        />
      )}
    </section>
  );
};
