'use client';

import {useRouter} from 'next/navigation';
import {ROUTES} from '@/constants/routes';
import {FormInput} from '@repo/ui/components/form/FormInput';
import {FormLink} from '@repo/ui/components/form/FormLink';
import {PeriodField} from '@/app/(with-header)/(with-footer)/project/add-project/_components/PeriodField';
import {TeamSection} from '@/app/(with-header)/(with-footer)/project/add-project/_components/TeamSection';
import {useTeamMembers} from '@/app/(with-header)/(with-footer)/project/add-project/_hooks/useTeamMember';
import {FormField} from '@/app/(with-header)/(with-footer)/project/add-project/_components/FormField';
import {FormTextarea} from '@repo/ui/components/form/FormTextarea';
import {ImageUploadField} from '@/app/(with-header)/(with-footer)/project/add-project/_components/ImageUploadField';
import {Button} from '@repo/ui/components/buttons/Button';
import {useProjectForm} from '../_hooks/useProjectForm';
import {formatDate} from '@repo/ui/utils/date';
import {ProjectDetail, Position} from '@/schemas/project/project.schema';
import {TeamState} from '@/schemas/project/project-type';
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from '@/hooks/mutations/useProject.mutation';

interface AddProjectFormProps {
  generationId: number;
  projectType: 'DEMODAY' | 'HACKATHON';
  initialData?: ProjectDetail;
}

export const AddProjectForm = ({
  generationId,
  projectType,
  initialData,
}: AddProjectFormProps) => {
  const router = useRouter();
  const isEdit = !!initialData;

  const {mutate: updateProject} = useUpdateProjectMutation(
    initialData?.projectId || 0
  );
  const {mutate: createProject} = useCreateProjectMutation();

  const formatInitialMembers = (
    members: {name: string; position: Position}[] | undefined
  ): TeamState => {
    const result: TeamState = {PM: [], DESIGN: [], FE: [], BE: []};
    if (!members) return result;
    members.forEach((m) => {
      if (result[m.position]) result[m.position].push(m.name);
    });
    return result;
  };

  const {teamMembers, addMember, removeMember, updateMemberName} =
    useTeamMembers(
      initialData?.memberInfos
        ? formatInitialMembers(initialData.memberInfos)
        : {PM: ['감직이'], DESIGN: ['감직이'], FE: ['감직이'], BE: ['감직이']}
    );

  const {states, setters, isFormValid} = useProjectForm(
    teamMembers,
    initialData
  );

  const handleSubmit = () => {
    if (!isFormValid) return;

    const requestBody = {
      generationId,
      projectType,
      projectName: states.name,
      shortDescription: states.shortDescription,
      projectLink: states.projectLink,
      startDate: formatDate(states.startDate)!,
      endDate: formatDate(states.endDate)!,
      projectIntroduction: states.introduction,
      members: Object.entries(teamMembers).flatMap(([role, names]) =>
        names.map((name) => ({name, position: role as Position}))
      ),
      imageInfos: states.uploadedImages.map((img, index) => ({
        s3Key: img.s3Key,
        order: index,
      })),
    };

    if (isEdit) {
      updateProject(requestBody, {
        onSuccess: () =>
          router.push(ROUTES.PROJECT_DETAIL(initialData?.projectId || 0)),
      });
    } else {
      createProject(requestBody, {
        onSuccess: () => router.push(ROUTES.PROJECT),
      });
    }
  };

  return (
    <section className='flex flex-col items-end gap-5 self-stretch'>
      <FormField label='프로젝트 명'>
        <FormInput
          value={states.name}
          onChange={(e) => setters.setName(e.target.value)}
          placeholder='프로젝트 명을 작성해주세요.'
        />
      </FormField>
      <FormField label='한줄 소개'>
        <FormInput
          value={states.shortDescription}
          onChange={(e) => setters.setShortDescription(e.target.value)}
          placeholder='한줄 소개를 작성해주세요.'
        />
      </FormField>
      <FormField label='링크'>
        <FormLink
          value={[states.projectLink]}
          onChange={(links) => setters.setProjectLink(links[0] || '')}
          placeholder='링크를 첨부해주세요.'
          hideInnerLabel
        />
      </FormField>
      <FormField label='기간'>
        <PeriodField
          startDate={states.startDate}
          setStartDate={setters.setStartDate}
          endDate={states.endDate}
          setEndDate={setters.setEndDate}
        />
      </FormField>
      <TeamSection
        teamMembers={teamMembers}
        onAdd={addMember}
        onDelete={removeMember}
        onUpdate={updateMemberName}
      />
      <FormField variant='column' label='프로젝트 설명'>
        <FormTextarea
          value={states.introduction}
          onChange={(e) => setters.setIntroduction(e.target.value)}
          isProject
          placeholder='프로젝트 설명을 입력해주세요.'
        />
      </FormField>
      <div className='mt-2.5 w-full'>
        <FormField variant='column' label='자료 업로드'>
          <ImageUploadField
            onImagesChange={setters.setUploadedImages}
            initialImages={states.uploadedImages}
          />
        </FormField>
      </div>
      <Button
        label={isEdit ? '수정하기' : '추가하기'}
        width={127}
        height={40}
        disabled={!isFormValid}
        onClick={handleSubmit}
        borderRadius={10}
      />
    </section>
  );
};
