'use client';

import {Controller, useFormContext} from 'react-hook-form';
import {FormLink} from '@repo/ui/components/form/FormLink';
import {FormFile} from '@repo/ui/components/form/FormFile';
import {ApplyFormData} from '@/schemas/apply/apply-schema';
import {PartType} from '@/schemas/admin/admin-application-questions.schema';

interface PortfolioFieldProps {
  questionId: number;
  sequence: number;
  content: string;
  activePart: PartType;
  isUploadingFile: boolean;
  pdfFileName?: string;
  onFileChange: (files: File[]) => void;
}

export const PortfolioField = ({
  questionId,
  sequence,
  content,
  activePart,
  isUploadingFile,
  pdfFileName,
  onFileChange,
}: PortfolioFieldProps) => {
  const {control, setValue} = useFormContext<ApplyFormData>();
  const isRequired = activePart !== 'PM';

  return (
    <div className='flex flex-col gap-2.5'>
      <label className='text-h5 text-neutral-800'>
        {sequence}. {content}
        {isRequired && <span className='text-alert ml-1'>*</span>}
      </label>
      <Controller
        control={control}
        name={`ans_${questionId}` as any}
        render={({field: {onChange, value}}) => (
          <FormLink
            value={value ? [value] : ['']}
            onChange={(links) => {
              onChange(links[0]);
              setValue('pdfFileUrl', links[0] || undefined);
            }}
          />
        )}
      />
      <FormFile
        placeholder='파일 업로드하기'
        isUploading={isUploadingFile}
        onFilesChange={onFileChange}
        value={pdfFileName ? [pdfFileName] : undefined}
        maxCount={1}
        maxSize={50 * 1024 * 1024}
      />
      <p className='text-body-l text-alert'>
        * 파트 변경 시 업로드한 파일이 초기화됩니다.
      </p>
    </div>
  );
};
