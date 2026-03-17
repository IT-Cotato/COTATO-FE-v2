'use client';

import ChevronRight from '@/assets/chevrons/chevron-right.svg';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {ROUTES} from '@/constants/routes';
import {useSubmittedApplications} from '@/hooks/queries/useMyPage.query';
import {PART_MAP} from '@/schemas/my-page/my-page.schema';
import {useApplicationStore} from '@/store/useApplicationStore';
import {useRouter} from 'next/navigation';

export const MyPageSubmittedApplicationsContainer = () => {
  const router = useRouter();
  const {data: applications, isLoading, isError} = useSubmittedApplications();
  const setSelectedId = useApplicationStore((state) => state.setSelectedId);

  const handleApplicationClick = (id: number) => {
    setSelectedId(id);
    router.push(`${ROUTES.MYPAGE}/detail`);
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
    <div className='flex w-full flex-col items-center justify-center bg-white px-4 py-7.5 lg:px-6 lg:py-23'>
      <div className='flex w-full max-w-275 flex-col gap-5'>
        <h1 className='text-h3 lg:text-h4 font-bold text-neutral-800'>
          마이페이지
        </h1>
        <div className='flex flex-col gap-5 rounded-[10px] bg-neutral-50 p-3.5 pb-17 lg:gap-8 lg:px-20 lg:py-7.5'>
          <h2 className='text-h4 font-bold text-neutral-800'>지원 현황</h2>

          <div className='w-full overflow-x-auto'>
            <table className='w-full min-w-[320px] table-auto border-separate border-spacing-0 text-center'>
              <thead className='text-body-l lg:text-h5 font-bold text-neutral-500 lg:font-semibold'>
                <tr>
                  <th className='rounded-l-[10px] bg-white px-2 py-2.5 lg:px-6 lg:py-4'>
                    기수
                  </th>
                  <th className='bg-white py-2.5 lg:px-6 lg:py-4'>
                    <span className='hidden lg:inline'>지원 </span>파트
                  </th>
                  <th className='bg-white px-2 py-2.5 lg:px-6 lg:py-4'>
                    지원 상태
                  </th>
                  <th className='rounded-r-[10px] bg-white px-2 py-2.5 lg:px-6 lg:py-4'>
                    지원서
                  </th>
                </tr>
              </thead>
              <tbody className='text-neutral-800'>
                {applications?.map((item) => (
                  <tr key={item.applicationId}>
                    <td className='text-body-m lg:text-body-l py-3 font-bold lg:py-5 lg:font-normal'>
                      {item.generationNumber}기
                    </td>
                    <td className='text-body-m lg:text-body-l py-3 lg:px-6 lg:py-5'>
                      {PART_MAP[item.part as keyof typeof PART_MAP] ||
                        item.part}
                    </td>
                    <td className='py-3 lg:px-6 lg:py-5'>
                      <span className='bg-primary lg:text-body-l-sb text-body-m inline-block rounded-[10px] px-2 py-1 font-bold text-white lg:px-4'>
                        {item.status}
                      </span>
                    </td>
                    <td className='py-3 lg:px-6 lg:py-5'>
                      <button
                        className='flex w-full items-center justify-center gap-0.5 text-center text-neutral-800 hover:opacity-70'
                        onClick={() =>
                          handleApplicationClick(item.applicationId)
                        }>
                        <p className='text-body-l flex gap-1'>
                          <span className='hidden lg:inline'>지원서</span>
                          <span>확인하기</span>
                        </p>
                        <ChevronRight className='h-4 w-4 lg:h-5 lg:w-5' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {applications?.length === 0 && (
              <div className='py-10 text-center text-neutral-600'>
                아직 지원하신 내용이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
