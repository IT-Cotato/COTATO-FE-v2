'use client';

import {useRef, useState, useEffect} from 'react';
import SearchIcon from '@repo/ui/assets/icons/search.svg';
import XIcon from '@repo/ui/assets/icons/cancel.svg';
import {useKakaoPlaceSearch, Place} from '@/hooks/useKakaoPlaceSearch';
import clsx from 'clsx';

interface LocationSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (result: Place) => void;
}

export const LocationSearchModal = ({
  isOpen,
  onClose,
  onSelect,
}: LocationSearchModalProps) => {
  const {search, results, status, error} = useKakaoPlaceSearch();
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isOpen && debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearch = (value: string) => {
    setQuery(value);
    setSelectedId(null);
    setIsPending(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setIsPending(false);
      search(value);
    }, 300);
  };

  const handleSelect = (id: string, result: Place) => {
    setSelectedId(id);
    onSelect(result);
  };

  return (
    <div
      className='z-modal fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm'
      onClick={onClose}>
      <div
        className='flex h-165 w-full max-w-152 flex-col rounded-[20px] bg-white px-9.75 py-6.5'
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className='self-end' aria-label='닫기'>
          <XIcon className='h-4 w-4 cursor-pointer text-black' />
        </button>
        <div className='flex min-h-0 flex-1 flex-col gap-9'>
          <div className='flex flex-col gap-1.75'>
            <h4 className='text-h3 text-center text-neutral-800'>
              세션 장소 검색
            </h4>
            <div className='flex items-center justify-center'>
              <div className='relative w-75'>
                <input
                  type='text'
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder='장소를 검색하세요.'
                  className='text-body-l focus:ring-primary w-full rounded-[10px] border border-neutral-200 px-4 py-2.75 pr-10 placeholder:text-neutral-400 focus:ring-2 focus:outline-none'
                />
                <SearchIcon className='absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-neutral-400' />
              </div>
            </div>
          </div>

          <div className='modal-scrollbar flex min-h-0 flex-1 flex-col gap-1.75 overflow-y-auto pr-2.5'>
            {status === 'loading' && query && (
              <p className='text-body-m items-center justify-center text-neutral-400'>
                검색 중...
              </p>
            )}

            {error && <p className='text-body-m text-alert'>{error}</p>}

            {results.length > 0 && (
              <ul className='flex flex-col gap-2'>
                {results.map((result) => (
                  <li
                    key={result.id}
                    onClick={() => handleSelect(result.id, result)}
                    className={clsx(
                      'flex h-17.5 cursor-pointer flex-col justify-center rounded-[10px] border px-4.25 py-[8.5px] transition-all duration-200',
                      {
                        'border-primary bg-primary/20': selectedId === result.id,
                        'hover:bg-primary/20 hover:border-primary border-neutral-200 bg-neutral-50 hover:shadow-sm':
                          selectedId !== result.id,
                      }
                    )}>
                    <p className='text-h4 text-neutral-800'>
                      {result.placeName}
                    </p>
                    <p className='text-body-l text-neutral-600'>
                      {result.roadAddress || result.address}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {status === 'ready' &&
              query &&
              results.length === 0 &&
              !error &&
              !isPending && (
                <p className='text-h4 items-center justify-center text-neutral-300'>
                  검색 결과가 없습니다.
                </p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
