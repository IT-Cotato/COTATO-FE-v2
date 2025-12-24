import ChevronLeft from '@/assets/chevrons/chevron-left.svg';
import ChevronRight from '@/assets/chevrons/chevron-right.svg';
import clsx from 'clsx';

interface AdminApplicationPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const AdminApplicationPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: AdminApplicationPaginationProps) => {
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <div className='mt-6 flex items-center justify-center gap-4'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isPrevDisabled}
        className={`flex items-center gap-2 text-body-m font-medium ${
          isPrevDisabled
            ? 'cursor-not-allowed text-neutral-300'
            : 'text-neutral-500'
        }`}>
        <ChevronLeft />
        Previous
      </button>

      <div className='flex gap-2'>
        {Array.from({length: totalPages}).map((_, idx) => {
          const page = idx + 1;
          const isActive = page === currentPage;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={clsx(
                'flex h-9 w-9 items-center justify-center rounded-lg text-body-m',
                isActive ? 'bg-neutral-100 font-semibold' : 'text-neutral-600'
              )}>
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isNextDisabled}
        className={`flex items-center gap-3 text-body-m font-medium ${
          isNextDisabled
            ? 'cursor-not-allowed text-neutral-300'
            : 'text-neutral-500'
        }`}>
        Next
        <ChevronRight />
      </button>
    </div>
  );
};
