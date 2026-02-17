'use client';

import {useEffect, useState} from 'react';
import {SessionData} from '@/schemas/admin/session.schema';
import {ActionMenu} from '@/app/(with-header)/mypage/admin/_components/ActionMenu';
import {ActionButtons} from '@/app/(with-header)/mypage/admin/_components/ActionButtons';
import {SessionExpandedContent} from './SessionExpandedContent';

const SESSION_MENU_ITEMS = [
  {key: 'edit', label: '수정하기'},
  {key: 'delete', label: '삭제하기'},
] as const;

type SessionMenuAction = (typeof SESSION_MENU_ITEMS)[number]['key'];

interface SessionCardProps {
  session: SessionData;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: (sessionId: number) => void;
  onUpdate: (updated: SessionData) => void;
}

export const SessionCard = ({
  session,
  isExpanded,
  onToggle,
  onDelete,
  onUpdate,
}: SessionCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<SessionData>(session);

  useEffect(() => {
    if (!isExpanded) setIsEditing(false);
  }, [isExpanded]);

  const handleMenuAction = (action: SessionMenuAction) => {
    if (action === 'edit') {
      setForm(session);
      setIsEditing(true);
      if (!isExpanded) onToggle();
    } else if (action === 'delete') {
      onDelete(session.sessionId);
    }
  };

  const handleConfirm = () => {
    try {
      onUpdate(form);
    } catch (error) {
      alert('세션 업데이트 중 오류가 발생했습니다.');
    }
    setIsEditing(false);
  };

  return (
    <div
      className='flex cursor-pointer flex-col gap-5 rounded-[10px] bg-neutral-50 px-5.5 py-6'
      onClick={onToggle}>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <p className='text-h5 text-neutral-400'>{session.date}</p>
          <p className='text-h3 text-neutral-800'>{session.title}</p>
        </div>
        <div
          className='flex items-center gap-2.5'
          onClick={(e) => e.stopPropagation()}>
          {isEditing ? (
            <ActionButtons
              onCancel={() => setIsEditing(false)}
              onConfirm={handleConfirm}
              confirmLabel='등록'
              cancelVariant='dark'
            />
          ) : (
            <ActionMenu
              items={SESSION_MENU_ITEMS}
              onAction={handleMenuAction}
              iconClassName='rotate-90'
              align='right'
            />
          )}
        </div>
      </div>
      {isExpanded && (
        <div onClick={(e) => e.stopPropagation()}>
          {isEditing ? (
            <SessionExpandedContent
              mode='edit'
              form={form}
              onChange={setForm}
            />
          ) : (
            <SessionExpandedContent mode='view' session={session} />
          )}
        </div>
      )}
    </div>
  );
};
