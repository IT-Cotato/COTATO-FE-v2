import {z} from 'zod';

export const HOMEPAGE_IMAGE_SLOTS = [
  'SCHEDULE_OT',
  'SCHEDULE_MT',
  'SCHEDULE_SESSION',
  'SCHEDULE_DEVTALK',
  'SCHEDULE_COKERTHON',
  'SCHEDULE_DEMODAY',
  'PART_PM',
  'PART_DESIGN',
  'PART_FRONTEND',
  'PART_BACKEND',
] as const;
export const HomepageImageSlotSchema = z.enum(HOMEPAGE_IMAGE_SLOTS);
export type HomepageImageSlot = z.infer<typeof HomepageImageSlotSchema>;

export const HomepageImageCropSchema = z.object({
  x: z.number().finite().min(0).max(100),
  y: z.number().finite().min(0).max(100),
  zoom: z.number().finite().min(1).max(3),
});
export type HomepageImageCrop = z.infer<typeof HomepageImageCropSchema>;

export const HomepageImageSchema = z.object({
  slot: HomepageImageSlotSchema,
  objectKey: z.string().nullable(),
  imageUrl: z.string().nullable(),
  desktop: HomepageImageCropSchema,
  mobile: HomepageImageCropSchema,
  revision: z.number().int().nonnegative().nullable(),
});
export type HomepageImage = z.infer<typeof HomepageImageSchema>;

export const HomepageImagePermissionSchema = z.object({
  canEdit: z.boolean(),
  reason: z.string(),
  generationId: z.number().nullable(),
});
export const HomepageImageUploadSchema = z.object({
  objectKey: z.string(),
  uploadUrl: z.string().url(),
  contentType: z.string(),
});

/** 사진과 PC·모바일 표시 설정을 함께 저장한다. 최초 저장의 revision은 null이다. */
export interface SaveHomepageImage {
  objectKey: string;
  desktop: HomepageImageCrop;
  mobile: HomepageImageCrop;
  expectedRevision: number | null;
}
