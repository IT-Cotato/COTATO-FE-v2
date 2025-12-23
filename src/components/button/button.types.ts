import {ButtonHTMLAttributes} from 'react';

export type ButtonVariant = 'primary' | 'outline';

export type ButtonLabelTypo = 'h4' | 'h5' | 'body_l' | 'body_m' | 'body_s';

export type ColorKey =
  | 'primary'
  | 'secondary'
  | 'neutral-50'
  | 'neutral-100'
  | 'neutral-200'
  | 'neutral-300'
  | 'neutral-400'
  | 'neutral-500'
  | 'neutral-600'
  | 'neutral-700'
  | 'neutral-800'
  | 'text-default'
  | 'text-muted'
  | 'text-disabled'
  | 'hover'
  | 'active'
  | 'disabled'
  | 'alert';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  width?: number | string;
  height?: number | string;
  label: string;
  subLabel?: string;
  labelTypo?: ButtonLabelTypo;
}
