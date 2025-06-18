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
import { signupUser } from '@/store/slices/authAPI';
import { clearError } from '@/store/slices/authSlice';

const Signup = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });


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

  const validateForm = () => {
    const errors = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };

    let isValid = true;


    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
      isValid = false;
    } else if (formData.firstName.trim().length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
      isValid = false;
    } else if (formData.lastName.trim().length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-z]).{6,}$/;

    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
      errors.password = 'Password must be at least 6 characters, include one uppercase letter, one number, and one special character';
      isValid = false;
    }
    

    setFormErrors(errors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });


    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }

    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const result = await dispatch(signupUser({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password
      }));

      if (signupUser.fulfilled.match(result)) {

        console.log('Signup successful:', result.payload);
      }
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

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
                className="h-[60px] w-auto object-contain"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 mt-2">
              Welcome to your
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">
              professional community
            </h3>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  First name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`mt-1 ${formErrors.firstName ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="First name"
                  disabled={isLoading}
                />
                {formErrors.firstName && (
                  <p className="mt-1 text-xs text-red-600">{formErrors.firstName}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Last name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`mt-1 ${formErrors.lastName ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="Last name"
                  disabled={isLoading}
                />
                {formErrors.lastName && (
                  <p className="mt-1 text-xs text-red-600">{formErrors.lastName}</p>
                )}
              </div>
            </div>

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
                className={`mt-1 ${formErrors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                placeholder="Email"
                disabled={isLoading}
              />
              {formErrors.email && (
                <p className="mt-1 text-xs text-red-600">{formErrors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password (6+ characters)
              </Label>
              <PasswordInput
                id="password"
                name="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleInputChange}
                className={`mt-1 ${formErrors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                placeholder="Password"
                disabled={isLoading}
              />
              {formErrors.password && (
                <p className="mt-1 text-xs text-red-600">{formErrors.password}</p>
              )}
            </div>

            <div className="text-xs text-gray-600 leading-relaxed">
              By clicking Continue to join or sign in, you agree to GDG Community's{' '}
              <Link href="#" className="text-blue-600 hover:underline">
                User Agreement
              </Link>
              ,{' '}
              <Link href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
              , and{' '}
              <Link href="#" className="text-blue-600 hover:underline">
                Cookie Policy
              </Link>
              .
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-full text-lg flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                'Continue'
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
              disabled={isLoading}
              className="w-full border-2 border-gray-300 hover:border-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed text-gray-700 font-semibold py-3 px-4 rounded-full text-lg flex items-center justify-center space-x-3"
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
              Already on GDG Community?{' '}
              <Link href="/signin" className="text-blue-600 hover:underline font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 items-center justify-center p-12">
        <div className="max-w-md">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-full h-64 bg-gradient-to-br from-orange-200 via-pink-200 to-purple-200 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
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
                  Join the GDG Community
                </h3>
                <p className="text-sm text-gray-600">
                  Connect with developers, share knowledge, and grow together
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;