import {z} from 'zod';

export const PositionEnum = z.enum(['PM', 'DESIGN', 'FE', 'BE', 'NONE']);

export const ProjectMemberSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  position: PositionEnum,
});

// 프로젝트 등록 스키마
export const ProjectRegistrationSchema = z.object({
  generationId: z.number(),
  projectType: z.enum(['DEMODAY', 'HACKATHON']),
  projectName: z.string().min(1, '프로젝트 명을 입력해주세요.'),
  shortDescription: z.string().min(1, '한줄 소개를 입력해주세요.'),
  projectLink: z
    .string()
    .min(1, '링크를 입력해주세요.')
    .includes('.', {message: '올바른 링크 형식이 아닙니다.'}), // 최소한 점 하나는 있어야 함
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, '날짜 형식이 올바르지 않습니다.'),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, '날짜 형식이 올바르지 않습니다.'),
  projectIntroduction: z.string(),
  members: z.array(ProjectMemberSchema),
  imageInfos: z.array(
    z.object({
      s3Key: z.string(),
      publicUrl: z.string(),
      order: z.number(),
    })
  ),
});

export const ProjectDetailSchema = ProjectRegistrationSchema.extend({
  projectId: z.number(),
});

export type ProjectRegistration = z.infer<typeof ProjectRegistrationSchema>;
export type ProjectDetail = z.infer<typeof ProjectDetailSchema>;
export type Position = z.infer<typeof PositionEnum>;

/**
 * 상세 조회 응답 인터페이스
 */
export interface ApiImageInfo {
  imageId: number;
  imageUrl: string;
  imageOrder: number;
}

export interface ApiMemberInfo {
  memberId: number;
  name: string;
  position: Position;
}

export interface ProjectDetailResponse {
  projectId: number;
  name: string;
  shortDescription: string;
  introduction: string;
  projectType: 'HACKATHON' | 'DEMODAY';
  projectLink: string;
  startDate: string;
  endDate: string;
  generationId: number;
  imageInfos: ApiImageInfo[];
  memberInfos: ApiMemberInfo[];
}
