import {FooterContact} from './FooterContact';
import {FooterInfo} from './FooterInfo';
import {FOOTER_HEIGHT} from '../../../constants/ui';

interface FooterProps {
  isRecruit: boolean;
}

export const Footer = ({isRecruit}: FooterProps) => {
  return (
    <footer
      style={{height: `${FOOTER_HEIGHT}px`}}
      className='flex min-w-360 items-center justify-between bg-black px-15.5 py-12.75'>
      <div className='flex w-full items-end justify-between'>
        <FooterInfo />
        <FooterContact isRecruit={isRecruit} />
      </div>
    </footer>
  );
};
