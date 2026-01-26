'use client';

import {Controller, useFormContext} from 'react-hook-form';
import {FormInput, FormInputProps} from './FormInput';

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

  return (
    <Controller
      name={name}
      control={control}
      render={({field: controllerField, fieldState: {error}}) => {
        const handleBlur = () => {
          const formatted = formatter(controllerField.value);
          controllerField.onChange(formatted);
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const digits = e.target.value.replace(/\D/g, '');
          controllerField.onChange(digits);
        };

        return (
          <FormInput
            {...props}
            id={name}
            error={error?.message ?? ''}
            value={controllerField.value || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={maxLength}
            type='tel'
            inputMode='numeric'
          />
        );
      }}
    />
  );
};
