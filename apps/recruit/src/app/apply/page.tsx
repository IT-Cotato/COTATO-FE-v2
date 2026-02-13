import {ProtectedRoute} from '@/components/auth/ProtectedRoute';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';
import ApplyPageContent from '@/app/apply/_components/ApplyPageContent';

/**
 * 지원서 작성 페이지
 *
 * 접근 제한:
 * - 로그인한 사용자만 접근 가능
 * - 미로그인 사용자는 alert 후 메인 페이지로 리다이렉트
 * - 반드시 ?id= 쿼리 파라미터가 있어야 접근 가능
 */
export default function ApplyPage() {
  return (
    <ProtectedRoute requireRecruiting={true}>
      <SuspenseWrapper
        fallback={
          <div className='flex h-screen items-center justify-center'>
            <Spinner />
          </div>
        }>
        <ApplyPageContent />
      </SuspenseWrapper>
    </ProtectedRoute>
  );
}
