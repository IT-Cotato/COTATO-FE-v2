import clsx from 'clsx';
import ChevronLeft from '@/assets/chevrons/chevron-left.svg';

const MAX_VISIBLE_PAGES = 5;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  disabled?: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  disabled,
}: PaginationProps) => {
  if (totalPages <= 0) return null;

  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  const getVisiblePages = () => {
    const half = Math.floor(MAX_VISIBLE_PAGES / 2);

    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 1) {
      start = 1;
      end = Math.min(MAX_VISIBLE_PAGES, totalPages);
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, totalPages - MAX_VISIBLE_PAGES + 1);
    }

    return Array.from({length: end - start + 1}, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <nav
      aria-label='페이지네이션'
      className={clsx('flex justify-center', className)}>
      <div className='flex items-center'>
        <button
          type='button'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isPrevDisabled || disabled}
          className={clsx(
            'flex h-10 items-center justify-center p-2 transition-colors',
            isPrevDisabled
              ? 'cursor-not-allowed text-neutral-300'
              : 'text-neutral-500'
          )}>
          <ChevronLeft className='h-6 w-6' />
          <span className='px-2'>Previous</span>
        </button>
        <div className='flex items-center gap-1'>
          {visiblePages[0] > 1 && (
            <span className='flex h-10 min-w-10 items-center justify-center text-neutral-500'>
              ...
            </span>
          )}
          {visiblePages.map((page) => {
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                type='button'
                onClick={() => onPageChange(page)}
                disabled={disabled}
                className={clsx(
                  'flex h-10 min-w-10 items-center justify-center rounded-lg p-2 transition-all',
                  isActive
                    ? 'border-2 border-neutral-50 bg-neutral-100 font-bold text-neutral-600'
                    : 'border-2 border-transparent bg-transparent text-neutral-500'
                )}>
                {page}
              </button>
            );
          })}
          {totalPages > MAX_VISIBLE_PAGES &&
            visiblePages.at(-1)! < totalPages && (
              <>
                <span className='flex h-10 min-w-10 items-center justify-center text-neutral-400'>
                  ...
                </span>
                <button
                  type='button'
                  onClick={() => onPageChange(totalPages)}
                  disabled={disabled}
                  className={clsx(
                    'flex h-10 min-w-10 items-center justify-center rounded-lg p-2 transition-all',
                    currentPage === totalPages
                      ? 'border-2 border-neutral-50 bg-neutral-100 font-bold text-neutral-600'
                      : 'border-2 border-transparent bg-transparent text-neutral-500'
                  )}>
                  {totalPages}
                </button>
              </>
            )}
        </div>
        <button
          type='button'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isNextDisabled || disabled}
          className={clsx(
            'flex h-10 items-center justify-center p-2 transition-colors',
            isNextDisabled
              ? 'cursor-not-allowed text-neutral-300'
              : 'text-neutral-500'
          )}>
          <span className='px-2'>Next</span>
          <ChevronLeft className='h-6 w-6 rotate-180' />
        </button>
      </div>
    </nav>
  );
};
