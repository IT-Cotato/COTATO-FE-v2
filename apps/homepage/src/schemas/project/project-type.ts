import {ProjectRegistration, Position} from '@/schemas/project/project.schema';

/**
 * 팀 생성 및 관리용 타입
 */
export type {Position};
export type TeamState = Record<Position, string[]>;

/**
 * 프로젝트 활동 타입
 */
export type ProjectType = 'HACKATHON' | 'DEMODAY';

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

/**
 * 프로젝트 목록 조회용
 */
export interface ProjectListItem {
  projectId: number;
  name: string;
  shortDescription: string;
  projectType: ProjectType;
  generationId: number;
  thumbnailUrl: string;
  projectLink: string;
}

/**
 * 목록 필터링 파라미터 타입
 */
export interface ProjectListParams {
  generationId?: number;
  projectType?: ProjectType;
}
