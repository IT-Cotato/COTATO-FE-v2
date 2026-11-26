'use client';

import {createContext, useContext} from 'react';
import type {HomepageImageDraftMessage} from '@/schemas/homepage-image-frame.schema';

/** 읽기 전용 iframe 안에서만 미저장 사진을 표시한다. 실제 조회 캐시·DB·인증 상태는 변경하지 않는다. */
export const HomepageImageDraftContext = createContext<
  HomepageImageDraftMessage | undefined
>(undefined);
export const useHomepageImageDraft = () =>
  useContext(HomepageImageDraftContext);
