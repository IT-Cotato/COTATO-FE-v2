import type {RegisterOptions} from 'react-hook-form';

// BasicInfo
export interface BasicInfoFormData {
  name: string;
  gender: string;
  contact: string;
  birthDate: string;
  school: string;
  isCollegeStudent: string;
  department: string;
  completedSemesters: string;
  isPrevActivity: string;
  part: string;
}

export interface BasicInfoFieldConfig {
  name: keyof BasicInfoFormData;
  label: string;
  type: 'input' | 'dropdown' | 'radio';
  placeholder?: string;
  options?: {value: string; label: string}[];
  rules?: RegisterOptions<BasicInfoFormData, keyof BasicInfoFormData>;
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
  rules?: RegisterOptions;
  maxLength?: number;
  readOnly?: boolean;
  defaultValue?: string;
  className?: string;
}

export type AdditionalFormItem =
  | EtcFieldConfig
  | {type: 'row'; row: EtcFieldConfig[]; name?: never};
