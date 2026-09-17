'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Role = 'customer' | 'artisan' | 'admin';
type AuthMode = 'login' | 'register';

export default function LoginPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [selectedRole, setSelectedRole] = useState<Role>('customer');
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (selectedRole === 'admin' || selectedRole === 'artisan') {
      router.push('/dashboard');
    } else {
      router.push('/products');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">AFRIVERSE</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Connecting Arusha artisans to global markets.</p>
        </div>
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button type="button" onClick={() => setAuthMode('login')} className={`w-1/2 py-3 text-center text-sm font-semibold transition-colors border-b-2 ${authMode === 'login' ? 'border-amber-600 text-amber-600 dark:text-amber-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}>
            Sign In
          </button>
          <button type="button" onClick={() => setAuthMode('register')} className={`w-1/2 py-3 text-center text-sm font-semibold transition-colors border-b-2 ${authMode === 'register' ? 'border-amber-600 text-amber-600 dark:text-amber-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}>
            Create Account
          </button>
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Select Account Type</label>
          <div className="grid grid-cols-3 gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <button type="button" onClick={() => setSelectedRole('customer')} className={`py-2 text-xs font-medium rounded-md transition-all ${selectedRole === 'customer' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'}`}>
              🛍️ Customer
            </button>
            <button type="button" onClick={() => setSelectedRole('artisan')} className={`py-2 text-xs font-medium rounded-md transition-all ${selectedRole === 'artisan' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'}`}>
              🎨 Artisan
            </button>
            <button type="button" onClick={() => setSelectedRole('admin')} className={`py-2 text-xs font-medium rounded-md transition-all ${selectedRole === 'admin' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'}`}>
              👑 Admin
            </button>
          </div>
        </div>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {error && <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">{error}</div>}
          {authMode === 'register' && (
            <>
              {selectedRole !== 'admin' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                  <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Baraka Juma" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white focus:ring-amber-500 focus:border-amber-500 text-sm" />
                </div>
              )}
              {selectedRole === 'artisan' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Shop / Workshop Name</label>
                  <input type="text" required value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Meru Wood Carvings" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white focus:ring-amber-500 focus:border-amber-500 text-sm" />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+255 754 998 882" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white focus:ring-amber-500 focus:border-amber-500 text-sm" />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@afriverse.co.tz" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white focus:ring-amber-500 focus:border-amber-500 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white focus:ring-amber-500 focus:border-amber-500 text-sm" />
          </div>
          <button type="submit" className="w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-7..." >
            {authMode === 'login' ? `Sign In as ${selectedRole.toUpperCase()}` : `Create ${selectedRole.toUpperCase()} Account`}
          </button>
        </form>
        <div className="text-center pt-2">
          <Link href="/products" className="text-xs text-amber-600 hover:text-amber-500 dark:text-amber-400">← Continue browsing as Guest</Link>
        </div>
      </div>
    </div>
  );
}
