import {ProtectedRoute} from '@/components/auth/ProtectedRoute';
import {ApplyFormContainer} from '@/app/apply/_components/ApplyFormContainer';

/**
 * 지원서 작성 페이지
 *
 * 접근 제한:
 * - 로그인한 사용자만 접근 가능
 * - 미로그인 사용자는 alert 후 메인 페이지로 리다이렉트
 */
export default function ApplyPage() {
  return (
    <ProtectedRoute>
      <ApplyFormContainer />
    </ProtectedRoute>
  );
}
