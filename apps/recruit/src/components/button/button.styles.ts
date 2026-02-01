import {ButtonLabelTypo, ButtonVariant} from '@/components/button/button.types';

export const buttonVariantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-primary
    disabled:bg-text-disabled
  `,
  outline: `
    border
    bg-transparent
  `,
};

export const buttonHoverStyles = `
  hover:bg-hover
  hover:shadow-[0_4px_40px_0_rgba(255,255,255,0.8)]
`;

export const buttonLabelTextStyles: Record<
  ButtonVariant,
  Record<ButtonLabelTypo, string>
> = {
  primary: {
    h4: `text-neutral-50 text-h4`,
    h5: `text-neutral-50 text-h5`,
    body_l: `text-neutral-50 text-body-l`,
    body_m: `text-neutral-50 text-body-m`,
    body_s: `text-neutral-50 text-body-s`,
  },
  outline: {
    h4: `text-primary text-h4`,
    h5: `text-primary text-h5`,
    body_l: `text-primary text-body-l`,
    body_m: `text-primary text-body-m`,
    body_s: `text-primary text-body-s`,
  },
};

export const buttonSubLabelTextStyle = `
  text-body-l
  px-[10px]
  py-[19px]
`;
