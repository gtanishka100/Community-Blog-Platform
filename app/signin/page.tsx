'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/ui/password_input';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { loginUser, clearError } from '@/store/slices/authSlice';

const Signin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    try {
      const result = await dispatch(loginUser(formData)).unwrap();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center flex flex-col items-center justify-center">
            <div className="mb-2">
              <Image
                src="./Images/googleimg.png"
                alt="Google"
                width={150}
                height={60}
                className="w-[150px] h-auto object-contain"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back
            </h2>
            <h3 className="text-lg text-gray-600 mb-6">
              Sign in to your account
            </h3>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1"
                placeholder="Email"
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <PasswordInput
                id="password"
                name="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1"
                placeholder="Password"
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center justify-between">
              <Link href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign in'
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-4 rounded-full text-lg flex items-center justify-center space-x-3"
              disabled={isLoading}
            >
              <Image
                src="https://www.google.com/images/branding/googleg/2x/googleg_standard_color_18dp.png"
                alt="Google"
                width={18}
                height={18}
                className="w-5 h-5"
              />
              <span>Continue with Google</span>
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              New to GDG Community?{' '}
              <Link href="/signup" className="text-blue-600 hover:underline font-semibold">
                Join now
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 items-center justify-center p-12">
        <div className="max-w-md">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-full h-64 bg-gradient-to-br from-green-200 via-blue-200 to-purple-200 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Image
                      src="https://www.google.com/images/branding/googleg/2x/googleg_standard_color_18dp.png"
                      alt="Google"
                      width={18}
                      height={18}
                      className="w-5 h-5"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Welcome Back
                </h3>
                <p className="text-sm text-gray-600">
                  Continue your journey with the GDG Community
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;