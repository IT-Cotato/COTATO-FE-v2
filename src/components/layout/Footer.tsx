import {FooterContact} from '@/components/layout/FooterContact';
import {FooterInfo} from '@/components/layout/FooterInfo';
import {FOOTER_HEIGHT} from '@/constants/ui';

export const Footer = () => {
  return (
    <footer
      style={{height: `${FOOTER_HEIGHT}px`}}
      className='flex min-w-360 items-center justify-between bg-black px-15.5 py-12.75'>
      <div className='flex w-full items-end justify-between'>
        <FooterInfo />
        <FooterContact />
      </div>
    </footer>
  );
};
