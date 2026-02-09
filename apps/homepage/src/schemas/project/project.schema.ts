import {z} from 'zod';

export const PositionEnum = z.enum(['PM', 'DE', 'FE', 'BE']);

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
  projectLink: z.url('링크 형식이 올바르지 않습니다.'),
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
      publicUrl: z.url(),
      order: z.number(),
    })
  ),
});

// 프로젝트 상세 조회 스키마
export const ProjectDetailSchema = ProjectRegistrationSchema.extend({
  projectId: z.number(),
});

export type ProjectRegistration = z.infer<typeof ProjectRegistrationSchema>;
export type ProjectDetail = z.infer<typeof ProjectDetailSchema>;
export type Position = z.infer<typeof PositionEnum>;
