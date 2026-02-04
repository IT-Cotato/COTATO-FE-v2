import Potato1 from '@/assets/home/potato/Potato-1.svg';
import Potato2 from '@/assets/home/potato/Potato-2.svg';
import Potato3 from '@/assets/home/potato/Potato-3.svg';
import {useMemo} from 'react';

const POTATO_IMAGES = [Potato1, Potato2, Potato3];

interface HomeCotatoReviewProps {
  generation: string;
  part: string;
  name: string;
  shortDescription: string;
  longDescription: string;
}

export const HomeCotatoReviewCard = ({
  generation,
  part,
  name,
  shortDescription,
  longDescription,
}: HomeCotatoReviewProps) => {
  const SelectedPotato = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * POTATO_IMAGES.length);
    return POTATO_IMAGES[randomIndex];
  }, []);

  return (
    <div className='flex h-92 w-84.75 flex-col gap-5 rounded-[30px] bg-neutral-800 px-6.75 py-7 text-white'>
      <div className='flex h-26 flex-row items-end justify-between'>
        <div>
          <p className='text-body-l'>
            {generation}기 {part}
          </p>
          <p className='text-h4'>{name}</p>
        </div>

        <SelectedPotato />
      </div>
      <div className='bg-primary text-h5 rounded-[5px] px-7.75 py-2 text-center'>
        {`"${shortDescription}"`}
      </div>
      <p className='text-body-l'>{longDescription}</p>
    </div>
  );
};
