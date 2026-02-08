import JikhaengIcon from '@/assets/about-us/sponsor-logo/jikhaeng.svg';
import CryCheeseBurgerIcon from '@/assets/about-us/sponsor-logo/crycheeseburger.svg';
import HspaceIcon from '@/assets/about-us/sponsor-logo/hspace.svg';
import {AboutUsDescription} from '@/app/(with-header)/(with-footer)/about-us/_components/AboutUsDescription';

export const AboutUsSponsor = () => {
  return (
    <div className='flex flex-col gap-25'>
      <AboutUsDescription
        title='Sponsored by'
        titleColor='text-neutral-800'
        subTitleColor='text-neutral-500'
        subTitle='COde Together, Arrive TOgether!'
        subTitleOption='코테이토의 여정에 동행해주시는 공식 파트너 단체입니다.'
      />
      <div className='z-20 flex flex-row items-center gap-10'>
        {SPONSORS.map(({id, Icon}) => (
          <div key={id}>
            <Icon />
          </div>
        ))}
      </div>
    </div>
  );
};
const SPONSORS = [
  {id: 'jikhaeng', Icon: JikhaengIcon},
  {id: 'crycheese', Icon: CryCheeseBurgerIcon},
  {id: 'hspace', Icon: HspaceIcon},
  {id: 'crycheese2', Icon: CryCheeseBurgerIcon},
];
