'use client';

import {useRef, useState, useEffect} from 'react';
import {createPortal} from 'react-dom';
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

  return createPortal(
    <div
      className='z-modal fixed inset-0 flex items-center justify-center bg-black/50 px-6 backdrop-blur-sm'
      onClick={onClose}>
      <div
        className='flex w-full max-w-152 flex-col rounded-[20px] bg-white p-5 lg:h-165 lg:px-9.75 lg:py-6.5'
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className='self-end p-1.25' aria-label='닫기'>
          <XIcon className='h-3.5 w-3.5 cursor-pointer text-black' />
        </button>
        <div className='flex min-h-0 flex-1 flex-col gap-4.5 lg:gap-9'>
          <div className='flex flex-col gap-1.75'>
            <h4 className='text-h5 lg:text-h3 text-center font-bold text-neutral-800'>
              세션 장소 검색
            </h4>
            <div className='flex items-center justify-center'>
              <div className='relative w-full lg:w-75'>
                <input
                  type='text'
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder='장소를 검색하세요.'
                  className='text-body-l focus:ring-primary w-full rounded-[10px] border border-neutral-200 px-3.25 py-2.25 pr-10 placeholder:text-neutral-400 focus:ring-2 focus:outline-none lg:px-4 lg:py-2.75'
                />
                <SearchIcon className='absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-neutral-800' />
              </div>
            </div>
          </div>

          <div className='modal-scrollbar flex max-h-92.75 min-h-92.75 flex-col gap-1.75 overflow-y-auto pr-2.5 lg:max-h-none lg:min-h-0 lg:flex-1'>
            {status === 'loading' && query && (
              <p className='text-body-m items-center justify-center text-neutral-400'>
                검색 중...
              </p>
            )}

            {error && <p className='text-body-m text-alert'>{error}</p>}

            {results.length > 0 && (
              <ul className='flex flex-col gap-1.75 lg:gap-2'>
                {results.map((result) => (
                  <li
                    key={result.id}
                    onClick={() => handleSelect(result.id, result)}
                    className={clsx(
                      'flex h-14 cursor-pointer flex-col justify-center rounded-[10px] border px-4.25 py-[8.5px] transition-all duration-200 lg:h-17.5',
                      {
                        'border-primary bg-primary/20':
                          selectedId === result.id,
                        'hover:bg-primary/20 hover:border-primary border-neutral-200 bg-neutral-50 hover:shadow-sm':
                          selectedId !== result.id,
                      }
                    )}>
                    <p className='text-body-l lg:text-h4 font-bold text-neutral-800'>
                      {result.placeName}
                    </p>
                    <p className='text-body-m lg:text-body-l text-neutral-600'>
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
                <p className='text-body-l lg:text-h4 m-auto text-neutral-300'>
                  검색 결과가 없습니다.
                </p>
              )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
