'use client';

import {useMutation, useQueryClient} from '@tanstack/react-query';
import {
  HomepageImageRequestError,
  saveHomepageImage,
  saveHomepageText,
  uploadHomepageImage,
} from '@/services/api/homepage-images.api';
import {useHomepageImagePreviewActor} from '@/components/homepage-images/HomepageImagePreviewContext';
import {QUERY_KEYS} from '@/constants/query-keys';
import {getHomepageImageDefinition} from '@/constants/homepage-images';
import {prepareHomepageImageFile} from '@/utils/homepage-image-crop';
import type {
  HomepageImageCrop,
  HomepageImageSlot,
} from '@/schemas/homepage-images.schema';

/** 일정 저장도 이미지 조회 캐시를 갱신해 PC·모바일·관리 화면이 같은 값을 읽게 한다. */
export const useSaveHomepageTextMutation = () => {
  const actor = useHomepageImagePreviewActor();
  const client = useQueryClient();
  return useMutation({
    mutationFn: (draft: {
      slot: HomepageImageSlot;
      displayTitle: string;
      displayDescription: string;
      displaySchedule: string | null;
      expectedRevision: number | null;
    }) => saveHomepageText(draft.slot, draft, actor),
    onError: async (error) => {
      if (error instanceof HomepageImageRequestError && error.status === 409) {
        await client.invalidateQueries({
          queryKey: QUERY_KEYS.HOMEPAGE_IMAGES.PUBLIC,
        });
      }
    },
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: QUERY_KEYS.HOMEPAGE_IMAGES.PUBLIC,
      });
    },
  });
};

/** 선택한 파일은 저장 시에만 업로드하고 사진과 PC·모바일 위치를 함께 저장한다. */
export interface HomepageImageDraft {
  slot: HomepageImageSlot;
  file: File | null;
  objectKey: string | null;
  desktop: HomepageImageCrop;
  mobile: HomepageImageCrop;
  expectedRevision: number | null;
}

export const useSaveHomepageImageMutation = () => {
  const actor = useHomepageImagePreviewActor();
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (draft: HomepageImageDraft) => {
      let file = draft.file;
      if (!file && !draft.objectKey) {
        const response = await fetch(
          getHomepageImageDefinition(draft.slot).fallback,
          {credentials: 'omit'}
        );
        if (!response.ok)
          throw new Error(
            '기본 사진을 불러오지 못했습니다. 새 사진을 선택해 주세요.'
          );
        file = new File([await response.blob()], 'homepage-original.webp', {
          type: 'image/webp',
        });
      }
      const key = file
        ? await uploadHomepageImage(
            draft.slot,
            await prepareHomepageImageFile(file),
            actor
          )
        : draft.objectKey;
      if (!key) throw new Error('새 사진을 선택한 뒤 저장해 주세요.');
      return saveHomepageImage(
        draft.slot,
        {
          objectKey: key,
          desktop: draft.desktop,
          mobile: draft.mobile,
          expectedRevision: draft.expectedRevision,
        },
        actor
      );
    },
    onError: async (error) => {
      if (error instanceof HomepageImageRequestError && error.status === 409) {
        await client.invalidateQueries({
          queryKey: QUERY_KEYS.HOMEPAGE_IMAGES.PUBLIC,
        });
      }
    },
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: QUERY_KEYS.HOMEPAGE_IMAGES.PUBLIC,
      });
    },
  });
};
