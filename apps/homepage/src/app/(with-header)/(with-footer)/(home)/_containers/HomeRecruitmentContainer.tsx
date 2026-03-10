'use client';

import {ROUTES} from '@/constants/routes';
import {Button} from '@repo/ui/components/buttons/Button';
import {useRouter} from 'next/navigation';
import {motion, Variants} from 'framer-motion';
import {useRecruitmentsStatus} from '@/hooks/queries/useAdminRecruit.query';

export const HomeRecruitmentContainer = () => {
  const router = useRouter();
  const {data} = useRecruitmentsStatus();

  const isRecruiting = data?.active;

  const handleButtonClick = () => {
    if (isRecruiting) {
      window.open(
        'https://recruit.cotato.kr/',
        '_blank',
        'noopener,noreferrer'
      );
    } else {
      router.push(ROUTES.RECRUIT);
    }
  };

  return (
    <section
      className='flex flex-col items-center gap-5 sm:gap-10'
      aria-labelledby='recruitment-title'>
      <motion.div
        className='flex flex-col items-center gap-2 sm:gap-6'
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{once: false, amount: 0.3}}>
        <motion.p
          variants={itemVariants}
          className='text-h5 sm:text-h4 text-neutral-600'>
          코테이토와 당신의 여정을 함께하세요!
        </motion.p>
        <motion.h2
          variants={itemVariants}
          className='text-h5 sm:text-h2 font-bold text-neutral-800'
          id='recruitment-title'>
          코테이토에서 함께할 신입 감자분들을 모집합니다.
        </motion.h2>

        <motion.div variants={itemVariants} className='mt-4'>
          <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
            <Button
              label={isRecruiting ? '지원서 작성하기' : '알림 신청 바로가기'}
              width={349}
              onClick={handleButtonClick}
              className='text-h5 sm:text-h3 transition-all duration-300'
              aria-label={
                isRecruiting
                  ? '코테이토 지원서 작성 외부 사이트로 이동'
                  : '알림 신청 페이지로 이동'
              }
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const containerVariants: Variants = {
  hidden: {opacity: 0, y: 30},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {opacity: 0, y: 20},
  visible: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.6},
  },
};
