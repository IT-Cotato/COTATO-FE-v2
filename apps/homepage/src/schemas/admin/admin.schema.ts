import z from 'zod';

export type MemberStatus =
  | 'INACTIVE'
  | 'REJECTED'
  | 'REQUESTED'
  | 'RETIRED'
  | 'NOT_RETIRED'
  | 'APPROVED';

export type MemberTabType = 'ALL' | 'ACTIVE';
export type ApprovalTabType = 'REQUESTED' | 'REJECTED';
export type PositionType = 'PM' | 'DE' | 'FE' | 'BE' | 'NONE';

export type MemberType = {
  memberId: number;
  name: string;
  generationMemberId: number;
  position: PositionType;
  university: string;
  phoneNumber: string;
  role: 'MEMBER' | 'PR' | 'PLANNING' | 'EDUCATION' | 'OPERATION' | 'DEV';
  status: MemberStatus;
};

export type ApprovalMemberType = {
  memberId: number;
  name: string;
  appliedAt: string;
  passedGenerationNumber: number;
  position: PositionType;
  phoneNumber: string;
  status: MemberStatus;
};

export const AttendancePartPartSchema = z.enum(['ALL', 'PM', 'DE', 'FE', 'BE']);

/** 타입 추출 */
export type AttendancePartPartType = z.infer<typeof AttendancePartPartSchema>;
