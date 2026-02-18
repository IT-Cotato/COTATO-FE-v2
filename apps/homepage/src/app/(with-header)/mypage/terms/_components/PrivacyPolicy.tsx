import {
  PRIVACY_POLICY,
  PRIVACY_POLICY_INTRO,
} from '@/constants/mypage-mem/term/PrivacyPolicyData';

export const PrivacyPolicy = () => {
  return (
    <div className='flex h-full w-full flex-col items-start gap-5 py-[38.5px] pl-10 text-neutral-800'>
      <h4 className='text-h4'>코테이토(COTATO) 개인정보 처리방침</h4>
      <div className='text-body-l flex flex-col pb-2'>
        {PRIVACY_POLICY_INTRO.content}
      </div>
      {PRIVACY_POLICY.map((section) => (
        <div key={section.title} className='flex flex-col gap-1'>
          <span className='text-body-l-sb'>{section.title}</span>
          {section.content}
        </div>
      ))}
      <div className='h-[38.5px] w-full shrink-0' aria-hidden='true' />
    </div>
  );
};
