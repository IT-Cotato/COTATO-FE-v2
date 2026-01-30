'use client';

import {Controller, useFormContext} from 'react-hook-form';
import {FormInput, FormInputProps} from './FormInput';
import {useRef} from 'react';

interface FormattedInputProps extends Omit<FormInputProps, 'onChange'> {
  name: string;
  maxLength: number;
  formatter: (value: string) => string;
}

export const FormattedInput = ({
  name,
  formatter,
  maxLength,
  ...props
}: FormattedInputProps) => {
  const {control} = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({field: controllerField, fieldState: {error}}) => {
        // 초기값이 undefined인 경우 빈 문자열로 초기화
        const currentValue = controllerField.value ?? '';

        // 숫자만 추출
        const digitsOnly = currentValue.replace(/\D/g, '');

        const displayValue = formatter(digitsOnly);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const input = e.target;
          const cursorPosition = input.selectionStart ?? 0;
          const inputValue = input.value;

          // 숫자만 추출
          const digits = inputValue.replace(/\D/g, '');

          if (digits.length > maxLength) {
            return;
          }

          controllerField.onChange(digits);

          setTimeout(() => {
            if (inputRef.current) {
              const digitsBeforeCursor = inputValue
                .slice(0, cursorPosition)
                .replace(/\D/g, '').length;

              const newFormatted = formatter(digits);

              let newCursorPos = 0;
              let digitCount = 0;

              for (let i = 0; i < newFormatted.length; i++) {
                if (/\d/.test(newFormatted[i])) {
                  digitCount++;
                  if (digitCount === digitsBeforeCursor) {
                    newCursorPos = i + 1;
                    // 숫자 바로 다음이 하이픈이면 하이픈 뒤로 커서 이동
                    if (newFormatted[i + 1] === '-') {
                      newCursorPos = i + 2;
                    }
                    break;
                  }
                }
              }

              // 커서가 끝에 있는 경우
              if (digitCount < digitsBeforeCursor || newCursorPos === 0) {
                newCursorPos = newFormatted.length;
              }

              inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
            }
          }, 0);
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
          const target = e.target as HTMLInputElement;
          const cursorPosition = target.selectionStart ?? 0;
          const value = target.value;

          if (e.key === 'Backspace' && cursorPosition > 0) {
            // 커서 바로 앞이 하이픈인 경우
            if (value[cursorPosition - 1] === '-') {
              e.preventDefault();
              const digits = value.replace(/\D/g, '');
              // 하이픈 앞의 숫자 하나를 제거
              const newDigits = digits.slice(0, -1);
              controllerField.onChange(newDigits);

              // 커서 위치 조정
              setTimeout(() => {
                if (inputRef.current) {
                  const newFormatted = formatter(newDigits);
                  const newPosition = Math.min(
                    cursorPosition - 2,
                    newFormatted.length
                  );
                  inputRef.current.setSelectionRange(newPosition, newPosition);
                }
              }, 0);
            }
          }
        };

        return (
          <FormInput
            {...props}
            ref={inputRef}
            id={name}
            error={error?.message ?? ''}
            value={displayValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            type='tel'
            inputMode='numeric'
          />
        );
      }}
    />
  );
};
