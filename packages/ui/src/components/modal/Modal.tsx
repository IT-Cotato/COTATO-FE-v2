'use client';

import React, {ReactNode} from 'react';
import clsx from 'clsx';
import {FocusTrap} from 'focus-trap-react';
import XIcon from '@repo/ui/assets/icons/cancel.svg';

interface ModalProps {
  isOpen: boolean; /** 모달의 열림/닫힘 상태를 제어합니다. */
  onClose?: () => void; /** 모달을 닫는 함수입니다. 배경 클릭 또는 닫기 버튼 클릭 시 호출됩니다. */
  title: ReactNode; /** 모달의 제목입니다. (필수) */
  titleStyle?: string; /** 제목의 스타일이 다를 때 적용할 수 있도록 합니다. 값이 없는 경우 기본 스타일이 적용됩니다. (예: LoginModal에 사용됩니다.) */
  content?: ReactNode; /** 모달의 주 내용(body)입니다. 제목 아래에 표시됩니다. */
  actions?: ReactNode; /** 모달 하단에 표시될 버튼 그룹입니다. */
  actionsAlign?:
    | 'center'
    | 'stretch'; /** 버튼 정렬 방식: 'center'(기본값) 또는 'stretch' */
  warning?: ReactNode; /** 버튼(actions) 아래에 표시될 경고 또는 추가 안내 텍스트입니다. */
  contentWrapperClassName?: string; /** 컨텐츠 영역(제목, 내용, 버튼)을 감싸는 div에 적용할 추가 클래스입니다. (예: gap 조절) */
  noContent?: boolean; /** 컨텐츠 영역이 없는 모달의 경우에 해당합니다. true일 경우 title과 actions 사이 gap이 107px가 됩니다.*/
  containerStyle?: React.CSSProperties; /** 모달 흰색 컨테이너에 적용할 인라인 스타일입니다. */
  fullHeight?: boolean; /** true일 경우 모달 컨테이너에 h-full을 적용합니다. 상위 컨테이너의 높이가 지정된 경우에 사용하세요. (기본값: false) */
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
  containerStyle,
  fullHeight = false,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className='z-modal fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm'
      onClick={onClose}>
      <FocusTrap
        focusTrapOptions={{
          escapeDeactivates: true,
          clickOutsideDeactivates: true,
          initialFocus: false,
          returnFocusOnDeactivate: true,
        }}>
        <div
          className={clsx(
            'relative w-full max-w-126.75 rounded-[20px] bg-white px-10.75 py-15.5',
            fullHeight && 'h-full'
          )}
          style={containerStyle}
          onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onClose}
            className='absolute top-5 right-5'
            aria-label='닫기'>
            <XIcon className='h-3 w-3 cursor-pointer text-[#21272A]' />
          </button>
          <div
            className={clsx(
              'flex h-full flex-col items-center text-center',
              !contentWrapperClassName?.includes('justify-') &&
                'justify-center',
              !contentWrapperClassName?.includes('gap-') &&
                (noContent ? 'gap-26.75' : 'gap-7.5'),
              contentWrapperClassName
            )}>
            <h4
              className={titleStyle ? titleStyle : 'text-h4 text-neutral-800'}>
              {title}
            </h4>
            {content && (
              <div className='text-h5 font-normal text-neutral-600'>
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
              <div className='text-body-m font-normal text-neutral-600'>
                {warning}
              </div>
            )}
          </div>
        </div>
      </FocusTrap>
    </div>
  );
};
