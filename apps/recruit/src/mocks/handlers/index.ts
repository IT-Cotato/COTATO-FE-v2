import {authHandlers} from '@/mocks/handlers/auth.handlers';
import {recruitmentHandlers} from '@/mocks/handlers/recruitment.handlers';
import {faqHandlers} from '@/mocks/handlers/faq.handlers';
import {applyHandlers} from '@/mocks/handlers/apply.handlers';
import {filesHandlers} from '@/mocks/handlers/files.handlers';
import {myPageHandlers} from '@/mocks/handlers/my-page.handlers';

export const handlers = [
  ...authHandlers,
  ...recruitmentHandlers,
  ...faqHandlers,
  ...applyHandlers,
  ...filesHandlers,
  ...myPageHandlers,
];
