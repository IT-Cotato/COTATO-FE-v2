import {ApplyFormData, ApplyFormSchema} from '@/schemas/apply/apply-schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

/**
 * 지원서 폼 초기화 훅
 * - ApplyFormData 타입: 모든 Step의 필드 포함 (Step 간 데이터 공유 위해)
 * - ApplyFormSchema: 전체 필드 검증, trigger(fieldNames)로 Step별 검증
 */
export const useApplyForm = () => {
  const methods = useForm<ApplyFormData>({
    mode: 'onChange',
    resolver: zodResolver(ApplyFormSchema),
    defaultValues: {
      name: '',
      gender: undefined,
      contact: '',
      birthDate: '',
      school: '',
      isCollegeStudent: undefined,
      department: '',
      completedSemesters: undefined,
      isPrevActivity: undefined,
      part: undefined,
    },
  });

  return methods;
};
