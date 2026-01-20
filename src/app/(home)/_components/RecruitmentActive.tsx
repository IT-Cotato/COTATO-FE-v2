'use client';

import Image from 'next/image';
import {Button} from '@/components/button/Button';
import {RECRUITMENT_NOTICES} from '@/constants/home/recruitment';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {useRouter} from 'next/navigation';
import {ROUTES} from '@/constants/routes';
import {useState} from 'react';
import {LoginModal} from '@/components/modal/LoginModal';
import {useAuthStore} from '@/store/useAuthStore';
import {useSubmissionStore} from '@/store/useSubmissionStore';
import {startApplication} from '@/services/api/apply/apply.api';

export const RecruitmentActive = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const generation = useRecruitmentStore((state) => state.generation);
  const {isAuthenticated} = useAuthStore();
  const hasSubmitted = useSubmissionStore((state) => state.hasSubmitted);
  const setHasSubmitted = useSubmissionStore((state) => state.setHasSubmitted);

  const handleApplyClick = async () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
    } else {
      try {
        const {applicationId, isSubmitted} = await startApplication();
        setHasSubmitted(isSubmitted);
        if (!isSubmitted) {
          router.push(`${ROUTES.APPLY}?id=${applicationId}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <section className='relative flex min-h-[calc(100dvh-88px)] w-full flex-col items-center justify-center overflow-hidden bg-black px-4'>
        <Image
          src='/background/background.svg'
          alt='배경 이미지'
          fill
          priority
          className='object-cover object-center'
        />
        <div className='relative z-10 flex w-full max-w-240 flex-col gap-5'>
          <h1 className='text-h4 text-white'>
            🥔 코테이토 {generation}기 지원서 🥔
          </h1>
          <div className='flex flex-col gap-8 rounded-[10px] bg-white px-20.5 pt-11 pb-21'>
            <h4 className='text-h4 text-black'>⚠️ 지원 전 유의 사항 ⚠️</h4>

            <ul className='list-disc space-y-3 pl-6 text-neutral-800'>
              {RECRUITMENT_NOTICES.map((notice, index) => (
                <li key={index} className='text-body-l leading-relaxed'>
                  {notice}
                </li>
              ))}
            </ul>
          </div>
          <div className='flex justify-end'>
            <Button
              label='지원하기'
              onClick={handleApplyClick}
              disabled={hasSubmitted}
            />
          </div>
        </div>
      </section>

      <LoginModal
        title='로그인 후 이용할 수 있는 서비스입니다.'
        content='지원서 작성을 위해 로그인을 해주세요!'
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
