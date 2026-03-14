import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Shield, User, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'user' | 'pro' | 'admin'>('user');
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-emerald-100 selection:text-emerald-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-6 justify-center">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
            <Heart className="text-white fill-current" size={24} />
          </div>
          <span className="font-bold text-2xl text-gray-900 tracking-tight">WellConnect</span>
        </Link>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
          Welcome to your safe space
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in or create an account to continue.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100">
          
          {/* Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
            <button
              onClick={() => setActiveTab('user')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'user' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Member
            </button>
            <button
              onClick={() => setActiveTab('pro')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'pro' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Therapist
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'admin' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Admin
            </button>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'user' && (
              <div className="space-y-6">
                <button className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Continue with Google
                </button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                  </div>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email address</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input type="email" className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-xl p-3 border" placeholder="you@example.com" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input type="password" className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-xl p-3 border" placeholder="••••••••" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input id="remember-me" type="checkbox" className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded" />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                    </div>
                    <div className="text-sm">
                      <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">Forgot password?</a>
                    </div>
                  </div>

                  <Link to="/intake" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors">
                    Sign in
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </form>
              </div>
            )}

            {activeTab === 'pro' && (
              <div className="space-y-6">
                <div className="rounded-md bg-blue-50 p-4 border border-blue-100">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <User className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Therapist Portal</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>Sign in with your provisioned professional credentials.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Professional Email</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input type="email" className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-xl p-3 border" placeholder="dr.smith@wellconnect.rw" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input type="password" className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-xl p-3 border" placeholder="••••••••" />
                    </div>
                  </div>

                  <Link to="/dashboard" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                    Sign in to Portal
                  </Link>
                </form>
              </div>
            )}

            {activeTab === 'admin' && (
              <div className="space-y-6">
                <div className="rounded-md bg-purple-50 p-4 border border-purple-100">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Shield className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-purple-800">Admin Portal</h3>
                      <div className="mt-2 text-sm text-purple-700">
                        <p>Authorized access only. Actions are logged.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Admin ID</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Shield className="h-5 w-5 text-gray-400" />
                      </div>
                      <input type="text" className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-xl p-3 border" placeholder="admin.username" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Master Password</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input type="password" className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-xl p-3 border" placeholder="••••••••" />
                    </div>
                  </div>

                  <Link to="/admin" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors">
                    Access System
                  </Link>
                </form>
              </div>
            )}
          </motion.div>
        </div>
        
        {activeTab === 'user' && (
          <p className="mt-6 text-center text-sm text-gray-600">
            By signing in, you agree to our{' '}
            <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">Privacy Policy</a>.
          </p>
        )}
      </div>
    </div>
  );
}