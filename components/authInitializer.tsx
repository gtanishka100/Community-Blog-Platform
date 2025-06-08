'use client';
import { useEffect } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { loadUserFromStorage } from '@/store/slices/authSlice';

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return <>{children}</>;
}