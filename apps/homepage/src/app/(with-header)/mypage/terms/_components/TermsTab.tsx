import {TERMS_MENU, TermTabType} from '@/constants/mypage-mem/term/terms';

interface TermsTabProps {
  activeTab: TermTabType;
  onTabChange: (tab: TermTabType) => void;
}

export const TermsTab = ({activeTab, onTabChange}: TermsTabProps) => {
  return (
    <div className='flex w-full gap-2.5 lg:w-auto lg:gap-9'>
      {TERMS_MENU.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`text-h5 lg:text-h3 flex-1 cursor-pointer text-center font-bold transition-colors lg:flex-none ${activeTab === tab.id ? 'text-neutral-700' : 'text-neutral-400'} `}>
          {tab.label}
        </button>
      ))}
    </div>
  );
};
