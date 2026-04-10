'use client';

import {useState} from 'react';
import {useIsMobile} from '@repo/ui/hooks/useIsMobile';
import {AdminSession, SessionData} from '@/schemas/admin/admin-sessions.schema';
import {ActionMenu} from '@/app/(with-header)/mypage/admin/_components/ActionMenu';
import {ActionButtons} from '@/app/(with-header)/mypage/admin/_components/ActionButtons';
import {SessionExpandedContent} from './SessionExpandedContent';
import {ConfirmModal} from '@/app/(with-header)/mypage/admin/_components/ConfirmModal';
import {getJosa} from '@/utils/getJosa';
import {formatDateToDot} from '@repo/ui/utils/date';
import {useSessionForm} from '@/app/(with-header)/mypage/admin/sessions/_hooks/useSessionForm';
import {BottomSheet} from './BottomSheet';

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
  onUpdate: (updated: SessionData) => Promise<boolean>;
}

export const SessionCard = ({
  session,
  isExpanded,
  onToggle,
  onDelete,
  onUpdate,
}: SessionCardProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const {isMobile, mounted} = useIsMobile();
  const {isEditing, setIsEditing, form, setForm, activeSessionData} =
    useSessionForm(session, isExpanded);

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

  const handleConfirm = async () => {
    const success = await onUpdate(form);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (session.sessionId === -1) {
      onDelete(session.sessionId);
    } else {
      setIsEditing(false);
    }
  };

  const makeExpandedContent = (showCarousel: boolean) => (
    <div onClick={(e) => e.stopPropagation()}>
      {isEditing ? (
        <SessionExpandedContent
          key='edit'
          mode='edit'
          form={form}
          onChange={setForm}
          showCarousel={showCarousel}
        />
      ) : (
        <SessionExpandedContent
          key='view'
          mode='view'
          session={activeSessionData}
          showCarousel={showCarousel}
        />
      )}
    </div>
  );

  return (
    <div
      className='flex cursor-pointer flex-col gap-5 rounded-[10px] bg-neutral-50 px-5.5 py-6'
      onClick={handleToggleClick}>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <p className='text-body-l lg:text-h5 text-neutral-400'>
            {formatDateToDot(form.date)}
          </p>
          <p className='text-h5 lg:text-h3 font-bold text-neutral-800'>
            {session.title}
          </p>
        </div>
        <div
          className='flex items-center gap-2.5'
          onClick={(e) => e.stopPropagation()}>
          {isEditing && mounted && !isMobile ? (
            <ActionButtons
              onCancel={handleCancel}
              onConfirm={handleConfirm}
              confirmLabel='등록'
              cancelVariant='dark'
            />
          ) : (
            !isEditing && (
              <ActionMenu
                items={SESSION_MENU_ITEMS}
                onAction={handleMenuAction}
                iconClassName='rotate-90'
                align='right'
              />
            )
          )}
        </div>
      </div>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={`${session.title}${getJosa(session.title, '을/를')} 삭제하시겠습니까?`}
        onConfirm={() => {
          onDelete(session.sessionId);
          setIsDeleteModalOpen(false);
        }}
        confirmLabel='확인'
        cancelLabel={false}
      />

      {mounted && isMobile ? (
        isEditing ? (
          <BottomSheet
            isOpen={isEditing}
            onClose={handleCancel}
            isEditing={isEditing}
            footer={
              <ActionButtons
                onCancel={handleCancel}
                onConfirm={handleConfirm}
                confirmLabel='등록'
                cancelVariant='dark'
              />
            }>
            {makeExpandedContent(true)}
          </BottomSheet>
        ) : (
          isExpanded && makeExpandedContent(false)
        )
      ) : (
        isExpanded && makeExpandedContent(true)
      )}
    </div>
  );
};
