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
  className?: string;
}

export const AboutUsTickerColumn = ({
  items,
  duration,
  reverse = false,
  className = '',
}: AboutUsTickerColumnProps) => {
  const duplicatedItems = [...items, ...items];

  return (
    <div
      className={`relative h-201.5 w-38.75 flex-1 overflow-hidden rounded-[10px] sm:w-67 ${className}`}>
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
            className='relative flex h-53.25 w-full shrink-0 items-center justify-center overflow-hidden rounded-[10px] md:h-92'>
            <Image
              src={item.src}
              alt={item.label}
              fill
              unoptimized={true}
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 300px'
            />
            <div className='absolute inset-0 flex items-center justify-center bg-black/30'></div>

            <span className='text-body-m sm:text-h5 absolute bottom-3 left-3 z-10 text-white md:bottom-10 md:left-6.5'>
              {item.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
