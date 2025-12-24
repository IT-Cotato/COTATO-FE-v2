type ApplicationResultLabel = '합격' | '불합격' | '예비합격' | '평가전';

interface AdminApplicationResultBadgeProps {
  result?: string;
}

export const AdminApplicationResultBadge = ({
  result,
}: AdminApplicationResultBadgeProps) => {
  const {bg} =
    RESULT_STYLE_MAP[result as ApplicationResultLabel] ??
    RESULT_STYLE_MAP['평가전'];

  return (
    <div
      className={`inline-flex w-18.75 items-center justify-center rounded-[10px] py-1.5 text-body-s font-normal ${bg} text-white`}>
      {result}
    </div>
  );
};

const RESULT_STYLE_MAP: Record<ApplicationResultLabel, {bg: string}> = {
  합격: {
    bg: 'bg-[#68CA3A]',
  },
  불합격: {
    bg: 'bg-alert',
  },
  예비합격: {
    bg: 'bg-hover',
  },
  평가전: {
    bg: 'bg-text-disabled',
  },
};
