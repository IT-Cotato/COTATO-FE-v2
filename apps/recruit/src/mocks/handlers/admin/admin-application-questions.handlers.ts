import {http} from 'msw';
import {requireStaff, success} from '@/mocks/utils';
import {
  getApplicationQuestions,
  setApplicationQuestions,
} from '@/mocks/data/store';
import {PostApplicationQuestionsRequest} from '@/schemas/admin/admin-application-questions.schema';

export const adminApplicationQuestionsHandlers = [
  http.get('*/api/admin/application-questions', ({request}) => {
    const guardError = requireStaff(request);
    if (guardError) return guardError;

    const url = new URL(request.url);
    const generationId = Number(url.searchParams.get('generationId'));
    const questionType = url.searchParams.get('questionType') ?? '';

    return success(getApplicationQuestions(generationId, questionType));
  }),

  http.post('*/api/admin/application-questions', async ({request}) => {
    const guardError = requireStaff(request);
    if (guardError) return guardError;

    const body = (await request.json()) as PostApplicationQuestionsRequest;
    setApplicationQuestions(
      body.generationId,
      body.questionType,
      body.questions
    );
    return success(null);
  }),
];
