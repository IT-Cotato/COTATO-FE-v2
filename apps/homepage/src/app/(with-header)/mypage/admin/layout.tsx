import {ProtectedRoute} from '@/components/auth/ProtectedRoute';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRoute requireRole='ADMIN'>{children}</ProtectedRoute>;
}
