import clsx from 'clsx';
import {
  buttonVariantStyles,
  buttonLabelTextStyles,
  buttonSubLabelTextStyle,
  buttonHoverStyles,
} from './button.styles';
import {ButtonProps, ColorKey} from './button.types';
import {BUTTON_DEFAULT_HEIGHT, BUTTON_DEFAULT_WIDTH} from './button.constants';
import {toColorVar} from '@/utils/color';

interface ButtonComponentProps extends ButtonProps {
  enableHover?: boolean;
  defaultWidth?: number | string;
  subLabelSpacing?: number;
  backgroundColor?: ColorKey;
  textColor?: ColorKey;
  wrapperClassName?: string;
}

/**
 * 공통 Button 컴포넌트
 *
 * - 기본 버튼 UI 컴포넌트
 * - variant, typo, width, height, backgroundColor, textColor 등 스타일 제어 가능
 * - hover/disabled 상태를 props로 제어
 *
 * 권장 사용 방식
 * - 일반 버튼: `Button`
 * - 화면 너비를 채우는 버튼: `FullButton`
 *
 * @param variant 버튼 스타일 타입 (default: 'primary')
 *  - `primary`: 기본 강조 버튼
 *  - `outline`: 테두리 버튼 (subLabel 사용 가능)
 *
 * @param label 버튼에 표시될 텍스트 (필수)
 *
 * @param labelTypo 버튼 라벨 타이포그래피 (default: 'h5')
 *  - `h4`,`h5`, `body_l`, `body_m`, `body_s` 지정 가능
 *
 * @param width 버튼 너비
 *  - 미지정 시 `defaultWidth` 적용
 *
 * @param height 버튼 높이
 *  - 미지정 시 기본 높이(`BUTTON_DEFAULT_HEIGHT`) 적용
 *
 * @param subLabel
 *  - outline 버튼일 때만 렌더링되는 버튼 하단 보조 텍스트
 *
 * @param disabled 버튼 비활성화 여부
 *
 * @param defaultWidth width가 없을 경우 적용할 기본 너비
 *
 * @param enableHover hover 스타일 활성화 여부 (default: false)
 *
 * @param subLabelSpacing 버튼과 subLabel 사이 간격
 *
 * @param backgroundColor 버튼 배경색 (CSS 변수 키, optional)
 *  - 예: 'primary', 'secondary', 'alert', 'neutral-50' 등
 *
 * @param textColor 버튼 라벨 텍스트 색상 (CSS 변수 키, optional)
 *  - 예: 'primary', 'secondary', 'alert', 'neutral-50' 등
 *
 * @param wrapperClassName 버튼을 감싸는 div에 적용할 클래스
 *
 **/

export function Button({
  variant = 'primary',
  labelTypo = 'h5',
  width,
  height,
  label,
  subLabel,
  className,
  disabled,
  enableHover = false,
  defaultWidth = BUTTON_DEFAULT_WIDTH,
  subLabelSpacing = 22,
  backgroundColor,
  textColor,
  wrapperClassName,
  ...props
}: ButtonComponentProps) {
  const isOutline = variant === 'outline';

  return (
    <div className={clsx('flex flex-col items-center', wrapperClassName)}>
      <button
        disabled={disabled}
        className={clsx(
          'flex flex-col items-center justify-center transition-colors',
          'rounded-[10px]',
          buttonVariantStyles[variant],
          enableHover &&
            !disabled &&
            !(variant === 'outline') &&
            buttonHoverStyles,
          className
        )}
        style={{
          width: width ?? defaultWidth,
          height:
            typeof height === 'number'
              ? `${height}px`
              : (height ?? `${BUTTON_DEFAULT_HEIGHT}px`),
          backgroundColor: toColorVar(backgroundColor),
        }}
        {...props}>
        <span
          className={buttonLabelTextStyles[variant][labelTypo]}
          style={{
            color: toColorVar(textColor),
          }}>
          {label}
        </span>
      </button>

      {isOutline && subLabel && (
        <span
          className={clsx('text-center', buttonSubLabelTextStyle)}
          style={{marginTop: subLabelSpacing}}>
          {subLabel}
        </span>
      )}
    </div>
  );
}
