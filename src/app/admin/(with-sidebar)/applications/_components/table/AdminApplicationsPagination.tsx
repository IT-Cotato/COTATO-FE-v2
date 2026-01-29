import ChevronLeft from '@/assets/chevrons/chevron-left.svg';
import ChevronRight from '@/assets/chevrons/chevron-right.svg';
import clsx from 'clsx';

const MAX_VISIBLE_PAGES = 5;

interface AdminApplicationsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export const AdminApplicationsPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled,
}: AdminApplicationsPaginationProps) => {
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  const getVisiblePages = () => {
    const half = Math.floor(MAX_VISIBLE_PAGES / 2);

    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 1) {
      start = 1;
      end = MAX_VISIBLE_PAGES;
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, totalPages - MAX_VISIBLE_PAGES + 1);
    }

    return Array.from({length: end - start + 1}, (_, i) => start + i);
  };

  return (
    <nav aria-label='지원서 페이지네이션'>
      <div className='mt-6 flex items-center justify-center gap-4'>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isPrevDisabled || disabled}
          aria-label='이전 페이지'
          className={`flex items-center gap-3 text-body-m font-semibold ${
            isPrevDisabled
              ? 'cursor-not-allowed text-neutral-300'
              : 'text-neutral-500'
          }`}>
          <ChevronLeft
            className={`h-6 w-6 ${isPrevDisabled ? 'cursor-not-allowed text-neutral-300' : 'text-neutral-600'}`}
          />
          <p>이전</p>
        </button>

        <div className='flex gap-2'>
          {getVisiblePages()[0] > 1 && (
            <span className='flex h-9 items-center px-2 text-body-m text-neutral-500'>
              ...
            </span>
          )}

          {getVisiblePages().map((page) => {
            const isActive = page === currentPage;

            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                aria-current={isActive ? 'page' : undefined}
                disabled={disabled}
                className={clsx(
                  'flex h-9 w-9 items-center justify-center text-body-m',
                  isActive
                    ? 'rounded-lg border-2 border-neutral-50 bg-neutral-100 font-semibold text-neutral-600'
                    : 'text-neutral-500'
                )}>
                {page}
              </button>
            );
          })}

          {totalPages > MAX_VISIBLE_PAGES &&
            getVisiblePages().at(-1)! < totalPages && (
              <>
                <span className='flex h-9 items-center px-2 text-body-m text-neutral-500'>
                  ...
                </span>

                <button
                  onClick={() => onPageChange(totalPages)}
                  disabled={disabled}
                  className={clsx(
                    'flex h-9 w-9 items-center justify-center rounded-lg text-body-m',
                    currentPage === totalPages
                      ? 'bg-neutral-100 font-semibold'
                      : 'text-neutral-600'
                  )}>
                  {totalPages}
                </button>
              </>
            )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isNextDisabled || disabled}
          aria-label='다음 페이지'
          className={`flex flex-row items-center gap-3 text-body-m font-semibold ${
            isNextDisabled
              ? 'cursor-not-allowed text-neutral-300'
              : 'text-neutral-500'
          }`}>
          <p>다음</p>
          <ChevronRight
            className={`h-6 w-6 ${isNextDisabled ? 'text-neutral-300' : 'text-neutral-500'}`}
          />
        </button>
      </div>
    </nav>
  );
};
