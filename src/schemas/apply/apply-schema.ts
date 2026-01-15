import {z} from 'zod';

export const BasicInfoSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  gender: z.enum(['male', 'female'], {
    message: '성별을 선택해주세요',
  }),
  contact: z.string().min(1, '연락처를 입력해주세요'),
  birthDate: z.string().min(1, '생년월일을 입력해주세요'),
  school: z.string().min(1, '학교를 입력해주세요'),
  isCollegeStudent: z.enum(['enrolled', 'other'], {
    message: '재학 여부를 선택해주세요',
  }),
  department: z.string().min(1, '학과를 입력해주세요'),
  completedSemesters: z.enum(['4', '5', '6', '7', '8'], {
    message: '수료 학기를 선택해주세요',
  }),
  isPrevActivity: z.enum(['yes', 'no'], {
    message: '활동 여부를 선택해주세요',
  }),
  part: z.string().min(1, '파트를 선택해주세요'),
});

export type BasicInfoFormData = z.infer<typeof BasicInfoSchema>;
