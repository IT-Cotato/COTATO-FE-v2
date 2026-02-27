import {useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {MEMBER_STATUS_OPTIONS, MemberStatusKey} from '@/constants/admin/admin';

export const useAllMembersUrlState = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusParams = searchParams.getAll('status');
  const selectedStatuses: MemberStatusKey[] =
    statusParams.length === 0 || statusParams.includes('ALL')
      ? []
      : (statusParams.filter((s) =>
          MEMBER_STATUS_OPTIONS.includes(s as MemberStatusKey)
        ) as MemberStatusKey[]);

  const currentPage = Number(searchParams.get('page') ?? 1);
  const searchParam = searchParams.get('search') ?? undefined;
  const [keyword, setKeyword] = useState('');

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

  const handleFilterChange = (labels: MemberStatusKey[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('status');
    if (labels.length === 0 || labels.length === MEMBER_STATUS_OPTIONS.length) {
      params.append('status', 'ALL');
    } else {
      labels.forEach((label) => params.append('status', label));
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`, {scroll: false});
  };

  return {
    selectedStatuses,
    currentPage,
    searchParam,
    keyword,
    setKeyword,
    handleSearch,
    handleUpdatePage,
    handleFilterChange,
  };
};
