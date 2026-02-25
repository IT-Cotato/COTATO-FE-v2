'use client';

import {motion, Variants} from 'framer-motion';

interface HomeSectionDescriptionProps {
  title: string;
  descriptions: string[];
  align?: 'start' | 'center' | 'end';
}

export const HomeSectionDescription = ({
  title,
  descriptions,
  align = 'start',
}: HomeSectionDescriptionProps) => {
  const alignmentClass = {
    start: 'items-start text-start',
    center: 'items-center text-center',
    end: 'items-end text-end',
  };

  return (
    <motion.div
      className={`flex flex-col gap-5 ${alignmentClass[align]}`}
      initial='hidden'
      whileInView='visible'
      viewport={{once: false, margin: '-100px'}}
      variants={containerVariants}>
      <motion.h2
        className='text-h2 break-keep text-neutral-800'
        variants={itemVariants}>
        {title}
      </motion.h2>

      <motion.div
        className='text-h5 flex flex-col break-keep text-neutral-500'
        variants={itemVariants}>
        {descriptions.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
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
