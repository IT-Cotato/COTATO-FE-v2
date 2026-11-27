'use client';

import {useHomepageImagesQuery} from './queries/useHomepageImages.query';
import type {HomepageImageSlot} from '@/schemas/homepage-images.schema';

/** 홈페이지 표시 일정만 읽는다. 세션·출석 인정 시간에는 관여하지 않는다. */
export const useHomepageSchedules = () => {
  const {data} = useHomepageImagesQuery();
  return (slot: HomepageImageSlot, fallback: string) =>
    data?.find((image) => image.slot === slot)?.displaySchedule ?? fallback;
};

/** 표시 제목도 고정 영역의 기본값을 유지하면서 저장된 문구만 대체한다. */
export const useHomepageTitles = () => {
  const {data} = useHomepageImagesQuery();
  return (slot: HomepageImageSlot, fallback: string) =>
    data?.find((image) => image.slot === slot)?.displayTitle ?? fallback;
};
