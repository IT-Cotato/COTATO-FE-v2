import {BasicInfoFormData} from '@/schemas/apply/apply-schema';

// BasicInfo
export interface BasicInfoFieldConfig {
  name: keyof BasicInfoFormData;
  label: string;
  type: 'input' | 'dropdown' | 'radio';
  placeholder?: string;
  options?: {value: string; label: string}[];
}

export type BasicInfoFormItem =
  | BasicInfoFieldConfig
  | {row: readonly BasicInfoFieldConfig[]; name?: never; type?: never};

// EtcInfo
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
}

export type EtcFormItem =
  | EtcFieldConfig
  | {type: 'row'; row: EtcFieldConfig[]; name?: never};
