import {http} from 'msw';
import {success} from '@/mocks/utils';
import {mockFaqByType} from '@/mocks/data/store';

export const faqHandlers = [
  http.get('*/api/faq', ({request}) => {
    const type = new URL(request.url).searchParams.get('type') ?? 'COMMON';
    return success(mockFaqByType[type] ?? []);
  }),
];
