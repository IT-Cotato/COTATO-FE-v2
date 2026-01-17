import {ApplicationQuestionsType} from '@/schemas/admin/admin-appication-questions.schema';

interface ApplicationQuestionsViewProps {
  data?: ApplicationQuestionsType[];
}

export const ApplicationQuestionsView = ({
  data,
}: ApplicationQuestionsViewProps) => {
  return (
    <div className='flex flex-col gap-7.5'>
      {data?.map(({sequence, content, maxByte}) => (
        <div key={sequence} className='flex flex-col gap-3.5'>
          <div className='rounded-[10px] border border-neutral-300 bg-white px-5.25 py-4.5 text-h5 text-neutral-800'>
            {sequence}. {content}
          </div>
          <div className='text-h5 text-neutral-500'>
            글자 제한: {maxByte} 자
          </div>
        </div>
      ))}
    </div>
  );
};
