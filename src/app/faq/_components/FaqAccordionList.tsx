import {mockFaq} from '@/mocks/mock-faq';
import FaqAccordion from './FaqAccordion';

const FaqAccordionList = () => {
  return (
    <div className='flex flex-col gap-6.25'>
      {mockFaq.map((item, index) => (
        <FaqAccordion
          key={index}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  );
};

export default FaqAccordionList;
