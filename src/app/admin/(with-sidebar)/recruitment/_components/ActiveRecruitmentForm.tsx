import {Button} from '@/components/button/Button';
import {GenerationField} from './GenerationField';
import {PeriodField} from './PeriodField';

export const ActiveRecruitmentForm = () => {
  return (
    <form className='flex h-25 w-full items-end justify-between rounded-[10px] bg-neutral-100 pt-3 pr-5 pb-3 pl-3.5'>
      <fieldset className='flex h-19 gap-19 pb-1 text-body-m font-semibold'>
        <legend className='sr-only'>모집 설정</legend>
        <GenerationField />
        <PeriodField />
      </fieldset>
      <Button
        label='모집 시작하기'
        width={156}
        height={36}
        labelTypo='body_l'
      />
    </form>
  );
};
