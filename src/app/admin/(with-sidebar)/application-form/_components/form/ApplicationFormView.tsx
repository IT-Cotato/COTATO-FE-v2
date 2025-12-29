import {mockPlanApplicationForm} from '@/mocks/mock-application-form';

export const ApplicationFormView = () => {
  return (
    <div className='flex flex-col gap-7.5'>
      {mockPlanApplicationForm.map(({id, content, limitTextRange}) => (
        <div key={id} className='flex flex-col gap-3.5'>
          <div className='rounded-[10px] border border-neutral-300 bg-white px-5.25 py-4.5 text-h5 text-neutral-800'>
            {id}. {content}
          </div>
          <div className='text-h5 text-neutral-500'>
            글자 제한: {limitTextRange} byte
          </div>
        </div>
      ))}
    </div>
  );
};
