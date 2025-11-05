'use client';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: any) => state.user.currentUser);
  const router = useRouter();

  useEffect(() => {
    // Redirect if not logged in or not admin
    if (!user || !user.email.endsWith('@malcom.ltd')) {
      router.push('/login');
    }
  }, [user, router]);

  return <>{children}</>;
}
