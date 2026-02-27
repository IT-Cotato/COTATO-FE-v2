import {z} from 'zod';

export const MemberStatusSchema = z.enum([
  'INACTIVE',
  'REJECTED',
  'REQUESTED',
  'RETIRED',
  'NOT_RETIRED',
  'APPROVED',
]);

export const PositionSchema = z.enum(['PM', 'DE', 'FE', 'BE', 'NONE']);

export const MemberRoleSchema = z.enum([
  'MEMBER',
  'PR',
  'PLANNING',
  'EDUCATION',
  'OPERATION',
  'DEV',
]);

export const GenderSchema = z.enum(['MALE', 'FEMALE']);

export const AdminMemberSchema = z.object({
  memberId: z.number(),
  name: z.string(),
  gender: GenderSchema,
  phoneNumber: z.string(),
  university: z.string(),
  passedGenerationNumber: z.number(),
  latestGenerationNumber: z.number(),
  position: PositionSchema,
  role: MemberRoleSchema,
  status: MemberStatusSchema,
});

export const AdminMemberDetailSchema = AdminMemberSchema.extend({
  email: z.string(),
});

export const AdminMembersPageResponseSchema = z.object({
  content: z.array(AdminMemberSchema),
  hasNext: z.boolean(),
  totalPages: z.number(),
  totalElements: z.number(),
  page: z.number(),
  size: z.number(),
  isFirst: z.boolean(),
  isLast: z.boolean(),
});

export type GetAdminMembersParams = {
  search?: string;
  statuses?: MemberStatus[];
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
  page?: number;
  size?: number;
};

export type PatchMembersStatusRequest = {
  memberIds: number[];
  status: MemberStatus;
};

export type DeleteMembersRequest = {
  memberIds: number[];
};

export type MemberStatus = z.infer<typeof MemberStatusSchema>;
export type PositionType = z.infer<typeof PositionSchema>;
export type MemberRole = z.infer<typeof MemberRoleSchema>;
export type AdminMemberType = z.infer<typeof AdminMemberSchema>;
export type AdminMemberDetailType = z.infer<typeof AdminMemberDetailSchema>;
export type AdminMembersPageResponse = z.infer<
  typeof AdminMembersPageResponseSchema
>;

/** @deprecated AdminMemberType 사용 권장 가입 승인 API 연동시 삭제 예정*/
export type MemberType = AdminMemberType;
export type ApprovalMemberType = {
  memberId: number;
  name: string;
  appliedAt: string;
  passedGenerationNumber: number;
  position: PositionType;
  phoneNumber: string;
  status: MemberStatus;
};
