'use client';

import ChevronRight from '@/assets/chevrons/chevron-right.svg';
import {Spinner} from '@/components/ui/Spinner';
import {ROUTES} from '@/constants/routes';
import {useSubmittedApplications} from '@/hooks/queries/useMyPage.query';
import {PART_MAP} from '@/schemas/my-page/my-page.schema';
import {useRouter} from 'next/navigation';

export const MyPageSubmittedApplicationsContainer = () => {
  const {data: applications, isLoading, isError} = useSubmittedApplications();
  const router = useRouter();

  const handleApplicationClick = (id: number) => {
    router.push(`${ROUTES.MYPAGE}/${id}`);
  };

  if (isLoading)
    return (
      <div className='flex min-h-screen w-full items-center justify-center'>
        <Spinner />
      </div>
    );

  if (isError)
    return (
      <div className='text-alert py-20 text-center'>
        데이터를 불러오지 못했습니다.
      </div>
    );

  return (
    <div className='flex flex-col items-center justify-center bg-white py-23'>
      <div className='flex flex-col gap-5'>
        <h1 className='text-h4 flex w-full items-start font-bold text-neutral-800'>
          마이페이지
        </h1>
        <div className='flex min-h-79.25 max-w-480 min-w-275 flex-col items-center justify-center gap-8 rounded-[10px] bg-neutral-50 px-20'>
          <h2 className='text-h4 flex w-full items-start text-neutral-800'>
            지원 현황
          </h2>
          <div className='w-275 overflow-hidden'>
            <table className='w-full border-separate border-spacing-0 text-center'>
              <thead className='text-h5 rounded-[10px] bg-white text-neutral-500'>
                <tr>
                  <th className='rounded-l-[10px] bg-white px-6 py-4 font-semibold'>
                    기수
                  </th>
                  <th className='bg-white px-6 py-4 font-semibold'>
                    지원 파트
                  </th>
                  <th className='bg-white px-6 py-4 text-center font-semibold'>
                    지원 상태
                  </th>
                  <th className='rounded-r-[10px] bg-white px-6 py-4 text-center font-semibold'>
                    지원서
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications?.map((item) => (
                  <tr key={item.applicationId}>
                    <td className='text-body-l px-6 py-5 text-neutral-800'>
                      {item.generationNumber}
                    </td>
                    <td className='text-body-l px-6 py-5 text-neutral-800'>
                      {PART_MAP[item.part as keyof typeof PART_MAP] ||
                        item.part}
                    </td>
                    <td className='px-6 py-5 text-center'>
                      <span className='bg-primary text-body-l-sb rounded-[10px] px-4 py-2 text-white'>
                        {item.status}
                      </span>
                    </td>
                    <td className='text-body-l flex justify-center px-6 py-5 text-center'>
                      <button
                        className='flex flex-row items-center gap-1 text-center text-neutral-800'
                        onClick={() =>
                          handleApplicationClick(item.applicationId)
                        }>
                        <span>지원서 확인하기</span>
                        <ChevronRight className='h-5 w-5 text-neutral-800' />
                      </button>
                    </td>
                  </tr>
                ))}
                {applications?.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className='text-body-l py-10 text-center text-neutral-800'>
                      아직 지원하신 내용이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
