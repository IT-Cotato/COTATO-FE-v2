import {mockFaq} from '@/mocks/mock-faq';
import {FaqAccordion} from '@/app/faq/_components/FaqAccordion';

export const FaqAccordionList = () => {
  return (
    <div className='flex flex-col gap-6.25'>
      {mockFaq.map((item) => (
        <FaqAccordion
          key={item.question}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  );
};
