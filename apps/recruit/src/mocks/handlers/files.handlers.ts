import {http} from 'msw';
import {ERROR, getRoleFromRequest, success} from '@/mocks/utils';

export const filesHandlers = [
  http.get('*/api/files/posturl', ({request}) => {
    if (!getRoleFromRequest(request)) return ERROR.UNAUTHORIZED();

    const fileName =
      new URL(request.url).searchParams.get('fileName') ?? 'file.pdf';
    return success({
      preSignedUrl: `https://mock-bucket.s3.ap-northeast-2.amazonaws.com/applications/${fileName}?mock=presigned`,
      key: `applications/${Date.now()}-${fileName}`,
    });
  }),

  http.get('*/api/files/geturl', ({request}) => {
    const fileKey =
      new URL(request.url).searchParams.get('fileKey') ?? 'unknown.pdf';
    return success({
      pdfUrl: `https://mock-bucket.s3.ap-northeast-2.amazonaws.com/${fileKey}?mock=presigned`,
    });
  }),

  http.put(/mock-bucket\.s3/, () => new Response(null, {status: 200})),
];
