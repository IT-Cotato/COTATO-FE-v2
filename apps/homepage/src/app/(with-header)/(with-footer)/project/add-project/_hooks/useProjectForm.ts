import {useState, useMemo} from 'react';
import {ImageInfo, TeamState} from '@/schemas/project/project-type';
import {ProjectDetail} from '@/schemas/project/project.schema';

export const useProjectForm = (
  teamMembers: TeamState,
  initialData?: ProjectDetail
) => {
  // initialData가 있으면 해당 값을, 없으면 빈 값을 초기값으로 설정
  const [projectName, setProjectName] = useState(
    initialData?.projectName || ''
  );
  const [shortDescription, setShortDescription] = useState(
    initialData?.shortDescription || ''
  );
  const [projectLink, setProjectLink] = useState(
    initialData?.projectLink || ''
  );
  const [startDate, setStartDate] = useState<Date | null>(
    initialData?.startDate ? new Date(initialData.startDate) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    initialData?.endDate ? new Date(initialData.endDate) : null
  );
  const [projectIntroduction, setProjectIntroduction] = useState(
    initialData?.projectIntroduction || ''
  );
  const [uploadedImages, setUploadedImages] = useState<ImageInfo[]>(
    initialData?.imageInfos.map((img) => ({
      ...img,
      id: Math.random().toString(36).slice(2, 11), // dnd-kit용 id
    })) || []
  );

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
