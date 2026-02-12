import {OnboardingFormDropdown} from '@/app/onboarding/_components/OnboardingFormDropdown';
import {OnboardingFormInput} from '@/app/onboarding/_components/OnboardingFormInput';
import {JoinRequestSchema, JoinRequestType} from '@/schemas/auth/auth.schema';
import {Button} from '@repo/ui/components/buttons/Button';
import {Checkbox} from '@repo/ui/components/checkbox/CheckBox';
import ChevronRight from '@/assets/chevrons/chevron-right.svg';
import {useState} from 'react';
import {useJoinMutation} from '@/hooks/mutations/auth/useAuth.mutations';
import {useRouter} from 'next/navigation';
import {ROUTES} from '@/constants/routes';
import {Modal} from '@repo/ui/components/modal/Modal';
import {FullButton} from '@repo/ui/components/buttons/FullButton';

interface OnboardingUserInfoContainerProps {
  onPrev: () => void;
  prevData: Partial<JoinRequestType>;
}

export const OnboardingUserInfoContainer = ({
  onPrev,
  prevData,
}: OnboardingUserInfoContainerProps) => {
  const router = useRouter();
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    gender: '',
    phoneNumber: '',
    university: '',
    generation: '',
    position: '',
    termsOfServiceAgreed: false,
    privacyPolicyAgreed: false,
  });

  const {mutate: join} = useJoinMutation();

  const purePhoneNumber = userInfo.phoneNumber.replace(/-/g, '');

  const isAllAgreed =
    userInfo.termsOfServiceAgreed && userInfo.privacyPolicyAgreed;

  const handleAllAgree = () => {
    const nextValue = !isAllAgreed;
    setUserInfo({
      ...userInfo,
      termsOfServiceAgreed: nextValue,
      privacyPolicyAgreed: nextValue,
    });
  };

  const result = JoinRequestSchema.safeParse({
    ...prevData,
    phoneNumber: purePhoneNumber,
    gender: GENDER_MAP[userInfo.gender],
    university: userInfo.university,
    position: POSITION_MAP[userInfo.position],
    termsOfServiceAgreed: userInfo.termsOfServiceAgreed,
    privacyPolicyAgreed: userInfo.privacyPolicyAgreed,
  });

  const errors = !result.success ? result.error.format() : null;
  const isValid = result.success && userInfo.generation && isAllAgreed;

  const handleJoinSubmit = () => {
    if (!result.success) return;

    const joinData = {
      ...result.data,
    } as JoinRequestType;

    join(joinData, {
      onSuccess: () => {
        setIsJoinModalOpen(true);
      },
    });
  };

  const handleModalClose = () => {
    setIsJoinModalOpen(false);
    router.push(ROUTES.HOME);
  };

  return (
    <div className='flex flex-col gap-3.5'>
      <div className='flex flex-row justify-between gap-5.75'>
        <OnboardingFormDropdown
          className='w-44.5'
          label='성별'
          placeholder='성별'
          value={userInfo.gender}
          onChange={(val) => setUserInfo({...userInfo, gender: val})}
          options={['여성', '남성']}
        />

        <OnboardingFormInput
          className='flex-1'
          label='전화번호'
          type='phone'
          placeholder='010-0000-0000'
          value={userInfo.phoneNumber}
          onChange={(val) => setUserInfo({...userInfo, phoneNumber: val})}
          error={errors?.phoneNumber?._errors[0]}
        />
      </div>
      <OnboardingFormInput
        label='학교'
        type='string'
        placeholder='OO대학교 형식으로 입력해 주세요.'
        value={userInfo.university}
        onChange={(val) => setUserInfo({...userInfo, university: val})}
        error={errors?.university?._errors[0]}
      />

      <div className='flex flex-row gap-6'>
        <OnboardingFormInput
          className='w-44.5'
          label='기수'
          type='string'
          placeholder='OO기 '
          value={userInfo.generation}
          onChange={(val) => setUserInfo({...userInfo, generation: val})}
        />
        <OnboardingFormDropdown
          className='flex-1'
          label='직군'
          placeholder='직군을 선택해 주세요.'
          options={['기획', '디자인', '프론트엔드', '백엔드']}
          value={userInfo.position}
          onChange={(val) => setUserInfo({...userInfo, position: val})}
        />
      </div>

      <div className='flex cursor-pointer flex-row items-center justify-between border-b border-b-neutral-800 pb-4'>
        <label className='text-h5 pointer-events-none text-neutral-100'>
          이용약관 전체 동의
        </label>
        <Checkbox checked={isAllAgreed} onChange={handleAllAgree} />
      </div>
      <div className='flex flex-row items-center justify-between'>
        <label
          className='text-h5 flex cursor-pointer flex-row items-center gap-2.5 text-neutral-100'
          onClick={() => {
            window.open(
              'https://cyclic-drain-e4c.notion.site/COTATO-3014e7fe345c8074ba9fd7cfea83d390',
              '_blank',
              'noopener,noreferrer'
            );
          }}>
          <span>개인정보 처리방침</span>
          <span className='text-primary'>(필수)</span>
          <ChevronRight className='h-5 w-5 text-neutral-100' />
        </label>
        <Checkbox
          checked={userInfo.privacyPolicyAgreed}
          onChange={() =>
            setUserInfo({
              ...userInfo,
              privacyPolicyAgreed: !userInfo.privacyPolicyAgreed,
            })
          }
        />
      </div>

      {/* --- 서비스 이용약관 --- */}
      <div className='flex flex-row items-center justify-between'>
        <label
          className='text-h5 flex cursor-pointer flex-row items-center gap-2.5 text-neutral-100'
          onClick={() => {
            window.open(
              'https://cyclic-drain-e4c.notion.site/COTATO-3014e7fe345c805f88dde6e2fe46dd7a',
              '_blank',
              'noopener,noreferrer'
            );
          }}>
          <span>서비스 이용약관</span>
          <span className='text-primary'>(필수)</span>
          <ChevronRight className='h-5 w-5 text-neutral-100' />
        </label>
        <Checkbox
          checked={userInfo.termsOfServiceAgreed}
          onChange={() =>
            setUserInfo({
              ...userInfo,
              termsOfServiceAgreed: !userInfo.termsOfServiceAgreed,
            })
          }
        />
      </div>
      <div className='mt-2 flex flex-row justify-between'>
        <Button
          width={200}
          label='이전'
          backgroundColor='neutral-600'
          onClick={onPrev}
        />
        <Button
          width={200}
          label='신청 완료'
          onClick={handleJoinSubmit}
          disabled={!isValid}
          backgroundColor={isValid ? 'primary' : 'text-disabled'}
          className='shadow-default'
        />
      </div>
      {isJoinModalOpen && (
        <Modal
          title='가입 신청이 완료되었습니다.'
          isOpen={isJoinModalOpen}
          titleStyle='text-h4 text-neutral-800'
          content={
            <>
              승인 완료까지 약 3-5일 소요됩니다.
              <br />
              승인이 완료된 후 서비스 이용이 가능합니다.
            </>
          }
          contentWrapperClassName='flex flex-col gap-[29px]'
          actions={
            <FullButton label='홈으로 이동' onClick={handleModalClose} />
          }
          onClose={handleModalClose}></Modal>
      )}
    </div>
  );
};

const GENDER_MAP: Record<string, 'MALE' | 'FEMALE'> = {
  남성: 'MALE',
  여성: 'FEMALE',
};

const POSITION_MAP: Record<string, 'PM' | 'DE' | 'FE' | 'BE'> = {
  기획: 'PM',
  디자인: 'DE',
  프론트엔드: 'FE',
  백엔드: 'BE',
};
