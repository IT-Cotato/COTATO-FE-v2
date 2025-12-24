import {FooterContact} from './FooterContact';
import {FooterInfo} from './FooterInfo';

export const Footer = () => {
  return (
    <footer className='flex h-[223px] flex-none items-center justify-center bg-black px-[62px] py-[47px] text-white'>
      <div className='flex w-full items-end justify-between'>
        <FooterInfo />
        <FooterContact />
      </div>
    </footer>
  );
};
