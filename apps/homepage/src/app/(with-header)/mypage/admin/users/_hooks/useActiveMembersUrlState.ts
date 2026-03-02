import {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';

export const useActiveMembersUrlState = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawPage = Number(searchParams.get('page'));
  const currentPage = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const searchParam = searchParams.get('search') ?? undefined;
  const [keyword, setKeyword] = useState(searchParam ?? '');

  useEffect(() => {
    setKeyword(searchParam ?? '');
  }, [searchParam]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (keyword) {
      params.set('search', keyword);
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`, {scroll: false});
  };

  const handleUpdatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
  };

  return {
    currentPage,
    searchParam,
    keyword,
    setKeyword,
    handleSearch,
    handleUpdatePage,
  };
};
