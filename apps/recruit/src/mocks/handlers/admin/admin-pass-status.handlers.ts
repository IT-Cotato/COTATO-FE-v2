import {http} from 'msw';
import {requireStaff, success} from '@/mocks/utils';
import {mockApplications} from '@/mocks/data/store';

const PASS_STATUSES = ['PASS', 'FAIL', 'WAITLISTED'] as const;
const PARTS = ['BE', 'FE', 'PM', 'DE'] as const;

export const adminPassStatusHandlers = [
  http.get('*/api/admin/pass-status', ({request}) => {
    const guardError = requireStaff(request);
    if (guardError) return guardError;

    const generationId = Number(
      new URL(request.url).searchParams.get('generationId')
    );
    const applicants = [...mockApplications.values()].filter(
      (app) => app.isSubmitted && app.generationNumber === generationId
    );

    const summary = PASS_STATUSES.map((passStatus) => {
      const matched = applicants.filter((app) => app.passStatus === passStatus);
      const counts = PARTS.reduce(
        (acc, part) => ({
          ...acc,
          [part]: matched.filter(
            (app) => app.basicInfo?.applicationPartType === part
          ).length,
        }),
        {} as Record<(typeof PARTS)[number], number>
      );

      return {
        passStatus,
        counts: {...counts, ALL: matched.length},
      };
    });

    return success(summary);
  }),
];
