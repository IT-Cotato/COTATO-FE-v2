import {BasicInfoFields} from '@/schemas/apply/apply-schema';

// BasicInfo
export interface BasicInfoFieldConfig {
  name: keyof BasicInfoFields;
  label: string;
  type: 'input' | 'dropdown' | 'radio';
  placeholder?: string;
  options?: {value: string; label: string}[];
  autocomplete?: string;
}

export type BasicInfoFormItem =
  | BasicInfoFieldConfig
  | {row: readonly BasicInfoFieldConfig[]; name?: never; type?: never};

// EtcQuestion
export interface EtcFieldConfig {
  name?: string;
  label?: string;
  type: string;
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
