export type TabType = 'attendance' | 'penalty';

export interface StatusCardItem {
  label: string;
  value: number | string;
  color: 'orange' | 'brown' | 'gray' | 'red';
  unit?: string;
}
