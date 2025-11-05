'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../redux/userSlice';

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // 🔹 Form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // 🔹 Error and UI state
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const togglePassword = () => setPasswordVisible((prev) => !prev);

  // ✅ Validation function
  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'username':
        if (!value.trim()) return 'Username is required.';
        if (value.length < 3) return 'Username must be at least 3 characters long.';
        return '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) return 'Email is required.';
        if (!emailRegex.test(value)) return 'Enter a valid email address.';
        return '';
      case 'password':
        if (!value) return 'Password is required.';
        if (value.length < 6) return 'Password must be at least 6 characters long.';
        if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter.';
        if (!/[0-9]/.test(value)) return 'Password must contain at least one number.';
        if (!/[!@#$%^&*]/.test(value)) return 'Password must contain a special character.';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Live validation
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    // Run validation
    const newErrors = {
      username: validateField('username', formData.username),
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) {
      setMessage('Please correct the highlighted errors.');
      setLoading(false);
      return;
    }

    try {
      dispatch(loginStart());

      // 🔹 Call backend signup API
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // 🔹 Automatically log the user in
        dispatch(
          loginSuccess({
            id: data.user.id,
            name: data.user.name || formData.username,
            email: data.user.email,
            avatar: data.user.avatar || '',
          })
        );

        setMessage('Signup successful! Redirecting...');
        setFormData({ username: '', email: '', password: '' });

        // Redirect to homepage
        setTimeout(() => router.push('/'), 1200);
      } else {
        dispatch(loginFailure(data.message || 'Signup failed'));
        setMessage(data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      dispatch(loginFailure('Network error'));
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        {/* 🔹 Header */}
        <div className="flex justify-center">
          <span className="text-2xl font-bold text-slate-800">Malcom_Company</span>
        </div>

        <h1 className="text-slate-800 text-2xl font-bold text-center">
          Create Your Malcom Account
        </h1>

        {/* 🔹 Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <label className="flex flex-col">
            <p className="text-slate-800 text-sm font-medium pb-2">Username</p>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`border ${
                errors.username ? 'border-red-500' : 'border-slate-300'
              } rounded-lg p-3 h-12 focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your username"
              required
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </label>

          {/* Email */}
          <label className="flex flex-col">
            <p className="text-slate-800 text-sm font-medium pb-2">Email</p>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`border ${
                errors.email ? 'border-red-500' : 'border-slate-300'
              } rounded-lg p-3 h-12 focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </label>

          {/* Password */}
          <label className="flex flex-col">
            <p className="text-slate-800 text-sm font-medium pb-2">Password</p>
            <div className="flex">
              <input
                name="password"
                type={passwordVisible ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className={`border ${
                  errors.password ? 'border-red-500' : 'border-slate-300'
                } rounded-l-lg p-3 h-12 w-full focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="border border-slate-300 bg-white px-3 rounded-r-lg hover:bg-slate-50"
              >
                <span className="material-symbols-outlined text-base">
                  {passwordVisible ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg h-12 text-white font-semibold ${
              loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p
            className={`text-center text-sm font-medium ${
              message.toLowerCase().includes('success')
                ? 'text-green-600'
                : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}

        {/* Already have account */}
        <p className="text-center text-sm text-slate-500 mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
