import {z} from 'zod';

// 포지션 Enum (NONE 제외)
export const PositionEnum = z.enum(['PM', 'DESIGN', 'FE', 'BE']);

// 1. 프로젝트 등록 요청 스키마 (Admin POST /v1/api/admin/projects)
export const ProjectRegistrationSchema = z.object({
  generationId: z.number().int(),
  projectType: z.enum(['HACKATHON', 'DEMODAY']),
  projectName: z.string().min(1, '프로젝트 명을 입력해주세요.'),
  shortDescription: z.string().optional(), // 명세상 필수 표시 없음
  projectLink: z.string().optional(), // 명세상 필수 표시 없음
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, '날짜 형식이 올바르지 않습니다.'),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, '날짜 형식이 올바르지 않습니다.'),
  projectIntroduction: z.string().optional(),
  members: z.array(
    z.object({
      name: z.string().min(1, '이름을 입력해주세요.'),
      position: PositionEnum, // NONE 제외된 버전
    })
  ),
  imageInfos: z.array(
    z.object({
      s3Key: z.string(),
      order: z.number().int(),
    })
  ),
});

// 2. 프로젝트 상세 응답 스키마 (GET /v1/api/projects/{projectId})
export const ProjectDetailSchema = z.object({
  projectId: z.number().int(),
  name: z.string(),
  shortDescription: z.string(),
  introduction: z.string(),
  projectType: z.enum(['HACKATHON', 'DEMODAY']),
  projectLink: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  generationId: z.number().int(),
  imageInfos: z.array(
    z.object({
      imageId: z.number().int(),
      imageUrl: z.string().url(),
      imageOrder: z.number().int(),
    })
  ),
  memberInfos: z.array(
    z.object({
      memberId: z.number().int(),
      name: z.string(),
      position: PositionEnum,
    })
  ),
});

// 타입 추출
export type ProjectRegistration = z.infer<typeof ProjectRegistrationSchema>;
export type ProjectDetail = z.infer<typeof ProjectDetailSchema>;
export type Position = z.infer<typeof PositionEnum>;
