'use client';

import {GenerationDropdown} from '@/components/dropdown/GenerationDropdown';
import {Button} from '@/components/button/Button';
import {AdminRecruitmentInformation} from '@/app/admin/(with-sidebar)/application-form/_components/recruitment/AdminRecruitmentInformation';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useRecruitmentInformationsQuery} from '@/hooks/queries/useAdminRecruitmentInformationsQuery';
import {Spinner} from '@/components/ui/Spinner';
import {RecruitmentInformation} from '@/schemas/admin/admin-recruitment-infomation-schema';
import {usePostRecruitmentInformationsMutation} from '@/hooks/mutations/useAdminRecruitmentInformationsMutation';

export const AdminRecruitmentInformationContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const generation = searchParams.get('generationId') ?? '13';
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [recruitmentDraft, setRecruitmentDraft] =
    useState<RecruitmentInformation | null>(null);

  const {data, isLoading, isError, error} = useRecruitmentInformationsQuery(
    Number(generation)
  );
  const {mutate: postRecruitmentInformations, isPending} =
    usePostRecruitmentInformationsMutation();

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
        generationId: Number(generation),
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
        <GenerationDropdown
          generation={generation}
          generations={['13', '12', '11']}
          onSelect={handleGenerationChange}
        />
        {isEditing ? (
          <div className='flex flex-row gap-2.25'>
            <Button
              label='저장'
              labelTypo='body_l'
              borderRadius={5}
              disabled={isPending}
              backgroundColor='alert'
              textColor='neutral-50'
              width={112}
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
              width={112}
              height={36}></Button>
          </div>
        ) : (
          <Button
            label='수정'
            labelTypo='body_l'
            borderRadius={5}
            backgroundColor='secondary'
            textColor='neutral-50'
            width={112}
            height={36}
            onClick={handleEditStart}
          />
        )}
      </div>
      <AdminRecruitmentInformation
        data={isEditing ? recruitmentDraft! : data}
        isEditing={isEditing}
        onChange={setRecruitmentDraft}
      />
    </>
  );
};
