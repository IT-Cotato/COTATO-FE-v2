import {formatRecruitmentDate} from '@/utils/formatDate';

export const RECRUITMENT_TEXT = {
  isInProgressRecruiting: {
    statusText: '코테이토 모집이 시작되었습니다!',
    descriptionText: '지금 바로 지원하고 코테이토와 당신의 여정을 함께하세요!',
  },
  isDoneRecruiting: {
    statusText: '코테이토 모집이 종료되었습니다!',
    descriptionText:
      '모집 안내 예약 신청을 해주시면 누구보다 먼저 코테이토에 지원하실 수 있어요.',
  },
};
import type {RecruitmentInformationType} from '@/schemas/admin/admin-recruitment-information.schema';

const OT_NOTICE_FALLBACK =
  'OT, 코커톤, 데모데이는 필수 참석 일정입니다. 불참 시 지원이 제한될 수 있습니다.';

const BASE_RECRUITMENT_NOTICES = [
  '지원 전 모집 일정과 활동 일정을 충분히 확인하신 후 지원해주세요!',
  '파트별 중복 지원은 불가하다는 점 인지 바랍니다.',
  OT_NOTICE_FALLBACK,
  '제출 후에는 수정이 불가하니 내용을 꼼꼼히 확인한 뒤 제출해주세요.',
  '임시저장 상태는 최종 제출로 인정되지 않습니다. 반드시 제출 버튼을 눌러주세요.',
  '마감 시간 이후에는 제출을 받지 않습니다. 늦지 않게 꼭 제출해주세요!',
  '지원 마감 시간이 임박하면 지원자가 몰려 서버가 불안정할 수 있으므로 가급적 여유롭게 제출하는 것을 권장드립니다.',
  '서류 합격 여부는 가입하신 이메일을 통해 알려드립니다.',
];

export function buildRecruitmentNotices(
  schedule: RecruitmentInformationType | null | undefined,
): string[] {
  const otNotice =
    schedule?.ot && schedule?.cokerthon && schedule?.demoDay
      ? `OT(${formatRecruitmentDate(schedule.ot, false)}), 코커톤(${formatRecruitmentDate(schedule.cokerthon, false)}), 데모데이(${formatRecruitmentDate(schedule.demoDay, false)}) 필수 참석 일정입니다. 불참 시 지원이 제한될 수 있습니다.`
      : OT_NOTICE_FALLBACK;

  return BASE_RECRUITMENT_NOTICES.map((notice) =>
    notice === OT_NOTICE_FALLBACK ? otNotice : notice,
  );
}
