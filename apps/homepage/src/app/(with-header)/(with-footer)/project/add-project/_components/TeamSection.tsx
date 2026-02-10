import {Position} from '@/schemas/project/project.schema';
import {MemberChip} from './MemberChip';
import Plus from '@/assets/plus/plus.svg';
import {TeamSectionProps} from '@/schemas/project/project-type';
import {POSITION_LABEL} from '@/constants/project/project-detail';

const ROLES: Position[] = ['PM', 'DESIGN', 'FE', 'BE'];

export const TeamSection = ({
  teamMembers,
  onAdd,
  onDelete,
  onUpdate,
}: TeamSectionProps) => {
  return (
    <div className='flex w-full items-start gap-27.5'>
      <span className='text-h4 text-neutral-600'>팀 구성</span>
      <div className='flex flex-col gap-6'>
        {ROLES.map((role) => (
          <div key={role} className='flex items-center gap-12.5'>
            <span className='text-h4 w-8.25 text-neutral-400'>
              {POSITION_LABEL[role]}
            </span>
            <div className='no-scrollbar flex w-215 items-center gap-2.5 overflow-x-auto whitespace-nowrap'>
              {teamMembers[role].map((name, index) => (
                <MemberChip
                  key={`${role}-${index}`}
                  name={name}
                  onDelete={() => onDelete(role, index)}
                  onUpdate={(newName) => onUpdate(role, index, newName)}
                />
              ))}
              {teamMembers[role].length < 5 && (
                <button
                  type='button'
                  onClick={() => onAdd(role)}
                  className='flex h-8 w-8 items-center justify-center rounded-[15px] bg-neutral-100 text-neutral-600'>
                  <Plus className='h-4 w-4' />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
