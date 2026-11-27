'use client';

import {useRouter} from 'next/navigation';
import {useRef} from 'react';
import {ROUTES} from '@/constants/routes';
import {FormInput} from '@repo/ui/components/form/FormInput';
import {FormLink} from '@repo/ui/components/form/FormLink';
import dynamic from 'next/dynamic';

const PeriodField = dynamic(
  () =>
    import('@/app/(with-header)/(with-footer)/project/add-project/_components/PeriodField').then(
      (m) => m.PeriodField
    ),
  {ssr: false}
);
import {TeamSection} from '@/app/(with-header)/(with-footer)/project/add-project/_components/TeamSection';
import {useTeamMembers} from '@/app/(with-header)/(with-footer)/project/add-project/_hooks/useTeamMember';
import {FormField} from '@/app/(with-header)/(with-footer)/project/add-project/_components/FormField';
import {FormTextarea} from '@repo/ui/components/form/FormTextarea';
import {ImageUploadField} from '@/app/(with-header)/(with-footer)/project/add-project/_components/ImageUploadField';
import {Button} from '@repo/ui/components/buttons/Button';
import {useProjectForm} from '../_hooks/useProjectForm';
import {formatDate} from '@repo/ui/utils/date';
import {ProjectDetail, Position} from '@/schemas/project/project.schema';
import {ProjectType, TeamState} from '@/schemas/project/project-type';
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from '@/hooks/mutations/useProject.mutation';

interface AddProjectFormProps {
  generationId: number;
  projectType: ProjectType;
  initialData?: ProjectDetail;
}

export const AddProjectForm = ({
  generationId,
  projectType,
  initialData,
}: AddProjectFormProps) => {
  const router = useRouter();
  const isEdit = !!initialData;
  const isStudy = projectType === 'STUDY';
  const label = isStudy ? '스터디' : '프로젝트';

  const {mutate: updateProject, isPending: isUpdating} =
    useUpdateProjectMutation(initialData?.projectId || 0, label);
  const {mutate: createProject, isPending: isCreating} =
    useCreateProjectMutation(label);
  const submitting = useRef(false);
  const isSaving = isCreating || isUpdating;

  const formatInitialMembers = (
    members: {name: string; position: Position}[] | undefined
  ): TeamState => {
    const result: TeamState = {PM: [], DE: [], FE: [], BE: []};
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
        : isStudy
          ? {PM: [], DE: [], FE: [], BE: []}
          : {PM: ['감직이'], DE: ['감직이'], FE: ['감직이'], BE: ['감직이']}
    );

  const {states, setters, isFormValid} = useProjectForm(
    teamMembers,
    initialData,
    isStudy
  );

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isFormValid || generationId <= 0 || submitting.current || isSaving)
      return;
    // 렌더링 전 연속 클릭·Enter 입력도 같은 요청을 두 번 보내지 않게 한다.
    submitting.current = true;

    const requestBody = {
      generationId,
      projectType,
      projectName: states.name,
      shortDescription: states.shortDescription,
      projectLink: states.projectLink,
      startDate: formatDate(states.startDate) ?? '',
      endDate: formatDate(states.endDate) ?? '',
      projectIntroduction: states.introduction,
      members: Object.entries(teamMembers).flatMap(([role, names]) =>
        names.map((name) => ({name, position: role as Position}))
      ),
      imageInfos: states.uploadedImages.map(
        (img: {s3Key: string}, index: number) => ({
          s3Key: img.s3Key,
          order: index,
        })
      ),
    };

    if (isEdit) {
      updateProject(requestBody, {
        onSettled: () => {
          submitting.current = false;
        },
        onSuccess: () =>
          router.push(
            isStudy
              ? ROUTES.STUDY_DETAIL(initialData?.projectId || 0)
              : ROUTES.PROJECT_DETAIL(initialData?.projectId || 0)
          ),
      });
    } else {
      createProject(requestBody, {
        onSettled: () => {
          submitting.current = false;
        },
        onSuccess: () => router.push(isStudy ? ROUTES.STUDY : ROUTES.PROJECT),
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-end gap-4.5 self-stretch lg:gap-5'
      aria-label={`${label} ${isEdit ? '수정' : '추가'} 폼`}>
      <FormField label={`${label} 명`} id='project-name'>
        <FormInput
          id='project-name'
          value={states.name}
          onChange={(e) => setters.setName(e.target.value)}
          placeholder={`${label} 명을 작성해주세요.`}
        />
      </FormField>
      <FormField label='한줄 소개' id='short-desc'>
        <FormInput
          id='short-desc'
          value={states.shortDescription}
          onChange={(e) => setters.setShortDescription(e.target.value)}
          placeholder='한줄 소개를 작성해주세요.'
        />
      </FormField>
      <FormField label='링크' id='project-link'>
        <FormLink
          id='project-link'
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
      <FormField variant='column' label={`${label} 설명`} id='project-intro'>
        <FormTextarea
          id='project-intro'
          value={states.introduction}
          onChange={(e) => setters.setIntroduction(e.target.value)}
          isProject
          placeholder={`${label} 설명을 입력해주세요.`}
        />
      </FormField>
      <div className='w-full lg:mt-2.5'>
        <FormField variant='column' label='자료 업로드'>
          <ImageUploadField
            onImagesChange={setters.setUploadedImages}
            initialImages={states.uploadedImages}
          />
        </FormField>
      </div>
      <Button
        type='submit'
        label={isSaving ? '저장 중' : isEdit ? '저장하기' : '추가하기'}
        width={127}
        height={40}
        disabled={!isFormValid || generationId <= 0 || isSaving}
        borderRadius={10}
      />
    </form>
  );
};
