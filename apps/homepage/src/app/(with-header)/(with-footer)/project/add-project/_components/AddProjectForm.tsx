import {useState} from 'react';
import {FormInput} from '@repo/ui/components/form/FormInput';
import {FormLink} from '@repo/ui/components/form/FormLink';
import {PeriodField} from '@/app/(with-header)/(with-footer)/project/add-project/_components/PeriodField';
import {TeamSection} from '@/app/(with-header)/(with-footer)/project/add-project/_components/TeamSection';
import {useTeamMembers} from '@/app/(with-header)/(with-footer)/project/add-project/_hooks/useTeamMember';
import {FormField} from '@/app/(with-header)/(with-footer)/project/add-project/_components/FormField';

export const AddProjectForm = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const {teamMembers, addMember, removeMember, updateMemberName} =
    useTeamMembers({
      PM: ['감직이'],
      DE: ['감직이'],
      FE: ['감직이'],
      BE: ['감직이'],
    });

  return (
    <section className='flex flex-col items-start gap-5 self-stretch'>
      <FormField label='프로젝트 명'>
        <FormInput placeholder='프로젝트 명을 작성해주세요.' />
      </FormField>
      <FormField label='한줄 소개'>
        <FormInput placeholder='한줄 소개를 작성해주세요.' />
      </FormField>
      <FormField label='링크'>
        <FormLink placeholder='링크를 첨부해주세요.' hideInnerLabel={true} />
      </FormField>
      <FormField label='기간'>
        <PeriodField
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </FormField>
      <TeamSection
        teamMembers={teamMembers}
        onAdd={addMember}
        onDelete={removeMember}
        onUpdate={updateMemberName}
      />
    </section>
  );
};
