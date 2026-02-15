import {ApprovalMemberType} from '@/schemas/admin/admin.schema';

export const MOCK_APPROVAL_MEMBERS: ApprovalMemberType[] = Array.from(
  {length: 11},
  (_, i) => ({
    memberId: i + 1,
    name: '이감자',
    appliedAt: '2026-02-15T01:11:06.449Z',
    passedGenerationNumber: 13,
    position: 'FE' as const,
    phoneNumber: '010-1234-5678',
    status: 'REQUESTED' as const,
  })
);
