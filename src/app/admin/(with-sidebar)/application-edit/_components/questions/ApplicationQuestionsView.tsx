import {ApplicationQuestionsType} from '@/schemas/admin/admin-application-questions.schema';

interface ApplicationQuestionsViewProps {
  data?: ApplicationQuestionsType[];
}

export const ApplicationQuestionsView = ({
  data,
}: ApplicationQuestionsViewProps) => {
  return (
    <ul role='list' className='flex flex-col gap-7.5'>
      {data?.map(({sequence, content, maxLength}) => (
        <li key={sequence} className='flex flex-col gap-3.5'>
          <div
            role='group'
            aria-labelledby={`question-view-${sequence}`}
            className='rounded-[10px] border border-neutral-300 bg-white px-5.25 py-4.5 text-h5 text-neutral-800'>
            {sequence}. {content}
          </div>
          <div className='ml-6.25 text-h5 text-neutral-400'>
            글자 제한: {maxLength} 자
          </div>
        </li>
      ))}
    </ul>
  );
};
