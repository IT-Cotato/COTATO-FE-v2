'use client';

import {createContext, useContext} from 'react';

export const HOMEPAGE_IMAGE_PREVIEW_ENABLED =
  process.env.NODE_ENV === 'development' &&
  process.env.NEXT_PUBLIC_HOMEPAGE_IMAGE_PREVIEW === 'true';

export const LOCAL_IMAGE_ACTORS = [
  {value: 'current-operation', label: '현 기수 운영진'},
  {value: 'previous-operation', label: '전 기수 운영진'},
  {value: 'current-member', label: '일반 회원'},
  {value: 'current-education', label: '교육팀'},
  {value: 'current-dev', label: '개발팀'},
] as const;
export type HomepageImagePreviewActor =
  (typeof LOCAL_IMAGE_ACTORS)[number]['value'];

/** 로컬 미리보기의 합성 계정만 전달한다. 실제 로그인 저장소나 회원 정보는 변경하지 않는다. */
export const HomepageImagePreviewContext = createContext<
  HomepageImagePreviewActor | undefined
>(undefined);
export const useHomepageImagePreviewActor = () =>
  useContext(HomepageImagePreviewContext);
