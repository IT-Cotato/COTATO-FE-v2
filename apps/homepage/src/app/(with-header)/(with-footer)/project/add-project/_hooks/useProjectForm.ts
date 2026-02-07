import {useState, useMemo} from 'react';
import {ImageInfo, TeamState} from '@/schemas/project/project-type';

export const useProjectForm = (teamMembers: TeamState) => {
  const [projectName, setProjectName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [projectIntroduction, setProjectIntroduction] = useState('');
  const [uploadedImages, setUploadedImages] = useState<ImageInfo[]>([]);

  // 모든 필드 및 팀 구성 유효성 확인
  const isFormValid = useMemo(() => {
    const hasBaseInfo =
      [projectName, shortDescription, projectLink, projectIntroduction].every(
        (val) => val.trim() !== ''
      ) &&
      startDate &&
      endDate &&
      uploadedImages.length > 0;

    const teamValues = Object.values(teamMembers);
    const hasValidMembers =
      teamValues.every((members: string[]) => members.length > 0) &&
      teamValues
        .flat()
        .every((name: string) => name.trim() !== '' && name !== '감직이');

    return !!(hasBaseInfo && hasValidMembers);
  }, [
    projectName,
    shortDescription,
    projectLink,
    startDate,
    endDate,
    projectIntroduction,
    uploadedImages,
    teamMembers,
  ]);

  return {
    states: {
      projectName,
      shortDescription,
      projectLink,
      startDate,
      endDate,
      projectIntroduction,
      uploadedImages,
    },
    setters: {
      setProjectName,
      setShortDescription,
      setProjectLink,
      setStartDate,
      setEndDate,
      setProjectIntroduction,
      setUploadedImages,
    },
    isFormValid,
  };
};
