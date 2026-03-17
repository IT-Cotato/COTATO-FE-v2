import {FooterContact} from './FooterContact';
import {FooterInfo} from './FooterInfo';

interface FooterProps {
  isRecruit: boolean;
}

export const Footer = ({isRecruit}: FooterProps) => {
  return (
    <footer className='flex items-center justify-between bg-black px-[38px] py-[33px] lg:px-15.5 lg:py-12.75'>
      <div className='flex w-full flex-col items-start justify-between gap-[50px] lg:flex-row lg:items-end lg:gap-0'>
        <FooterInfo />
        <FooterContact isRecruit={isRecruit} />
      </div>
    </footer>
  );
};
