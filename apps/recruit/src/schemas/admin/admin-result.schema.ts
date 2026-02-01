import {createSuccessResponseSchema} from '@/schemas/common/common-schema';
import {z} from 'zod';

export const PassStatusSchema = z.object({
  passStatus: z.enum(['PASS', 'FAIL', 'WAITLISTED']),
  counts: z.object({
    BE: z.number(),
    FE: z.number(),
    PM: z.number(),
    DE: z.number(),
    ALL: z.number(),
  }),
});

export const AdminPassStatusResponseSchema = createSuccessResponseSchema(
  z.array(PassStatusSchema)
);

export type PassStatusData = z.infer<typeof PassStatusSchema>;
