'use client';

import {GenerationDropdown} from '@/components/dropdown/GenerationDropdown';
import {Button} from '@repo/ui/components/buttons/Button';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {Spinner} from '@/components/ui/Spinner';
import {useAdminRecruitmentInformationsQuery} from '@/hooks/queries/useAdminRecruitmentInformations.query';
import {useAdminRecruitmentInformationsMutation} from '@/hooks/mutations/useAdminRecruitmentInformations.mutation';
import {RecruitmentInformationType} from '@/schemas/admin/admin-recruitment-information.schema';
import {RecruitmentInformation} from '@/components/recruitment/RecruitmentInformation';

interface AdminRecruitmentInformationContainerProps {
  generations: string[];
  generationId: number;
}

export const AdminRecruitmentInformationContainer = ({
  generations,
  generationId,
}: AdminRecruitmentInformationContainerProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [recruitmentDraft, setRecruitmentDraft] =
    useState<RecruitmentInformationType | null>(null);

  const {data, isLoading, isError, error} =
    useAdminRecruitmentInformationsQuery(generationId);
  const {mutate: postRecruitmentInformations, isPending} =
    useAdminRecruitmentInformationsMutation();

  useEffect(() => {
    if (isError) {
      alert(`${error.message}`);
      router.back();
    }
  }, [isError, error, router]);

  const handleGenerationChange = (next: string) => {
    router.push(`?generationId=${next}`);
  };

  const handleEditStart = () => {
    if (!data) return;
    setRecruitmentDraft(data);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!recruitmentDraft) return;

    postRecruitmentInformations(
      {
        generationId,
        ...recruitmentDraft,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          alert('모집 일정이 저장되었습니다.');
        },
        onError: (error) => {
          alert(error.message);
        },
      }
    );
  };

  const handleCancel = () => {
    if (!data) return;
    setRecruitmentDraft(data);
    setIsEditing(false);
  };

  if (isLoading || !data) {
    return <Spinner />;
  }

  return (
    <>
      <div className='flex flex-row justify-between'>
        <label id='generation-label' className='sr-only'>
          기수 선택
        </label>
        <GenerationDropdown
          aria-labelledby='generation-label'
          generation={String(generationId)}
          generations={generations}
          onSelect={handleGenerationChange}
        />
        {isEditing ? (
          <div
            role='group'
            className='flex flex-row gap-2.25'
            aria-label='모집 정보 편집 중'>
            <Button
              label='저장'
              labelTypo='body_l'
              borderRadius={5}
              disabled={isPending}
              backgroundColor='alert'
              textColor='neutral-50'
              width={64}
              height={36}
              onClick={handleSave}></Button>
            <Button
              variant='outline'
              onClick={handleCancel}
              label='취소'
              labelTypo='body_l'
              borderRadius={5}
              backgroundColor='white'
              textColor='neutral-400'
              width={64}
              height={36}></Button>
          </div>
        ) : (
          <Button
            label='수정'
            labelTypo='body_l'
            borderRadius={5}
            backgroundColor='secondary'
            textColor='neutral-50'
            width={145}
            height={36}
            onClick={handleEditStart}
          />
        )}
      </div>
      <RecruitmentInformation
        data={isEditing ? recruitmentDraft! : data}
        isEditing={isEditing}
        onChange={setRecruitmentDraft}
      />
    </>
  );
};
