import {z} from 'zod';

const NullableStringToEmptySchema = z
  .string()
  .nullable()
  .optional()
  .transform((value) => value ?? '');

export const SessionLocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const SessionAttendTimeSchema = z.object({
  attendanceEndTime: z.string(),
  lateEndTime: z.string(),
});

export const SessionImageSchema = z.object({
  imageId: z.number(),
  imageUrl: z.string(),
  s3Key: z.string().optional(),
  order: z.number().optional().default(0),
});

export const SessionImageUploadSchema = z.object({
  s3Key: z.string(),
  order: z.number(),
});

export const SessionDataSchema = z.object({
  sessionId: z.number(),
  date: z.string(),
  generation: z.string(),
  title: z.string(),
  description: z.string(),
  attendanceStartTime: z.string(),
  placeName: z.string(),
  detailAddress: z.string(),
  location: SessionLocationSchema,
  attendTime: SessionAttendTimeSchema,
  isOffline: z.boolean(),
  isOnline: z.boolean(),
  content: z.string(),
  images: z.array(SessionImageSchema),
});

export const AdminSessionSchema = z.object({
  sessionId: z.number(),
  sessionNumber: z.number(),
  title: NullableStringToEmptySchema,
  imageInfos: z.array(SessionImageSchema).nullable().optional().default([]),
  description: NullableStringToEmptySchema,
  generationId: z.number(),
  placeName: NullableStringToEmptySchema,
  sessionDateTime: NullableStringToEmptySchema,
  content: NullableStringToEmptySchema,
});

export const AdminSessionDetailResponseSchema = z.object({
  sessionId: z.number(),
  sessionNumber: z.number(),
  title: NullableStringToEmptySchema,
  sessionImages: z.array(SessionImageSchema).nullable().optional().default([]),
  description: NullableStringToEmptySchema,
  generationId: z.number(),
  placeName: NullableStringToEmptySchema,
  roadNameAddress: NullableStringToEmptySchema,
  sessionDateTime: NullableStringToEmptySchema,
  content: NullableStringToEmptySchema,
  isOffline: z.boolean(),
  isOnline: z.boolean(),
  attendance: z
    .object({
      sessionId: z.number(),
      attendanceDeadLine: NullableStringToEmptySchema,
      lateDeadLine: NullableStringToEmptySchema,
      location: SessionLocationSchema.nullish().transform(
        (value) => value ?? {latitude: 0, longitude: 0}
      ),
    })
    .nullish(),
});

export const CreateSessionRequestSchema = z.object({
  generationId: z.number(),
  imageInfos: z.array(SessionImageUploadSchema).optional(),
  title: z.string(),
  description: z.string(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  placeName: z.string().optional(),
  roadNameAddress: z.string().optional(),
  attendanceStartTime: z.string(),
  isOffline: z.boolean().optional(),
  isOnline: z.boolean().optional(),
  attendanceEndTime: z.string().min(1),
  lateEndTime: z.string().min(1),
  content: z.string().optional(),
});

export const CreateSessionResponseSchema = z.object({
  sessionId: z.number(),
  sessionNumber: z.number(),
  sessionType: z.string(),
});

export const UpdateSessionRequestSchema = z.object({
  sessionId: z.number(),
  title: z.string().optional(),
  description: z.string().optional(),
  attendanceStartTime: z.string(),
  placeName: z.string().optional(),
  roadNameAddress: z.string().optional(),
  location: SessionLocationSchema.optional(),
  attendTime: SessionAttendTimeSchema.optional(),
  isOffline: z.boolean().optional(),
  isOnline: z.boolean().optional(),
  content: z.string().optional(),
});

export const PresignedUrlRequestSchema = z.object({
  fileName: z.string(),
  contentType: z.string(),
});

export const PresignedUrlResponseSchema = z.object({
  presignedUrl: z.string(),
  s3Key: z.string(),
});

export const CompleteImageUploadRequestSchema = z.object({
  sessionId: z.number(),
  s3Key: z.string(),
  order: z.number().optional().default(0),
});

export const CompleteImageUploadResponseSchema = z.object({
  imageId: z.number(),
  imageUrl: z.string(),
  s3Key: z.string(),
  order: z.number(),
});

export const ChangeImageOrderRequestSchema = z.object({
  sessionId: z.number(),
  orderInfos: z.array(
    z.object({
      imageId: z.number(),
      order: z.number(),
    })
  ),
});

export const DeleteSessionImageRequestSchema = z.object({
  imageId: z.number(),
});

export type SessionLocation = z.infer<typeof SessionLocationSchema>;
export type SessionAttendTime = z.infer<typeof SessionAttendTimeSchema>;
export type SessionImage = z.infer<typeof SessionImageSchema>;
export type SessionImageUpload = z.infer<typeof SessionImageUploadSchema>;
export type SessionData = z.infer<typeof SessionDataSchema>;
export type AdminSession = z.infer<typeof AdminSessionSchema>;
export type NewSessionData = Omit<SessionData, 'sessionId'>;
export type AdminSessionDetailResponse = z.infer<
  typeof AdminSessionDetailResponseSchema
>;
export type CreateSessionRequest = z.infer<typeof CreateSessionRequestSchema>;
export type CreateSessionResponse = z.infer<typeof CreateSessionResponseSchema>;
export type UpdateSessionRequest = z.infer<typeof UpdateSessionRequestSchema>;
export type PresignedUrlRequest = z.infer<typeof PresignedUrlRequestSchema>;
export type PresignedUrlResponse = z.infer<typeof PresignedUrlResponseSchema>;
export type CompleteImageUploadRequest = z.infer<
  typeof CompleteImageUploadRequestSchema
>;
export type CompleteImageUploadResponse = z.infer<
  typeof CompleteImageUploadResponseSchema
>;
export type ChangeImageOrderRequest = z.infer<
  typeof ChangeImageOrderRequestSchema
>;
export type DeleteSessionImageRequest = z.infer<
  typeof DeleteSessionImageRequestSchema
>;
