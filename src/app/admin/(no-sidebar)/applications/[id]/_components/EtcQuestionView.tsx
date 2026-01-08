import {FullButton} from '@/components/button/FullButton';
import {FormInput} from '@/components/form/FormInput';
import {FormRadio} from '@/components/form/FormRadio';
import {FormTextarea} from '@/components/form/FormTextarea';
import {ETC_QUESTION_LABELS} from '@/constants/admin/admin-applications';

import {EtcQuestionType} from '@/schemas/admin/admin-application-type';

interface EtcQuestionViewProps {
  onPrev: () => void;
  data: EtcQuestionType;
}

export const EtcQuestionView = ({onPrev, data}: EtcQuestionViewProps) => {
  return (
    <div className='flex flex-col gap-10'>
      <FormInput
        label={ETC_QUESTION_LABELS.discoveryPath}
        value={data.discoveryPath}
        readOnly
      />

      <FormTextarea
        label={ETC_QUESTION_LABELS.parallelActivity}
        readOnly
        value={data.parallelActivity}
      />

      <div>
        <label className='text-h5 text-neutral-600'>
          {ETC_QUESTION_LABELS.interviewUnavailable}
        </label>
        <div className='flex flex-row gap-17.5'>
          <FormInput
            label={ETC_QUESTION_LABELS.interviewUnavailableTimeFirst}
            readOnly
            value={data.interviewUnavailableTime.march3}
          />
          <FormInput
            label={ETC_QUESTION_LABELS.interviewUnavailableTimeSecond}
            readOnly
            value={data.interviewUnavailableTime.march4}
          />
        </div>
      </div>

      <div>
        <label className='text-h5 text-neutral-600'>
          {ETC_QUESTION_LABELS.sessionDate}
        </label>
        <FormRadio
          label={ETC_QUESTION_LABELS.sessionDate_answer}
          readOnly
          checked={data.agreeSessionTime}
        />
      </div>
      <div>
        <label className='text-h5 text-neutral-600'>
          {ETC_QUESTION_LABELS.notice}
        </label>
        <FormRadio
          label={ETC_QUESTION_LABELS.notice_answer}
          readOnly
          checked={data.agreeMandatorySchedule}
        />
      </div>

      <div>
        <label className='text-h5 text-neutral-600'>
          {ETC_QUESTION_LABELS.termsAgree}
        </label>
        <FormRadio
          label={ETC_QUESTION_LABELS.termsAgree_answer}
          readOnly
          checked={data.agreePrivacyPolicy}
        />
      </div>

      <FullButton
        label='이전'
        labelTypo='h4'
        onClick={onPrev}
        backgroundColor='neutral-300'
        className='mt-22.5'
      />
    </div>
  );
};
