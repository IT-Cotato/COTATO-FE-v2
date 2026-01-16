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

export const AdminPassStatusResponseSchema = z.object({
  code: z.string(),
  message: z.string(),
  data: z.array(PassStatusSchema),
});

export type PassStatusData = z.infer<typeof PassStatusSchema>;
