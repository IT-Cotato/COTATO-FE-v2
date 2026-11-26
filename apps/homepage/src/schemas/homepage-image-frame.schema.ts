import {z} from 'zod';
import {
  HomepageImageCropSchema,
  HomepageImageSlotSchema,
} from './homepage-images.schema';

/** 같은 출처의 편집창과 읽기 전용 미리보기 사이에서 사진·표시 설정만 전달한다. */
export const HomepageImageDraftMessageSchema = z.object({
  type: z.literal('homepage-image-draft'),
  slot: HomepageImageSlotSchema,
  source: z.string().min(1).max(4096),
  desktop: HomepageImageCropSchema,
  mobile: HomepageImageCropSchema,
});
export type HomepageImageDraftMessage = z.infer<
  typeof HomepageImageDraftMessageSchema
>;

/** 실제 홈페이지 DOM에서 측정한 크기와 CSS가 선택한 크롭만 편집창에 반환한다. */
export const HomepageImageFrameMessageSchema = z.object({
  type: z.literal('homepage-image-frame'),
  slot: HomepageImageSlotSchema,
  source: z.string().min(1).max(4096),
  viewportWidth: z.number().finite().min(320).max(2561),
  left: z.number().finite(),
  top: z.number().finite(),
  width: z.number().finite().positive().max(10000),
  height: z.number().finite().positive().max(10000),
  mode: z.enum(['desktop', 'mobile']),
  crop: HomepageImageCropSchema,
  imageReady: z.boolean(),
  naturalWidth: z.number().int().nonnegative(),
  naturalHeight: z.number().int().nonnegative(),
});
export type HomepageImageFrameMessage = z.infer<
  typeof HomepageImageFrameMessageSchema
>;
