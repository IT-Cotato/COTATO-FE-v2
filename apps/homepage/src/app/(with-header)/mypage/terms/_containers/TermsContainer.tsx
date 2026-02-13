'use client';

import {useState} from 'react';
import {TermsTab} from '@/app/(with-header)/mypage/terms/_components/TermsTab';
import {TermTabType} from '@/constants/mypage-mem/terms';
import {ServiceTermsContainer} from '@/app/(with-header)/mypage/terms/_containers/ServiceTermsContainer';
import {PrivacyPolicyContainer} from '@/app/(with-header)/mypage/terms/_containers/PrivacyPolicyContainer';
import {ClubRulesContainer} from '@/app/(with-header)/mypage/terms/_containers/ClubRulesContainer';

export const TermsContainer = () => {
  const [activeTab, setActiveTab] = useState<TermTabType>('serviceTerms');

  const renderContent = () => {
    switch (activeTab) {
      case 'serviceTerms':
        return <ServiceTermsContainer />;
      case 'privacyPolicy':
        return <PrivacyPolicyContainer />;
      case 'clubRules':
        return <ClubRulesContainer />;
      default:
        return null;
    }
  };

  return (
    <div className='flex flex-col gap-[39px]'>
      <TermsTab activeTab={activeTab} onTabChange={setActiveTab} />
      <div className='w-full'>{renderContent()}</div>
    </div>
  );
};
