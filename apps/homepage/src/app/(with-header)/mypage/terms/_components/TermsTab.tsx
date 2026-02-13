import {TERMS_MENU, TermTabType} from '@/constants/mypage-mem/terms';

interface TermsTabProps {
  activeTab: TermTabType;
  onTabChange: (tab: TermTabType) => void;
}

export const TermsTab = ({activeTab, onTabChange}: TermsTabProps) => {
  return (
    <div className='flex gap-9'>
      {TERMS_MENU.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`cursor-pointer text-[20px] leading-normal transition-colors ${
            activeTab === tab.id
              ? 'font-bold text-neutral-800'
              : 'font-medium text-neutral-400'
          }`}>
          {tab.label}
        </button>
      ))}
    </div>
  );
};
