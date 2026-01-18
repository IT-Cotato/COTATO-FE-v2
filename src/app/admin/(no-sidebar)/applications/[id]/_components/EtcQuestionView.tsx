import {FullButton} from '@/components/button/FullButton';
import {FormInput} from '@/components/form/FormInput';
import {FormRadio} from '@/components/form/FormRadio';
import {FormTextarea} from '@/components/form/FormTextarea';
import {ETC_QUESTION_LABELS} from '@/constants/admin/admin-applications';
import {AdminApplicationEtcQuestionsType} from '@/schemas/admin/admin-application.schema';

interface EtcQuestionViewProps {
  onPrev: () => void;
  etcQuestions: AdminApplicationEtcQuestionsType;
}

export const EtcQuestionView = ({
  onPrev,
  etcQuestions,
}: EtcQuestionViewProps) => {
  return (
    <div className='flex flex-col gap-10'>
      <FormInput
        label={ETC_QUESTION_LABELS.discoveryPath}
        value={etcQuestions.discoveryPath.selectedAnswer ?? ''}
        readOnly
      />

      <FormTextarea
        label={ETC_QUESTION_LABELS.parallelActivities}
        readOnly
        value={etcQuestions.parallelActivities ?? ''}
      />

      <div>
        <label className='text-h5 text-neutral-600'>
          {etcQuestions.interviewStartDate}부터 {etcQuestions.interviewEndDate}
          까지 면접이 진행됩니다. 참여가 불가능한 시간이 있다면 모두 작성해
          주세요.
        </label>
        <div className='flex flex-row gap-17.5'>
          <FormInput
            label={etcQuestions.interviewStartDate}
            readOnly
            value={etcQuestions.unavailableInterviewTimes ?? ''}
          />
          <FormInput label={etcQuestions.interviewEndDate} readOnly />
        </div>
      </div>

      <div>
        <label className='text-h5 text-neutral-600'>
          {ETC_QUESTION_LABELS.sessionAttendance}
        </label>
        <FormRadio
          label={ETC_QUESTION_LABELS.sessionAttendance_answer}
          readOnly
          checked={etcQuestions.sessionAttendance ?? true}
        />
      </div>
      <div>
        <label className='text-h5 text-neutral-600'>
          최종 합격 시 대면 OT({etcQuestions.otDate}), 코커톤(0월 0일),
          데모데이(0월 0일)는 필수 참여입니다.
          {/** TODO: 추후 코커톤, 데모데이 서버 응답으로 변경 */}
        </label>
        <FormRadio
          label={ETC_QUESTION_LABELS.mandatoryEvents_answer}
          readOnly
          checked={etcQuestions.mandatoryEvents ?? true}
        />
      </div>

      <div>
        <label className='text-h5 text-neutral-600'>
          {ETC_QUESTION_LABELS.privacyPolicy}
        </label>
        <FormRadio
          label={ETC_QUESTION_LABELS.privacyPolicy_answer}
          readOnly
          checked={etcQuestions.privacyPolicy ?? true}
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
