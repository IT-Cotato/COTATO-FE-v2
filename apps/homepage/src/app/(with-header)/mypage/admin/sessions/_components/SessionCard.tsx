'use client';

import {useEffect, useState, useMemo} from 'react';
import {AdminSession, SessionData} from '@/schemas/admin/session.schema';
import {ActionMenu} from '@/app/(with-header)/mypage/admin/_components/ActionMenu';
import {ActionButtons} from '@/app/(with-header)/mypage/admin/_components/ActionButtons';
import {SessionExpandedContent} from './SessionExpandedContent';
import {Modal} from '@repo/ui/components/modal/Modal';
import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {getJosa} from '@/utils/getJosa';
import { formatDateToDot } from '@repo/ui/utils/date';
import { useSessionDetailQuery } from '@/hooks/queries/useSession.query';

const SESSION_MENU_ITEMS = [
  {key: 'edit', label: '수정하기'},
  {key: 'delete', label: '삭제하기'},
] as const;

type SessionMenuAction = (typeof SESSION_MENU_ITEMS)[number]['key'];

interface SessionCardProps {
  session: AdminSession;
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const { data: sessionDetail } = useSessionDetailQuery(session.sessionId, isExpanded || isEditing);

  const fallbackSessionData: SessionData = useMemo(() => ({
    sessionId: session.sessionId,
    title: session.title,
    description: session.description,
    content: session.content,
    placeName: session.placeName,
    date: session.sessionDateTime ? session.sessionDateTime.split('T')[0] : '',
    generation: session.generationId ? `코테이토 ${session.generationId}기` : '',
    attendanceStartTime: session.sessionDateTime ? session.sessionDateTime.split('T')[1]?.slice(0, 5) : '', 
    images: session.imageInfos || [],
    detailAddress: '',
    location: {latitude: 0, longitude: 0},
    attendTime: {
      attendanceEndTime: '',
      lateEndTime: '',
    },
    isOffline: true,
    isOnline: false,
  }), [session]);

  const activeSessionData = sessionDetail ?? fallbackSessionData;
  const [form, setForm] = useState<SessionData>(activeSessionData);

  useEffect(() => {
    if (sessionDetail) {
      setForm(sessionDetail);
    }
  }, [sessionDetail]);

  useEffect(() => {
    if (session.sessionId === -1) {
      setIsEditing(true);
    } else if (!isExpanded) {
      setIsEditing(false);
      setForm(activeSessionData); 
    }
  }, [isExpanded, session.sessionId, activeSessionData]);

  const handleToggleClick = () => {
    // 임시 카드(-1)일 때는 사용자가 마음대로 접을 수 없도록 막음 (수정 또는 취소 버튼으로만 동작)
    if (session.sessionId === -1) return;
    onToggle();
  };

  const handleMenuAction = (action: SessionMenuAction) => {
    if (action === 'edit') {
      setForm(activeSessionData);
      setIsEditing(true);
      if (!isExpanded) onToggle();
    } else if (action === 'delete') {
      setIsDeleteModalOpen(true);
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
      onClick={handleToggleClick}>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <p className='text-h5 text-neutral-400'>{formatDateToDot(form.date)}</p>
          <p className='text-h3 text-neutral-800'>{session.title}</p>
        </div>
        <div
          className='flex items-center gap-2.5'
          onClick={(e) => e.stopPropagation()}>
          {isEditing ? (
            <ActionButtons
              onCancel={() => {
                if (session.sessionId === -1) {
                  onDelete(session.sessionId);
                } else {
                  setIsEditing(false);
                }
              }}
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
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={`${session.title}${getJosa(session.title, '을/를')} 삭제하시겠습니까?`}
        noContent={true}
        contentWrapperClassName='gap-18'
        actions={
          <FullButton
            variant='primary'
            label='확인'
            onClick={() => {
              onDelete(session.sessionId);
              setIsDeleteModalOpen(false);
            }}
          />
        }
      />

      {isExpanded && (
        <div onClick={(e) => e.stopPropagation()}>
          {isEditing ? (
            <SessionExpandedContent
              key='edit'
              mode='edit'
              form={form}
              onChange={setForm}
            />
          ) : (
            <SessionExpandedContent
              key='view'
              mode='view'
              session={activeSessionData}
            />
          )}
        </div>
      )}
    </div>
  );
};

