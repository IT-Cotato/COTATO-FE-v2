'use client';

import {useState} from 'react';
import {useSearchParams, useRouter} from 'next/navigation';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {RecruitmentActive} from '@/app/(home)/_components/RecruitmentActive';
import {RecruitmentInactive} from '@/app/(home)/_components/RecruitmentInactive';
import {SubmissionCompleteModal} from '@/components/modal/SubmissionCompleteModal';
import {SubmissionIncompleteModal} from '@/components/modal/SubmissionIncompleteModal';

export default function HomeClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isRecruiting = useRecruitmentStore((state) => state.isRecruiting);

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
}
