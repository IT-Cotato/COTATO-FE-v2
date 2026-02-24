'use client';

import {motion, Variants} from 'framer-motion';

interface HomeSectionHeaderProps {
  mainHeading: string;
  subHeading: string;
}

export const HomeSectionHeader = ({
  mainHeading,
  subHeading,
}: HomeSectionHeaderProps) => {
  return (
    <motion.div
      className='flex flex-col items-center gap-5'
      initial='hidden'
      whileInView='visible'
      viewport={{once: false, margin: '-100px'}}
      variants={containerVariants}>
      <motion.p className='text-h3 text-neutral-500' variants={itemVariants}>
        {mainHeading}
      </motion.p>

      <motion.h2 className='text-h2 text-neutral-800' variants={itemVariants}>
        {subHeading}
      </motion.h2>
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
