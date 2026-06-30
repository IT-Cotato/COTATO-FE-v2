import {authHandlers} from '@/mocks/handlers/auth.handlers';
import {recruitmentHandlers} from '@/mocks/handlers/recruitment.handlers';
import {faqHandlers} from '@/mocks/handlers/faq.handlers';
import {applyHandlers} from '@/mocks/handlers/apply.handlers';
import {filesHandlers} from '@/mocks/handlers/files.handlers';
import {myPageHandlers} from '@/mocks/handlers/my-page.handlers';
import {adminGenerationHandlers} from '@/mocks/handlers/admin/admin-generation.handlers';
import {adminRecruitmentInformationHandlers} from '@/mocks/handlers/admin/admin-recruitment-information.handlers';
import {adminRecruitmentActivationHandlers} from '@/mocks/handlers/admin/admin-recruitment-activation.handlers';
import {adminApplicationQuestionsHandlers} from '@/mocks/handlers/admin/admin-application-questions.handlers';
import {adminApplicationsHandlers} from '@/mocks/handlers/admin/admin-applications.handlers';
import {adminApplicationHandlers} from '@/mocks/handlers/admin/admin-application.handlers';
import {adminMailHandlers} from '@/mocks/handlers/admin/admin-mail.handlers';
import {adminPassStatusHandlers} from '@/mocks/handlers/admin/admin-pass-status.handlers';

export const handlers = [
  ...authHandlers,
  ...recruitmentHandlers,
  ...faqHandlers,
  ...applyHandlers,
  ...filesHandlers,
  ...myPageHandlers,
  ...adminGenerationHandlers,
  ...adminRecruitmentInformationHandlers,
  ...adminRecruitmentActivationHandlers,
  ...adminApplicationQuestionsHandlers,
  ...adminApplicationsHandlers,
  ...adminApplicationHandlers,
  ...adminMailHandlers,
  ...adminPassStatusHandlers,
];
