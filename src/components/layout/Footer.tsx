import {FooterContact} from '@/components/layout/FooterContact';
import {FooterInfo} from '@/components/layout/FooterInfo';
import {FOOTER_HEIGHT} from '@/constants/ui';

export const Footer = () => {
  return (
    <footer
      style={{height: `${FOOTER_HEIGHT}px`}}
      className='flex min-w-360 flex-none items-center justify-center bg-black px-[62px] py-[47px] text-white'>
      <div className='flex w-full items-end justify-between'>
        <FooterInfo />
        <FooterContact />
      </div>
    </footer>
  );
};
