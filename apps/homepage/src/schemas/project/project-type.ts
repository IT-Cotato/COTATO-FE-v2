import {Position, ProjectRegistration} from '@/schemas/project/project-schema';

export type TeamState = Record<Position, string[]>;

export interface ProjectFieldConfig {
  name: keyof ProjectRegistration;
  label: string;
  type: 'input' | 'textarea' | 'date' | 'team-builder' | 'link';
  placeholder?: string;
  required?: boolean;
}

export interface TeamSectionProps {
  teamMembers: TeamState;
  onAdd: (role: Position) => void;
  onDelete: (role: Position, index: number) => void;
  onUpdate: (role: Position, index: number, newName: string) => void;
}

export interface ProjectRegisterResponse {
  projectId: number;
}

export interface ImageInfo {
  id: string; // dnd-kit 추적용 고유 id
  s3Key: string;
  publicUrl: string;
  order: number; // 순서
}
