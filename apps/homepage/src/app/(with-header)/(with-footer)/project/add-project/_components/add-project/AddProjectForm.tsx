import {PeriodField} from '@/app/(with-header)/(with-footer)/project/add-project/_components/PeriodField';
import {FormInput} from '@repo/ui/components/form/FormInput';
import {FormLink} from '@repo/ui/components/form/FormLink';
import {useState} from 'react';
import Plus from '@/assets/plus/plus.svg';
import {MemberChip} from '@/app/(with-header)/(with-footer)/project/add-project/_components/add-project/MemberChip';

type Role = 'PM' | 'DE' | 'FE' | 'BE';

interface TeamState {
  [key: string]: string[];
}

export const AddProjectForm = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [teamMembers, setTeamMembers] = useState<TeamState>({
    PM: ['감직이'],
    DE: ['감직이'],
    FE: ['감직이'],
    BE: ['감직이'],
  });

  const addMember = (role: Role) => {
    setTeamMembers((prev) => ({
      ...prev,
      [role]: [...prev[role], '감직이'],
    }));
  };

  const removeMember = (role: Role, index: number) => {
    setTeamMembers((prev) => ({
      ...prev,
      [role]: prev[role].filter((_, i) => i !== index),
    }));
  };

  const updateMemberName = (role: Role, index: number, newName: string) => {
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
      <div className='flex w-full items-start gap-27.5'>
        <span className='text-h4 text-neutral-600'>팀 구성</span>
        <div className='flex flex-col gap-6'>
          {(['PM', 'DE', 'FE', 'BE'] as Role[]).map((role) => (
            <div key={role} className='flex items-center gap-12.5'>
              <span className='text-h4 w-8.25 text-neutral-400'>{role}</span>
              <div className='flex flex-wrap items-center gap-2.5'>
                {teamMembers[role].map((name, index) => (
                  <MemberChip
                    key={`${role}-${index}`}
                    name={name}
                    onDelete={() => removeMember(role, index)}
                    onUpdate={(newName) =>
                      updateMemberName(role, index, newName)
                    }
                  />
                ))}
                <button
                  onClick={() => addMember(role)}
                  className='flex h-8 w-8 items-center justify-center rounded-[15px] bg-neutral-100 text-neutral-600'>
                  <Plus className='h-4 w-4' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
