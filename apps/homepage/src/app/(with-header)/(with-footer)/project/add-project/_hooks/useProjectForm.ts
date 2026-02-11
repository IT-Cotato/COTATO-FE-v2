import {useState, useMemo, useEffect} from 'react';
import {ImageInfo, TeamState} from '@/schemas/project/project-type';
import {ProjectDetail} from '@/schemas/project/project.schema';

export const useProjectForm = (
  teamMembers: TeamState,
  initialData?: ProjectDetail
) => {
  const [name, setName] = useState(initialData?.name || '');
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
  const [introduction, setIntroduction] = useState(
    initialData?.introduction || ''
  );

  const mapImageInfos = (
    imageInfos?: ProjectDetail['imageInfos']
  ): ImageInfo[] =>
    imageInfos?.map((img) => ({
      id:
        img?.imageId?.toString() ??
        `temp-${Math.random().toString(36).substring(2, 11)}`,
      s3Key: '',
      publicUrl: img?.imageUrl ?? '',
      order: img?.imageOrder ?? 0,
    })) || [];

  const [uploadedImages, setUploadedImages] = useState<ImageInfo[]>(
    mapImageInfos(initialData?.imageInfos)
  );

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setShortDescription(initialData.shortDescription || '');
      setProjectLink(initialData.projectLink || '');
      setStartDate(
        initialData.startDate ? new Date(initialData.startDate) : null
      );
      setEndDate(initialData.endDate ? new Date(initialData.endDate) : null);
      setIntroduction(initialData.introduction || '');
      setUploadedImages(mapImageInfos(initialData.imageInfos));
    }
  }, [initialData]);

  const isFormValid = useMemo(() => {
    const hasBaseInfo = [
      name,
      shortDescription,
      projectLink,
      introduction,
    ].every((val) => val.trim() !== '');

    const hasRequiredAssets = !!(
      startDate &&
      endDate &&
      uploadedImages.length > 0
    );

    const teamValues = Object.values(teamMembers);
    const hasValidMembers =
      teamValues.every((members) => members.length > 0) &&
      teamValues
        .flat()
        .every(
          (memberName) => memberName.trim() !== '' && memberName !== '감직이'
        );

    return !!(hasBaseInfo && hasRequiredAssets && hasValidMembers);
  }, [
    name,
    shortDescription,
    projectLink,
    introduction,
    startDate,
    endDate,
    uploadedImages,
    teamMembers,
  ]);

  return {
    states: {
      name,
      shortDescription,
      projectLink,
      startDate,
      endDate,
      introduction,
      uploadedImages,
    },
    setters: {
      setName,
      setShortDescription,
      setProjectLink,
      setStartDate,
      setEndDate,
      setIntroduction,
      setUploadedImages,
    },
    isFormValid,
  };
};
