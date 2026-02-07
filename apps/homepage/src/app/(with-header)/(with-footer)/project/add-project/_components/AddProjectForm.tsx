import {useState} from 'react';
import {FormInput} from '@repo/ui/components/form/FormInput';
import {FormLink} from '@repo/ui/components/form/FormLink';
import {Position} from '@/schemas/project/project-schema';
import {PeriodField} from '@/app/(with-header)/(with-footer)/project/add-project/_components/PeriodField';
import {TeamSection} from '@/app/(with-header)/(with-footer)/project/add-project/_components/TeamSection';
import {TeamState} from '@/schemas/project/project-type';

export const AddProjectForm = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [teamMembers, setTeamMembers] = useState<TeamState>({
    PM: ['감직이'],
    DE: ['감직이'],
    FE: ['감직이'],
    BE: ['감직이'],
  });

  const addMember = (role: Position) => {
    if (teamMembers[role].length >= 4) return; // 4명 제한
    setTeamMembers((prev) => ({
      ...prev,
      [role]: [...prev[role], '감직이'],
    }));
  };

  const removeMember = (role: Position, index: number) => {
    setTeamMembers((prev) => ({
      ...prev,
      [role]: prev[role].filter((_, i) => i !== index),
    }));
  };

  const updateMemberName = (role: Position, index: number, newName: string) => {
    setTeamMembers((prev) => {
      const updatedRole = [...prev[role]];
      updatedRole[index] = newName;
      return {...prev, [role]: updatedRole};
    });
  };

  return (
    <section className='flex flex-col items-start gap-5 self-stretch'>
      <div className='flex h-12.5 w-full items-center gap-2.5'>
        <span className='text-h4 w-24 text-neutral-600'>프로젝트 명</span>
        <div className='w-128.5'>
          <FormInput placeholder='프로젝트 명을 작성해주세요.' />
        </div>
      </div>
      <div className='flex h-12.5 w-full items-center gap-2.5'>
        <span className='text-h4 w-24 text-neutral-600'>한줄 소개</span>
        <div className='w-128.5'>
          <FormInput placeholder='한줄 소개를 작성해주세요.' />
        </div>
      </div>
      <div className='flex h-12.5 w-full items-center gap-2.5'>
        <span className='text-h4 w-24 text-neutral-600'>링크</span>
        <div className='w-128.5'>
          <FormLink placeholder='링크를 첨부해주세요.' hideInnerLabel={true} />
        </div>
      </div>
      <div className='flex h-12.5 w-full items-center gap-2.5'>
        <span className='text-h4 w-24 text-neutral-600'>기간</span>
        <PeriodField
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </div>
      <TeamSection
        teamMembers={teamMembers}
        onAdd={addMember}
        onDelete={removeMember}
        onUpdate={updateMemberName}
      />
    </section>
  );
};
