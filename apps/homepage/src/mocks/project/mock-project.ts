export const PROJECTS_MOCK_DATA = [
  {
    projectId: 1,
    name: 'Troublog',
    shortDescription: '개발자의 트러블슈팅이 성장으로 이어지는 곳',
    projectType: 'DEMODAY',
    generationId: 11,
    thumbnailUrl: '/images/project-mock-img.png',
    projectLink: 'https://github.com',
  },
  ...Array(88)
    .fill(null)
    .map((_, i) => ({
      projectId: i + 2,
      name: 'Troublog',
      shortDescription: '개발자의 트러블슈팅이 성장으로 이어지는 곳',
      projectType: i % 2 === 0 ? 'DEMODAY' : 'HACKATHON',
      generationId: 11,
      thumbnailUrl: '/images/project-mock-img.png',
      projectLink: 'https://github.com',
    })),
];
