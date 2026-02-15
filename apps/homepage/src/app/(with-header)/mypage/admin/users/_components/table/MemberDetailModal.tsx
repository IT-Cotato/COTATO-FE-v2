'use client';

import {useState, useEffect} from 'react';
import Close from '@/assets/modal/close.svg';
import {
  MEMBER_POSITION_LABEL,
  MEMBER_POSITION_OPTIONS,
  MEMBER_ROLE_LABEL,
  MEMBER_ROLE_OPTIONS,
  MEMBER_STATUS_LABEL,
  MEMBER_STATUS_OPTIONS,
  MemberPositionKey,
  MemberRoleKey,
  MemberStatusKey,
} from '@/constants/admin/admin';
import {MemberType} from '@/schemas/admin/admin.schema';
import {
  TextField,
  fieldClass,
} from '@/app/(with-header)/mypage/admin/users/_components/table/TextField';
import {SelectField} from '@/app/(with-header)/mypage/admin/users/_components/table/SelectField';

interface MemberDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (memberData: MemberType) => void;
  member: MemberType | null;
  readonly?: boolean;
}

const POSITION_REVERSE = Object.fromEntries(
  Object.entries(MEMBER_POSITION_LABEL).map(([k, v]) => [v, k])
) as Record<string, MemberPositionKey>;

const ROLE_REVERSE = Object.fromEntries(
  MEMBER_ROLE_OPTIONS.map((k) => [MEMBER_ROLE_LABEL[k], k])
) as Record<string, MemberRoleKey>;

const STATUS_REVERSE = Object.fromEntries(
  MEMBER_STATUS_OPTIONS.map((k) => [MEMBER_STATUS_LABEL[k], k])
) as Record<string, MemberStatusKey>;

export const MemberDetailModal = ({
  isOpen,
  onClose,
  onSave,
  member,
  readonly = false,
}: MemberDetailModalProps) => {
  const [memberData, setMemberData] = useState<MemberType | null>(member);

  useEffect(() => {
    setMemberData(member);
  }, [isOpen, member]);

  if (!isOpen || !memberData) return null;

  const handleSave = () => {
    onSave(memberData);
    onClose();
  };

  const positionOptions = MEMBER_POSITION_OPTIONS.map(
    (k) => MEMBER_POSITION_LABEL[k]
  );
  const roleOptions = MEMBER_ROLE_OPTIONS.map((k) => MEMBER_ROLE_LABEL[k]);
  const statusOptions = MEMBER_STATUS_OPTIONS.map(
    (k) => MEMBER_STATUS_LABEL[k]
  );

  return (
    <div
      className='z-modal fixed inset-0 flex items-center justify-center bg-black/50'
      onClick={onClose}>
      <div
        className='relative flex w-113.5 flex-col gap-6.5 rounded-[10px] bg-white px-6.5 py-7.5'
        onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className='absolute top-6.5 right-6.5'
          aria-label='닫기'>
          <Close className='h-6 w-6 cursor-pointer' />
        </button>

        <h2 className='text-h4 text-neutral-800'>
          {readonly ? '회원 상세 정보' : '활동 회원 정보 수정'}
        </h2>

        <div className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <TextField
              label='이름'
              value={memberData.name}
              readonly={readonly}
              className='flex-1'
              onChange={(e) =>
                setMemberData({...memberData, name: e.target.value})
              }
            />
            <div className='flex w-32 flex-col gap-2.5'>
              <label className='text-h5 text-neutral-600'>기수</label>
              {readonly ? (
                <input
                  readOnly
                  value={`${memberData.generationMemberId}기`}
                  className={fieldClass}
                />
              ) : (
                <div className='relative'>
                  <input
                    type='number'
                    min={1}
                    value={memberData.generationMemberId}
                    className={`${fieldClass} [appearance:textfield] pr-8 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                    onChange={(e) =>
                      setMemberData({
                        ...memberData,
                        generationMemberId: Number(e.target.value),
                      })
                    }
                  />
                  <span className='text-body-l pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-neutral-600'>
                    기
                  </span>
                </div>
              )}
            </div>
          </div>

          <TextField
            label='학교'
            value={memberData.university}
            readonly={readonly}
            onChange={(e) =>
              setMemberData({...memberData, university: e.target.value})
            }
          />

          <SelectField
            label='파트'
            displayValue={
              MEMBER_POSITION_LABEL[memberData.position as MemberPositionKey] ??
              memberData.position
            }
            options={positionOptions}
            onSelect={(val) =>
              setMemberData({
                ...memberData,
                position: POSITION_REVERSE[val],
              })
            }
            readonly={readonly}
          />

          <TextField
            label='전화번호'
            value={memberData.phoneNumber}
            readonly={readonly}
            onChange={(e) =>
              setMemberData({...memberData, phoneNumber: e.target.value})
            }
          />

          <SelectField
            label='역할'
            displayValue={
              MEMBER_ROLE_LABEL[memberData.role as MemberRoleKey] ??
              memberData.role
            }
            options={roleOptions}
            onSelect={(val) =>
              setMemberData({...memberData, role: ROLE_REVERSE[val]})
            }
            readonly={readonly}
          />

          <SelectField
            label='활동여부'
            displayValue={
              MEMBER_STATUS_LABEL[memberData.status as MemberStatusKey] ??
              memberData.status
            }
            options={statusOptions}
            onSelect={(val) =>
              setMemberData({...memberData, status: STATUS_REVERSE[val]})
            }
            readonly={readonly}
          />
        </div>

        {!readonly && (
          <div className='flex justify-end'>
            <button
              type='button'
              onClick={handleSave}
              className='bg-primary text-h5 rounded-[10px] px-8 py-3 text-white'>
              저장하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
