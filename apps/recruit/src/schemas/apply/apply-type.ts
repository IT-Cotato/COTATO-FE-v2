import {Path} from 'react-hook-form';
import {BasicInfoFields, ApplyFormData} from '@/schemas/apply/apply-schema';

// BasicInfo
export interface BasicInfoFieldConfig {
  name: keyof BasicInfoFields;
  label: string;
  type: 'input' | 'dropdown' | 'radio';
  placeholder?: string;
  mobilePlaceholder?: string;
  options?: {value: string; label: string}[];
  autocomplete?: string;
}

export type BasicInfoFormItem =
  | BasicInfoFieldConfig
  | {
      row: readonly BasicInfoFieldConfig[];
      colOnMobile?: boolean;
      name?: never;
      type?: never;
    };

// EtcQuestion
export interface EtcFieldConfig {
  name?: Path<ApplyFormData>;
  label?: string;
  type: 'input' | 'dropdown' | 'radio' | 'textarea' | 'group_label';
  placeholder?: string;
  options?: {value: string; label: string}[];
  maxLength?: number;
  readOnly?: boolean;
  defaultValue?: string;
  className?: string;
  required?: boolean;
}

export type EtcFormItem =
  | EtcFieldConfig
  | {type: 'row'; row: EtcFieldConfig[]; name?: never};
