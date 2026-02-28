import z from 'zod';

export const AttendancePartSchema = z.enum(['ALL', 'PM', 'DE', 'FE', 'BE']);

/** 타입 추출 */
export type AttendancePartType = z.infer<typeof AttendancePartSchema>;
