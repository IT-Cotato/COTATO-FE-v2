import {ApplicationQuestionsType} from '@/schemas/admin/admin-application-questions.schema';

interface AdminApplicationQuestionsViewListProps {
  data?: ApplicationQuestionsType[];
}

export const AdminApplicationQuestionsViewList = ({
  data,
}: AdminApplicationQuestionsViewListProps) => {
  return (
    <ul role='list' className='flex flex-col gap-3.5 lg:gap-7.5'>
      {data?.map(({sequence, content, maxLength}) => (
        <li key={sequence} className='flex flex-col gap-2.5 lg:gap-3.5'>
          <div
            role='group'
            aria-labelledby={`question-view-${sequence}`}
            className='text-body-l-b lg:text-h5 rounded-[10px] border border-neutral-300 bg-white p-2.5 text-neutral-800 lg:px-5.25 lg:py-4.5'>
            <p id={`question-view-${sequence}`}>
              {sequence}. {content}
            </p>
          </div>
          <div className='text-body-l lg:text-h5 ml-6.25 text-neutral-400'>
            글자 제한: {maxLength} 자
          </div>
        </li>
      ))}
    </ul>
  );
};
