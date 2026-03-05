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
  phoneNumber: z.string().nullable(),
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

export const ApprovalMemberSchema = z.object({
  memberId: z.number(),
  name: z.string(),
  appliedAt: z.string(),
  passedGenerationNumber: z.number(),
  position: PositionSchema,
  phoneNumber: z.string().nullable(),
  status: MemberStatusSchema,
});

export const ApplicantsPageResponseSchema = z.object({
  content: z.array(ApprovalMemberSchema),
  hasNext: z.boolean(),
  totalPages: z.number(),
  totalElements: z.number(),
  page: z.number(),
  size: z.number(),
  isFirst: z.boolean(),
  isLast: z.boolean(),
});

export const ActiveMemberSchema = z.object({
  generationMemberId: z.number(),
  memberId: z.number(),
  name: z.string(),
  phoneNumber: z.string().nullable(),
  university: z.string(),
  position: PositionSchema,
  role: MemberRoleSchema,
  passedGenerationNumber: z.number(),
});

export const ActiveMembersPageResponseSchema = z.object({
  content: z.array(ActiveMemberSchema),
  hasNext: z.boolean(),
  page: z.number(),
  size: z.number(),
  isFirst: z.boolean(),
  isLast: z.boolean(),
});

export const UpdateActiveMemberInfoRequestSchema = z.object({
  name: z.string(),
  gender: GenderSchema,
  university: z.string(),
  phoneNumber: z.string().nullable(),
  position: PositionSchema,
  role: MemberRoleSchema,
  status: MemberStatusSchema,
});

export const UpdateGenerationMemberRoleRequestSchema = z.object({
  role: MemberRoleSchema,
});

export type GetAdminMembersParams = {
  search?: string;
  statuses?: MemberStatus[];
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
  page?: number;
  size?: number;
};

export type GetActiveMembersParams = {
  generationId: number;
  search?: string;
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

export type PatchActiveMemberRequest = {
  name: string;
  gender: 'MALE' | 'FEMALE';
  university: string;
  phoneNumber: string | null;
  position: PositionType;
  role: MemberRole;
  status: MemberStatus;
};

export type PatchActiveMemberRoleRequest = {
  role: MemberRole;
};

export type MemberStatus = z.infer<typeof MemberStatusSchema>;
export type PositionType = z.infer<typeof PositionSchema>;
export type MemberRole = z.infer<typeof MemberRoleSchema>;
export type AdminMemberType = z.infer<typeof AdminMemberSchema>;
export type AdminMemberDetailType = z.infer<typeof AdminMemberDetailSchema>;
export type AdminMembersPageResponse = z.infer<
  typeof AdminMembersPageResponseSchema
>;
export type ActiveMemberType = z.infer<typeof ActiveMemberSchema>;
export type ActiveMembersPageResponse = z.infer<
  typeof ActiveMembersPageResponseSchema
>;

/**
 * ALL/ACTIVE 탭 공용 테이블 타입
 * AdminMemberType과 ActiveMemberType의 공통 + 선택 필드
 */
export type MemberType = {
  memberId: number;
  name: string;
  passedGenerationNumber: number;
  position: PositionType;
  university: string;
  phoneNumber: string | null;
  role: MemberRole;
  // ALL 탭 전용
  status?: MemberStatus;
  gender?: z.infer<typeof GenderSchema>;
  latestGenerationNumber?: number;
  // ACTIVE 탭 전용
  generationMemberId?: number;
};
export type UpdateActiveMemberInfoRequest = z.infer<
  typeof UpdateActiveMemberInfoRequestSchema
>;
export type UpdateGenerationMemberRoleRequest = z.infer<
  typeof UpdateGenerationMemberRoleRequestSchema
>;

export type ApprovalMemberType = z.infer<typeof ApprovalMemberSchema>;
export type ApplicantsPageResponse = z.infer<
  typeof ApplicantsPageResponseSchema
>;
