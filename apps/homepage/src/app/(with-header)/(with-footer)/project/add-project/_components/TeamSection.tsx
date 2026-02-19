import {Position} from '@/schemas/project/project.schema';
import {MemberChip} from './MemberChip';
import Plus from '@repo/ui/assets/icons/plus-nobackground.svg';
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
    <div
      className='flex w-full items-start gap-27.5'
      role='group'
      aria-labelledby='team-section-label'>
      <span id='team-section-label' className='text-h4 text-neutral-600'>
        팀 구성
      </span>
      <div className='flex flex-col gap-6'>
        {ROLES.map((role) => (
          <div
            key={role}
            className='flex items-center gap-12.5'
            role='group'
            aria-labelledby={`role-${role}`}>
            <span
              id={`role-${role}`}
              className='text-h4 w-8.25 text-neutral-400'>
              {POSITION_LABEL[role]}
            </span>
            <div
              className='no-scrollbar flex w-215 items-center gap-2.5 overflow-x-auto whitespace-nowrap'
              role='list'
              aria-label={`${POSITION_LABEL[role]} 명단`}>
              {teamMembers[role].map((name, index) => (
                <div key={`${role}-${index}`} role='listitem'>
                  <MemberChip
                    name={name}
                    onDelete={() => onDelete(role, index)}
                    onUpdate={(newName) => onUpdate(role, index, newName)}
                  />
                </div>
              ))}
              {teamMembers[role].length < 5 && (
                <button
                  type='button'
                  onClick={() => onAdd(role)}
                  className='flex h-8 w-8 items-center justify-center rounded-[15px] bg-neutral-100 text-neutral-600'
                  aria-label={`${POSITION_LABEL[role]} 멤버 추가`}>
                  <Plus className='h-4 w-4' aria-hidden='true' />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
