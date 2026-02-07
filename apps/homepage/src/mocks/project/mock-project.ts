import {ProjectListItem, ProjectType} from '@/schemas/project/project-type';
import {ProjectDetail} from '@/schemas/project/project.schema';

export const PROJECTS_MOCK_DATA: ProjectListItem[] = [
  {
    projectId: 1,
    name: 'Troublog',
    shortDescription: '개발자의 트러블슈팅이 성장으로 이어지는 곳',
    projectType: 'DEMODAY',
    generationId: 12,
    thumbnailUrl: '/images/project-mock-img.png',
    projectLink: 'https://github.com/troublog',
  },
  ...Array.from({length: 70}, (_, i) => ({
    projectId: i + 2,
    name: `프로젝트 ${i + 2}`,
    shortDescription: '프로젝트에 대한 짧은 설명입니다.',
    projectType: (i % 2 === 0 ? 'HACKATHON' : 'DEMODAY') as ProjectType,
    generationId: 11,
    thumbnailUrl: '/images/project-mock-img.png',
    projectLink: 'https://github.com',
  })),
];

export const PROJECT_DETAIL_MOCK: Record<number, ProjectDetail> = {
  1: {
    projectId: 1,
    projectName: 'Troublog',
    generationId: 12,
    projectType: 'DEMODAY',
    shortDescription: '개발자의 트러블슈팅이 성장으로 이어지는 곳',
    projectLink: 'https://github.com/troublog',
    startDate: '2025-11-01',
    endDate: '2026-02-07',
    projectIntroduction:
      'Troublog는 개발 중 발생하는 에러를 기록하고 공유하는 플랫폼입니다.',
    members: [
      {name: '김철수', position: 'PM'},
      {name: '이영희', position: 'DE'},
      {name: '박지성', position: 'FE'},
      {name: '손흥민', position: 'BE'},
    ],
    imageInfos: [
      {s3Key: 'img1', publicUrl: '/images/project-detail-1.png', order: 1},
      {s3Key: 'img2', publicUrl: '/images/project-detail-2.png', order: 2},
      {s3Key: 'img3', publicUrl: '/images/project-detail-3.png', order: 3},
    ],
  },
  2: {
    projectId: 2,
    projectName: '모각코(MOGAKKO)',
    generationId: 11,
    projectType: 'HACKATHON',
    shortDescription: '함께 코딩하며 동기부여를 얻는 커뮤니티',
    projectLink: 'https://github.com/mogakko',
    startDate: '2025-07-01',
    endDate: '2025-07-03',
    projectIntroduction:
      '모각코는 해커톤 기간 동안 진행된 프로젝트로, 물리적으로 떨어져 있는 개발자들이 온라인상에서 함께 모여 코딩하는 경험을 제공합니다. 실시간 화상 공유와 집중 시간 타이머 기능을 통해 높은 몰입도를 지향합니다.',
    members: [
      {name: '이강인', position: 'PM'},
      {name: '김민재', position: 'DE'},
      {name: '황희찬', position: 'FE'},
      {name: '조규성', position: 'FE'},

      {name: '백승호', position: 'BE'},
    ],
    imageInfos: [
      {s3Key: 'img4', publicUrl: '/images/project-mock-img.png', order: 1},
      {s3Key: 'img5', publicUrl: '/images/project-mock-img.png', order: 2},
    ],
  },
};

export const MOCK_GENERATIONS = [
  {generationId: 12, startDate: '2025-02-07', endDate: '2025-02-07'},
  {generationId: 11, startDate: '2024-02-07', endDate: '2024-02-07'},
];
