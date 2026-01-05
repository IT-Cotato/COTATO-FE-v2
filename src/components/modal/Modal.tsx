'use client';

import {ReactNode} from 'react';
import Close from '@/assets/modal/close.svg';
import clsx from 'clsx';
import {FocusTrap} from 'focus-trap-react';

interface ModalProps {
  isOpen: boolean; /** 모달의 열림/닫힘 상태를 제어합니다. */
  onClose: () => void; /** 모달을 닫는 함수입니다. 배경 클릭 또는 닫기 버튼 클릭 시 호출됩니다. */
  title: string; /** 모달의 제목입니다. (필수) */
  titleStyle?: string; /** 제목의 스타일이 다를 때 적용할 수 있도록 합니다. 값이 없는 경우 기본 스타일이 적용됩니다. (예: LoginModal에 사용됩니다.) */
  content?: ReactNode; /** 모달의 주 내용(body)입니다. 제목 아래에 표시됩니다. */
  actions?: ReactNode; /** 모달 하단에 표시될 버튼 그룹입니다. */
  actionsAlign?:
    | 'center'
    | 'stretch'; /** 버튼 정렬 방식: 'center'(기본값) 또는 'stretch' */
  warning?: ReactNode; /** 버튼(actions) 아래에 표시될 경고 또는 추가 안내 텍스트입니다. */
  contentWrapperClassName?: string; /** 컨텐츠 영역(제목, 내용, 버튼)을 감싸는 div에 적용할 추가 클래스입니다. (예: gap 조절) */
  noContent?: boolean; /** 컨텐츠 영역이 없는 모달의 경우에 해당합니다. true일 경우 title과 actions 사이 gap이 107px가 됩니다.*/
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  titleStyle,
  content,
  actions,
  actionsAlign = 'center',
  warning,
  contentWrapperClassName,
  noContent = false,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-modal flex items-center justify-center bg-black/50 backdrop-blur-sm'
      onClick={onClose}>
      <FocusTrap
        focusTrapOptions={{
          escapeDeactivates: true,
          clickOutsideDeactivates: true,
          // onDeactivate: onClose,
          initialFocus: false,
          returnFocusOnDeactivate: true,
        }}>
        <div
          className='relative w-full max-w-[507px] rounded-[10px] bg-white px-[43px] py-[62px]'
          onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onClose}
            className='absolute top-4 right-5'
            aria-label='닫기'>
            <Close className='h-[21px] w-[21px] cursor-pointer' />
          </button>
          <div
            className={clsx(
              'flex flex-col items-center text-center',
              noContent ? 'gap-[107px]' : 'gap-[30px]',
              contentWrapperClassName
            )}>
            <h4
              className={
                titleStyle
                  ? titleStyle
                  : 'text-[28px] leading-tight font-semibold text-neutral-800'
              }>
              {title}
            </h4>
            {content && (
              <div className='text-body-m font-normal text-neutral-800'>
                {content}
              </div>
            )}
            {actions && (
              <div
                className={clsx('flex w-full gap-2.25', {
                  'justify-center': actionsAlign === 'center',
                })}>
                {actions}
              </div>
            )}
            {warning && (
              <div className='text-body-s font-normal text-neutral-600'>
                {warning}
              </div>
            )}
          </div>
        </div>
      </FocusTrap>
    </div>
  );
};
