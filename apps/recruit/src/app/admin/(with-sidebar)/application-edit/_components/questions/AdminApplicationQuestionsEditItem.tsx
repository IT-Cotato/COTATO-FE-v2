import {Button} from '@repo/ui/components/buttons/Button';

interface AdminApplicationQuestionsEditItemProps {
  sequence: number;
  content: string;
  maxLength: number;
  onUpdate: (field: 'content' | 'maxLength', value: string | number) => void;
  onDelete: () => void;
}

export const AdminApplicationQuestionsEditItem = ({
  sequence,
  content,
  maxLength,
  onUpdate,
  onDelete,
}: AdminApplicationQuestionsEditItemProps) => {
  return (
    <div className='flex flex-col gap-3.5'>
      <div className='flex flex-row gap-7.5'>
        <p className='text-h4 lg:text-h1 text-neutral-500 lg:font-bold'>
          {sequence}
        </p>
        <textarea
          value={content}
          placeholder='새로운 질문을 입력해 주세요.'
          onChange={(e) => onUpdate('content', e.target.value)}
          className='text-body-l-b lg:text-h5 min-h-35.5 w-full rounded-[10px] border border-neutral-300 bg-white p-2.5 placeholder:font-medium lg:min-h-82 lg:px-5.25 lg:py-4.5'
        />
      </div>

      <div className='flex flex-row items-center justify-between'>
        <div className='flex items-center gap-3'>
          <span className='text-body-l lg:text-h5 pl-10 text-neutral-500 lg:pl-13'>
            글자 제한
          </span>
          <input
            type='number'
            value={maxLength}
            onChange={(e) => onUpdate('maxLength', Number(e.target.value))}
            className='text-body-l flex w-14 items-center justify-center rounded-[10px] border border-neutral-300 bg-white py-1 text-center font-semibold text-neutral-600 lg:w-17.5 lg:py-2.75'
          />
          <span className='text-body-l lg:text-h5 text-neutral-500'>자</span>
        </div>
        <Button
          aria-label={`질문 ${sequence} 삭제`}
          onClick={onDelete}
          label='삭제'
          labelTypo='body_l'
          borderRadius={5}
          backgroundColor='alert'
          textColor='neutral-50'
          width='100%'
          wrapperClassName='w-[56px] lg:w-[80px] h-[30px] lg:h-[36px]'
        />
      </div>
    </div>
  );
};
