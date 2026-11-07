'use client';

import {FormEvent, useRef, useState} from 'react';
import {Button} from '@repo/ui/components/buttons/Button';
import {Modal} from '@repo/ui/components/modal/Modal';
import {
  GrantManualBonusPoint,
  MANUAL_BONUS_POINT_MAX,
} from '@/schemas/admin/manualBonusPoint.schema';
import {useManualBonusPointsQuery} from '@/hooks/queries/useManualBonusPoints.query';
import {
  useCancelManualBonusPointMutation,
  useGrantManualBonusPointMutation,
} from '@/hooks/mutations/useManualBonusPoints.mutation';

/** 선택된 기수·회원의 수동 상점만 관리하며 기존 기타 벌점 입력과 분리한다. */
interface ManualBonusPointModalProps {
  generationId: number;
  memberId: number;
  memberName: string;
  onClose: () => void;
}

const errorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }
  return '요청을 처리하지 못했습니다. 다시 시도해 주세요.';
};

/** 명시적인 저장·취소만 요청하고 불확실한 저장 재시도에는 같은 요청 본문을 사용한다. */
export const ManualBonusPointModal = ({
  generationId,
  memberId,
  memberName,
  onClose,
}: ManualBonusPointModalProps) => {
  const [points, setPoints] = useState('1');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState<GrantManualBonusPoint | null>(
    null
  );
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [cancelId, setCancelId] = useState<number | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const inFlight = useRef(false);
  const history = useManualBonusPointsQuery(generationId, memberId);
  const grant = useGrantManualBonusPointMutation();
  const cancel = useCancelManualBonusPointMutation();
  const busy = grant.isPending || cancel.isPending;
  // 빈 입력은 그대로 보여 주되 저장할 때만 범위 안의 정수로 변환한다.
  const numericPoints = Number(points);
  const validPoints =
    /^\d+$/.test(points) &&
    Number.isInteger(numericPoints) &&
    numericPoints >= 1 &&
    numericPoints <= MANUAL_BONUS_POINT_MAX;

  const handleGrant = async (event: FormEvent) => {
    event.preventDefault();
    if (inFlight.current || busy || !validPoints || !reason.trim()) return;
    // 1. 응답이 유실되어도 같은 내용·ID로 재시도하도록 최초 전송 내용을 고정한다.
    const request = submitted ?? {
      generationId,
      memberId,
      points: numericPoints,
      reason: reason.trim(),
      requestId: crypto.randomUUID(),
    };
    setSubmitted(request);
    inFlight.current = true;
    setError('');
    setMessage('');
    try {
      await grant.mutateAsync(request);
      // 2. 서버가 확정한 뒤에만 다음 부여를 위한 새 입력을 허용한다.
      setSubmitted(null);
      setReason('');
      setMessage(`상점 ${request.points}점을 부여했습니다.`);
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      inFlight.current = false;
    }
  };

  const handleCancel = async (event: FormEvent) => {
    event.preventDefault();
    if (inFlight.current || busy || cancelId === null || !cancelReason.trim())
      return;
    inFlight.current = true;
    setError('');
    setMessage('');
    try {
      await cancel.mutateAsync({id: cancelId, reason: cancelReason.trim()});
      setCancelId(null);
      setCancelReason('');
      setMessage('상점 부여를 취소했습니다. 원기록은 보존됩니다.');
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      inFlight.current = false;
    }
  };

  return (
    <Modal
      isOpen
      onClose={busy ? undefined : onClose}
      title='상점 부여'
      titleStyle='text-h4 w-full pr-6 text-left font-bold text-neutral-800'
      contentWrapperClassName='items-stretch! justify-start gap-5 [&>div]:w-full'
      containerStyle={{
        width: 'calc(100% - 32px)',
        maxWidth: 520,
        maxHeight: 'calc(100dvh - 32px)',
        overflowY: 'auto',
        padding: '28px 24px',
      }}
      content={
        <div className='text-body-l flex w-full min-w-0 flex-col gap-5 text-left'>
          <div className='flex items-center justify-between gap-3 rounded-[10px] bg-neutral-50 px-4 py-3'>
            <span className='text-body-l text-neutral-500'>부여 대상</span>
            <span className='text-h5 font-semibold text-neutral-800'>
              {memberName}
            </span>
          </div>
          <form onSubmit={handleGrant} className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2.5'>
              <label
                htmlFor='manual-bonus-points'
                className='text-body-l-sb text-neutral-800'>
                부여 점수 <span className='text-alert'>*</span>
              </label>
              <div className='focus-within:border-primary focus-within:ring-primary/10 flex items-center gap-3 rounded-[10px] border border-neutral-200 px-4 transition-colors focus-within:ring-2'>
                <input
                  id='manual-bonus-points'
                  type='number'
                  inputMode='numeric'
                  aria-label='상점 점수'
                  aria-describedby='manual-bonus-points-help'
                  aria-invalid={points !== '' && !validPoints}
                  min={1}
                  max={MANUAL_BONUS_POINT_MAX}
                  step={1}
                  required
                  value={points}
                  onChange={(event) => setPoints(event.target.value)}
                  disabled={busy || submitted !== null}
                  placeholder='점수를 입력해 주세요'
                  className='text-h5 min-w-0 flex-1 bg-transparent py-3 font-semibold text-neutral-800 placeholder:text-neutral-400 focus:outline-none disabled:text-neutral-400'
                />
                <span className='text-body-l text-neutral-500'>점</span>
              </div>
              <p
                id='manual-bonus-points-help'
                className={`text-body-m ${points !== '' && !validPoints ? 'text-alert' : 'text-neutral-500'}`}>
                1~{MANUAL_BONUS_POINT_MAX}점 사이의 정수를 입력해 주세요.
              </p>
            </div>
            <div className='flex flex-col gap-2.5'>
              <label
                htmlFor='manual-bonus-reason'
                className='text-body-l-sb text-neutral-800'>
                부여 사유 <span className='text-alert'>*</span>
              </label>
              <div className='focus-within:border-primary focus-within:ring-primary/10 rounded-[10px] border border-neutral-200 bg-white transition-colors focus-within:ring-2'>
                <textarea
                  id='manual-bonus-reason'
                  aria-label='상점 부여 사유'
                  placeholder='예) 행사 준비 및 운영 지원'
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  maxLength={300}
                  required
                  disabled={busy || submitted !== null}
                  rows={3}
                  className='text-body-l block min-h-24 w-full resize-none rounded-[10px] bg-transparent px-4 pt-3 text-neutral-800 placeholder:text-neutral-400 focus:outline-none disabled:text-neutral-400'
                />
                <p className='text-body-m px-4 pt-1 pb-2.5 text-right text-neutral-400'>
                  <span className='text-neutral-600'>{reason.length}</span>
                  {' / 300자'}
                </p>
              </div>
              <p className='text-body-m text-neutral-500'>
                선택한 기수의 상점과 누계에 반영됩니다.
              </p>
            </div>
            {submitted && error && (
              <p className='text-body-m rounded-[10px] bg-neutral-50 p-3 text-neutral-600'>
                저장 응답을 확인하지 못했습니다. 같은 내용으로 재시도하면 중복
                부여되지 않습니다.
              </p>
            )}
            <div className='grid grid-cols-[1fr_2fr] gap-2.5'>
              <Button
                type='button'
                label='취소'
                variant='outline'
                textColor='neutral-600'
                borderColor='neutral-200'
                height={42}
                width='100%'
                labelTypo='body_l_sb'
                disabled={busy}
                onClick={onClose}
              />
              <Button
                type='submit'
                label={
                  grant.isPending
                    ? '저장 중…'
                    : submitted
                      ? '같은 내용으로 재시도'
                      : '상점 부여'
                }
                height={42}
                width='100%'
                labelTypo='body_l_sb'
                enableHover
                disabled={busy || !validPoints || !reason.trim()}
              />
            </div>
          </form>
          {message && (
            <p role='status' className='text-body-l text-primary'>
              {message}
            </p>
          )}
          {error && (
            <p role='alert' className='text-body-l text-alert'>
              {error}
            </p>
          )}
          <section
            aria-label='수동 상점 부여 이력'
            className='border-t border-neutral-100 pt-5'>
            <div className='mb-3 flex items-center gap-2'>
              <h5 className='text-body-l-sb text-neutral-800'>부여 이력</h5>
              {history.data && (
                <span className='text-body-m text-neutral-400'>
                  {history.data.length}건
                </span>
              )}
            </div>
            {history.isLoading && (
              <p role='status' className='text-body-l py-4 text-neutral-500'>
                이력을 불러오는 중입니다.
              </p>
            )}
            {history.isError && (
              <div className='text-body-l rounded-[10px] bg-neutral-50 p-4'>
                <p role='alert'>부여 이력을 불러오지 못했습니다.</p>
                <button
                  type='button'
                  onClick={() => history.refetch()}
                  className='text-primary mt-2 cursor-pointer underline underline-offset-4'>
                  이력 다시 조회
                </button>
              </div>
            )}
            {history.data?.length === 0 && (
              <p className='text-body-l rounded-[10px] bg-neutral-50 px-4 py-5 text-center text-neutral-400'>
                아직 부여한 상점이 없습니다.
              </p>
            )}
            <ul className='flex max-h-64 flex-col gap-3 overflow-y-auto'>
              {history.data?.map((point) => (
                <li
                  key={point.id}
                  className='rounded-[10px] border border-neutral-100 p-4'>
                  <div className='flex items-center justify-between gap-3'>
                    <div className='flex items-center gap-2'>
                      <span
                        className={`text-body-l-sb rounded-md px-2.5 py-1 ${
                          point.cancelledAt
                            ? 'bg-neutral-50 text-neutral-400 line-through'
                            : 'bg-primary/10 text-primary'
                        }`}>
                        +{point.points}점
                      </span>
                      {point.cancelledAt && (
                        <span className='text-body-m text-neutral-400'>
                          취소됨
                        </span>
                      )}
                    </div>
                    {!point.cancelledAt && cancelId !== point.id && (
                      <button
                        type='button'
                        disabled={busy}
                        onClick={() => {
                          setCancelId(point.id);
                          setCancelReason('');
                        }}
                        aria-label={`상점 ${point.id} 취소`}
                        className='text-body-m hover:text-alert cursor-pointer text-neutral-500 underline underline-offset-4 disabled:cursor-not-allowed'>
                        부여 취소
                      </button>
                    )}
                  </div>
                  <p className='text-body-l mt-2.5 break-all whitespace-pre-wrap text-neutral-800'>
                    {point.reason}
                  </p>
                  <p className='text-body-m mt-1 text-neutral-400'>
                    {point.createdByName} ·{' '}
                    {point.createdAt.replace('T', ' ').slice(0, 16)}
                  </p>
                  {point.cancelledAt ? (
                    <p className='text-body-m mt-3 rounded-md bg-neutral-50 px-3 py-2 break-all text-neutral-500'>
                      취소: {point.cancelledByName} · {point.cancellationReason}
                    </p>
                  ) : cancelId === point.id ? (
                    <form
                      onSubmit={handleCancel}
                      className='mt-3 flex flex-col gap-2.5 border-t border-neutral-100 pt-3'>
                      <label className='text-body-m-sb flex flex-col gap-2 text-neutral-600'>
                        취소 사유
                        <input
                          aria-label='상점 취소 사유'
                          placeholder='상점 부여를 취소하는 이유를 입력해 주세요'
                          value={cancelReason}
                          onChange={(event) =>
                            setCancelReason(event.target.value)
                          }
                          maxLength={300}
                          required
                          disabled={busy}
                          className='text-body-l focus:border-primary w-full rounded-[10px] border border-neutral-200 px-3 py-2.5 font-normal placeholder:text-neutral-400 focus:outline-none'
                        />
                      </label>
                      <div className='grid grid-cols-2 gap-2'>
                        <Button
                          type='button'
                          label='돌아가기'
                          variant='outline'
                          textColor='neutral-600'
                          borderColor='neutral-200'
                          width='100%'
                          height={36}
                          labelTypo='body_m_sb'
                          disabled={busy}
                          onClick={() => setCancelId(null)}
                        />
                        <Button
                          type='submit'
                          label='취소 확정'
                          variant='outline'
                          textColor='alert'
                          borderColor='alert'
                          width='100%'
                          height={36}
                          labelTypo='body_m_sb'
                          disabled={busy || !cancelReason.trim()}
                        />
                      </div>
                    </form>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        </div>
      }
    />
  );
};
