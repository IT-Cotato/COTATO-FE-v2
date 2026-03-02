import Image from 'next/image';

const POTATO_IMAGE_PATHS = [
  '/potato/Potato-1.svg',
  '/potato/Potato-2.svg',
  '/potato/Potato-3.svg',
];
interface HomeCotatoReviewProps {
  generation: string;
  part: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  id: number;
}

export const HomeCotatoReviewCard = ({
  generation,
  part,
  name,
  shortDescription,
  longDescription,
  id,
}: HomeCotatoReviewProps) => {
  const selectedPotatoPath = POTATO_IMAGE_PATHS[id % POTATO_IMAGE_PATHS.length];

  return (
    <div className='flex h-92 w-80 flex-col gap-5 rounded-[30px] bg-neutral-800 px-6.75 py-7 text-white xl:w-84.75'>
      <div className='flex flex-row items-end justify-between xl:h-26'>
        <div>
          <p className='text-body-l'>
            {generation}기 {part}
          </p>
          <p className='text-h4'>{name}</p>
        </div>

        <div className='relative h-17.75 w-17.75 xl:h-20 xl:w-20'>
          <Image
            src={selectedPotatoPath}
            alt='potato'
            fill
            className='object-contain'
          />
        </div>
      </div>
      <div className='bg-primary text-h5 rounded-[5px] py-1 text-center xl:py-2'>
        {`"${shortDescription}"`}
      </div>
      <div className='relative flex-1 overflow-hidden'>
        <div className='scrollbar-hide h-full overflow-y-auto'>
          <p className='text-h5 xl:text-body-l leading-relaxed'>
            {longDescription}
          </p>
        </div>

        <div
          className='pointer-events-none absolute bottom-0 left-0 h-10 w-full bg-linear-to-t from-neutral-800 to-transparent'
          aria-hidden='true'
        />
      </div>
    </div>
  );
};
