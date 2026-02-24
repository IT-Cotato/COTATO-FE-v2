'use client';

import {motion, Variants} from 'framer-motion';

interface AboutUsDescriptionProps {
  title: string;
  subTitle: string;
  subTitleOption?: string;
  titleColor: string;
  subTitleColor: string;
}

export const AboutUsDescription = ({
  title,
  subTitle,
  subTitleOption,
  titleColor,
  subTitleColor,
}: AboutUsDescriptionProps) => {
  return (
    <motion.div
      className='flex flex-col gap-12.5'
      initial='hidden'
      whileInView='visible'
      viewport={{once: false, margin: '-100px'}}
      variants={containerVariants}>
      <motion.h2
        className={`text-h2 z-10 px-4 text-center font-bold ${titleColor}`}
        variants={itemVariants}>
        {title}
      </motion.h2>

      <motion.div className='flex flex-col text-center' variants={itemVariants}>
        <h4 className={`text-h4 ${subTitleColor}`}>{subTitle}</h4>
        {subTitleOption && (
          <h4 className={`text-h4 ${subTitleColor}`}>{subTitleOption}</h4>
        )}
      </motion.div>
    </motion.div>
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
