import axios from 'axios';
import {publicAxios, privateAxios} from '@/services/config/axios';
import {API_BASE_URL, ENDPOINT} from '@/services/constant/endpoint';
import {
  HomepageImageSchema,
  HomepageImagePermissionSchema,
  HomepageImageUploadSchema,
  type HomepageImageSlot,
  type SaveHomepageImage,
} from '@/schemas/homepage-images.schema';
import {
  HOMEPAGE_IMAGE_PREVIEW_ENABLED,
  type HomepageImagePreviewActor,
} from '@/components/homepage-images/HomepageImagePreviewContext';

/** API 내부 오류나 서명 URL을 그대로 노출하지 않고 사용자에게 필요한 설명만 전달한다. */
export class HomepageImageRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
  }
}

const request = async (
  path: string,
  method: 'GET' | 'POST' | 'PUT',
  body?: unknown,
  actor?: HomepageImagePreviewActor,
  privateRequest = false
): Promise<unknown> => {
  if (actor) {
    const base = new URL(API_BASE_URL);
    if (
      !HOMEPAGE_IMAGE_PREVIEW_ENABLED ||
      base.protocol !== 'http:' ||
      !['127.0.0.1', 'localhost'].includes(base.hostname)
    ) {
      throw new Error(
        '로컬 미리보기는 이 컴퓨터의 테스트 서버에서만 사용할 수 있습니다.'
      );
    }
    const response = await fetch(new URL(path, base), {
      method,
      credentials: 'omit',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'X-Homepage-Preview-Actor': actor,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok)
      throw new HomepageImageRequestError(
        typeof payload?.message === 'string'
          ? payload.message
          : '사진 요청을 처리하지 못했습니다.',
        response.status
      );
    return payload;
  }
  try {
    const client = privateRequest ? privateAxios : publicAxios;
    const response = await client.request({url: path, method, data: body});
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new HomepageImageRequestError(
        typeof error.response?.data?.message === 'string'
          ? error.response.data.message
          : '사진 정보를 불러오지 못했습니다.',
        error.response?.status ?? 0
      );
    }
    throw new Error('사진 요청을 처리하지 못했습니다.');
  }
};

export const getHomepageImages = async (actor?: HomepageImagePreviewActor) =>
  HomepageImageSchema.array().parse(
    await request(
      `${ENDPOINT.HOMEPAGE_IMAGES.PUBLIC}?includeAboutUs=true`,
      'GET',
      undefined,
      actor
    )
  );
export const getHomepageImagePermission = async (
  actor?: HomepageImagePreviewActor
) =>
  HomepageImagePermissionSchema.parse(
    await request(
      ENDPOINT.HOMEPAGE_IMAGES.PERMISSION,
      'GET',
      undefined,
      actor,
      true
    )
  );

export const saveHomepageImage = async (
  slot: HomepageImageSlot,
  settings: SaveHomepageImage,
  actor?: HomepageImagePreviewActor
) =>
  HomepageImageSchema.parse(
    await request(
      ENDPOINT.HOMEPAGE_IMAGES.UPDATE(slot),
      'PUT',
      settings,
      actor,
      true
    )
  );

/** 사진·크롭을 다시 보내지 않고 제목·설명·표시 일정만 저장한다. */
export const saveHomepageText = async (
  slot: HomepageImageSlot,
  settings: {
    displayTitle: string;
    displayDescription: string;
    displaySchedule: string | null;
    expectedRevision: number | null;
  },
  actor?: HomepageImagePreviewActor
) =>
  HomepageImageSchema.parse(
    await request(
      `${ENDPOINT.HOMEPAGE_IMAGES.UPDATE(slot)}/text`,
      'PUT',
      settings,
      actor,
      true
    )
  );

export const uploadHomepageImage = async (
  slot: HomepageImageSlot,
  file: File,
  actor?: HomepageImagePreviewActor
) => {
  const upload = HomepageImageUploadSchema.parse(
    await request(
      ENDPOINT.HOMEPAGE_IMAGES.UPLOAD_URL,
      'POST',
      {slot, contentType: file.type, size: file.size},
      actor,
      true
    )
  );
  const url = new URL(upload.uploadUrl);
  const allowed = actor
    ? HOMEPAGE_IMAGE_PREVIEW_ENABLED &&
      url.protocol === 'http:' &&
      ['127.0.0.1', 'localhost'].includes(url.hostname)
    : url.protocol === 'https:' && url.hostname === 'storage.googleapis.com';
  if (!allowed) throw new Error('업로드 주소를 확인하지 못했습니다.');
  // 서명된 Content-Type만 전달한다. 로그인 토큰·쿠키는 파일 저장소에 보내지 않는다.
  const response = await fetch(url, {
    method: 'PUT',
    credentials: 'omit',
    headers: {'Content-Type': upload.contentType},
    body: file,
  });
  if (!response.ok)
    throw new Error('사진 업로드에 실패했습니다. 다시 시도해 주세요.');
  return upload.objectKey;
};
