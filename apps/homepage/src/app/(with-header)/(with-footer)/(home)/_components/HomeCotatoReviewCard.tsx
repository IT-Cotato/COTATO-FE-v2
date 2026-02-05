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
    <div className='flex h-92 w-84.75 flex-col gap-5 rounded-[30px] bg-neutral-800 px-6.75 py-7 text-white'>
      <div className='flex h-26 flex-row items-end justify-between'>
        <div>
          <p className='text-body-l'>
            {generation}기 {part}
          </p>
          <p className='text-h4'>{name}</p>
        </div>

        <div className='relative h-20 w-20'>
          <Image
            src={selectedPotatoPath}
            alt='potato'
            fill
            className='object-contain'
          />
        </div>
      </div>
      <div className='bg-primary text-h5 rounded-[5px] px-7.75 py-2 text-center'>
        {`"${shortDescription}"`}
      </div>
      <p className='text-body-l'>{longDescription}</p>
    </div>
  );
};
