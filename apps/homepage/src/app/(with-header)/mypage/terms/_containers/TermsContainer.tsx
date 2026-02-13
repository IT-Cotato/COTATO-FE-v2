'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {TermsTab} from '@/app/(with-header)/mypage/terms/_components/TermsTab';
import {TermTabType} from '@/constants/mypage-mem/term/terms';
import {ServiceTermsContainer} from '@/app/(with-header)/mypage/terms/_containers/ServiceTermsContainer';
import {PrivacyPolicyContainer} from '@/app/(with-header)/mypage/terms/_containers/PrivacyPolicyContainer';
import {ClubRulesContainer} from '@/app/(with-header)/mypage/terms/_containers/ClubRulesContainer';

export const TermsContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab = (searchParams.get('tab') as TermTabType) || 'serviceTerms';

  const handleTabChange = (tab: TermTabType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.push(`?${params.toString()}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'serviceTerms':
        return <ServiceTermsContainer />;
      case 'privacyPolicy':
        return <PrivacyPolicyContainer />;
      case 'clubRules':
        return <ClubRulesContainer />;
      default:
        return <ServiceTermsContainer />;
    }
  };

  return (
    <div className='flex flex-col gap-[39px]'>
      <TermsTab activeTab={activeTab} onTabChange={handleTabChange} />
      <div className='w-full'>{renderContent()}</div>
    </div>
  );
};
