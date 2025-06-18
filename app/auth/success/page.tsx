'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import { handleGoogleAuthSuccess } from '@/store/slices/authAPI';

const GoogleAuthSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (accessToken && refreshToken) {
      dispatch(handleGoogleAuthSuccess({ accessToken, refreshToken }))
        .unwrap()
        .then(() => {
          // Redirect to home page on success
          router.push('/');
        })
        .catch((error) => {
          console.error('Google auth error:', error);
          // Redirect to signin page on error
          router.push('/signin?error=google_auth_failed');
        });
    } else {
      // No tokens found, redirect to signin
      router.push('/signin?error=missing_tokens');
    }
  }, [searchParams, dispatch, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Completing your sign in...
        </h2>
        <p className="text-gray-600">
          Please wait while we finish setting up your account.
        </p>
      </div>
    </div>
  );
};

const GoogleAuthSuccess = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <GoogleAuthSuccessContent />
    </Suspense>
  );
};

export default GoogleAuthSuccess;