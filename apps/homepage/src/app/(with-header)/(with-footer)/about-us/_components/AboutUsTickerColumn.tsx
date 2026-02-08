import {motion} from 'framer-motion';
import Image from 'next/image';

interface TickerItem {
  id: number;
  src: string;
  label: string;
}

interface AboutUsTickerColumnProps {
  items: TickerItem[];
  duration: number;
  reverse?: boolean;
}

export const AboutUsTickerColumn = ({
  items,
  duration,
  reverse = false,
}: AboutUsTickerColumnProps) => {
  const duplicatedItems = [...items, ...items];

  return (
    <div className='relative h-201.5 w-67 flex-1 overflow-hidden rounded-[10px]'>
      <motion.div
        className='flex flex-col gap-4 py-2'
        animate={{
          y: reverse ? ['-50%', '0%'] : ['0%', '-50%'],
        }}
        transition={{
          duration,
          ease: 'linear',
          repeat: Infinity,
        }}>
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className='relative flex h-92 w-full shrink-0 items-center justify-center overflow-hidden rounded-[10px]'>
            <Image
              src={item.src}
              alt={item.label}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 300px'
            />
            <div className='absolute inset-0 flex items-center justify-center bg-black/30'></div>

            <span className='text-h5 absolute bottom-10 left-6.5 z-10 text-white'>
              {item.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
