'use client';

import {motion, Variants} from 'framer-motion';

interface AboutUsDescriptionProps {
  title: string;
  subTitle: string;
  subTitleOption?: string;
  titleColor: string;
  subTitleColor: string;
  className?: string;
}

export const AboutUsDescription = ({
  title,
  subTitle,
  subTitleOption,
  titleColor,
  subTitleColor,
  className = 'items-center text-center',
}: AboutUsDescriptionProps) => {
  return (
    <motion.div
      className={`z-20 flex w-full flex-col gap-3 sm:gap-12.5 ${className}`}
      initial='hidden'
      whileInView='visible'
      viewport={{once: false, margin: '-100px'}}
      variants={containerVariants}>
      <motion.h2
        className={`text-h5 sm:text-h2 z-10 w-full font-bold whitespace-pre-line ${titleColor}`}
        variants={itemVariants}>
        {title}
      </motion.h2>

      <motion.div
        className={`flex w-full flex-col ${className}`}
        variants={itemVariants}>
        <h4
          className={`text-body-l sm:text-h4 whitespace-pre-line ${subTitleColor}`}>
          {subTitle}
        </h4>
        {subTitleOption && (
          <h4
            className={`text-body-l sm:text-h4 whitespace-pre-line ${subTitleColor}`}>
            {subTitleOption}
          </h4>
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
