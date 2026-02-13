'use client';

import {useState} from 'react';
import {useSearchParams, useRouter} from 'next/navigation';
import {useRecruitmentStatusQuery} from '@/hooks/queries/useRecruitmentStatus.query';
import {RecruitmentActive} from '@/app/(home)/_components/RecruitmentActive';
import {RecruitmentInactive} from '@/app/(home)/_components/RecruitmentInactive';
import {SubmissionCompleteModal} from '@/components/modal/SubmissionCompleteModal';
import {SubmissionIncompleteModal} from '@/components/modal/SubmissionIncompleteModal';
import {Spinner} from '@repo/ui/components/spinner/Spinner';

export const HomeClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const {data: recruitmentStatus, isLoading} = useRecruitmentStatusQuery();
  const isRecruiting = recruitmentStatus?.isActive ?? false;

  const submittedParam = searchParams.get('submitted');

  const [isSubmissionCompleteModalOpen, setIsSubmissionCompleteModalOpen] =
    useState(submittedParam === 'true');
  const [isSubmissionIncompleteModalOpen, setIsSubmissionIncompleteModalOpen] =
    useState(submittedParam === 'false');

  const closeSubmissionCompleteModal = () => {
    setIsSubmissionCompleteModalOpen(false);
    router.replace('/');
  };

  const closeSubmissionIncompleteModal = () => {
    setIsSubmissionIncompleteModalOpen(false);
    router.replace('/');
  };

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <main>
        {isRecruiting ? <RecruitmentActive /> : <RecruitmentInactive />}
      </main>
      <SubmissionCompleteModal
        isOpen={isSubmissionCompleteModalOpen}
        onClose={closeSubmissionCompleteModal}
        onConfirm={closeSubmissionCompleteModal}
      />
      <SubmissionIncompleteModal
        isOpen={isSubmissionIncompleteModalOpen}
        onClose={closeSubmissionIncompleteModal}
        onConfirm={closeSubmissionIncompleteModal}
      />
    </>
  );
};
