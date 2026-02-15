export type MemberStatus =
  | 'INACTIVE'
  | 'REJECTED'
  | 'REQUESTED'
  | 'RETIRED'
  | 'NOT_RETIRED'
  | 'APPROVED';

export type MemberTabType = 'ALL' | 'ACTIVE';
export type ApprovalTabType = 'REQUESTED' | 'REJECTED';

export type MemberType = {
  memberId: number;
  name: string;
  generationMemberId: number;
  position: 'PM' | 'DE' | 'FE' | 'BE' | 'NONE';
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
  position: 'PM' | 'DE' | 'FE' | 'BE' | 'NONE';
  phoneNumber: string;
  status: MemberStatus;
};
