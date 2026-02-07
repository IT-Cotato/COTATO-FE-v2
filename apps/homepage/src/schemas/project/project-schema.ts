import {z} from 'zod';

export const PositionEnum = z.enum(['PM', 'DE', 'FE', 'BE']);

export const ProjectMemberSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  position: PositionEnum,
});

export const ProjectRegistrationSchema = z.object({
  generationId: z.number(),
  projectType: z.enum(['DEMODAY', 'OTHERS']),
  projectName: z.string().min(1, '프로젝트 명을 입력해주세요.'),
  shortDescription: z.string().min(1, '한줄 소개를 입력해주세요.'),
  projectLink: z.url('링크 형식이 올바르지 않습니다.'),
  startDate: z.string(), // YYYY-MM-DD
  endDate: z.string(), // YYYY-MM-DD
  projectIntroduction: z.string(),
  members: z.array(ProjectMemberSchema),
  imageInfos: z.array(
    z.object({
      s3Key: z.string(),
      publicUrl: z.url('이미지 URL 형식이 올바르지 않습니다.'),
      order: z.number(),
    })
  ),
});

export type ProjectRegistration = z.infer<typeof ProjectRegistrationSchema>;
export type Position = z.infer<typeof PositionEnum>;
