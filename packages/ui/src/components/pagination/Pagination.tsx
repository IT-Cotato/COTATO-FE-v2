'use client';

import {useState, useEffect} from 'react';
import clsx from 'clsx';
import ChevronLeft from '../../assets/chevrons/chevron-left.svg';
import {usePagination} from '../../hooks/usePagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: 'default' | 'admin';
  disabled?: boolean;
  className?: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  variant = 'default',
  disabled,
  className,
}: PaginationProps) => {
  const [maxVisiblePages, setMaxVisiblePages] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      // lg(1024px) 미만일 때는 3개, 이상일 때는 5개
      if (window.innerWidth < 1024) {
        setMaxVisiblePages(3);
      } else {
        setMaxVisiblePages(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const {visiblePages, isPrevDisabled, isNextDisabled} = usePagination(
    currentPage,
    totalPages,
    maxVisiblePages
  );

  if (totalPages <= 0) return null;

  const isAdmin = variant === 'admin';

  const styles = {
    container: isAdmin ? 'mt-6 gap-4' : 'gap-1',
    button: isAdmin ? 'h-9 w-9 text-body-m' : 'h-8 min-w-8 lg:h-10 lg:min-w-10',
    navButton: isAdmin
      ? 'text-body-m font-semibold gap-3'
      : 'text-sm p-1 lg:p-2',
    active:
      'rounded-lg border-2 border-neutral-50 bg-neutral-100 font-bold text-neutral-600',
    inactive: 'border-2 border-transparent bg-transparent text-neutral-500',
  };

  return (
    <nav
      aria-label={isAdmin ? '지원서 페이지네이션' : '페이지네이션'}
      className={clsx(
        'flex items-center justify-center',
        styles.container,
        className
      )}>
      <button
        type='button'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isPrevDisabled || disabled}
        className={clsx(
          'flex items-center transition-colors',
          styles.navButton,
          isPrevDisabled
            ? 'cursor-default text-neutral-300'
            : 'text-neutral-500'
        )}>
        <ChevronLeft className='h-6 w-6' />
        <span className='hidden px-2 lg:block'>이전</span>
      </button>

      <div className='flex items-center gap-1'>
        {visiblePages.length > 0 && visiblePages[0]! > 1 && (
          <span className='flex h-8 min-w-8 items-center justify-center text-neutral-500 lg:h-10 lg:min-w-10'>
            ...
          </span>
        )}
        {visiblePages.map((page) => (
          <button
            key={page}
            type='button'
            onClick={() => onPageChange(page)}
            disabled={disabled}
            className={clsx(
              'flex items-center justify-center rounded-lg p-1 transition-all lg:p-2',
              styles.button,
              page === currentPage ? styles.active : styles.inactive
            )}>
            {page}
          </button>
        ))}
        {totalPages > maxVisiblePages &&
          visiblePages.length > 0 &&
          visiblePages.at(-1)! < totalPages && (
            <>
              <span className='flex h-8 min-w-8 items-center justify-center text-neutral-400 lg:h-10 lg:min-w-10'>
                ...
              </span>
              <button
                type='button'
                onClick={() => onPageChange(totalPages)}
                disabled={disabled}
                className={clsx(
                  'flex items-center justify-center rounded-lg p-1 transition-all lg:p-2',
                  styles.button,
                  currentPage === totalPages ? styles.active : styles.inactive
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
          'flex items-center transition-colors',
          styles.navButton,
          isNextDisabled
            ? 'cursor-default text-neutral-300'
            : 'text-neutral-500'
        )}>
        <span className='hidden px-2 lg:block'>다음</span>
        <ChevronLeft className='h-6 w-6 rotate-180' />
      </button>
    </nav>
  );
};
