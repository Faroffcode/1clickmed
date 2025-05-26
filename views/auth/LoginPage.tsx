import React, { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { UserSubView } from '../../types';

interface LoginPageProps {
  onNavigate: (view: UserSubView) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    console.log('Attempting login with:', { email, password });
    alert('Login functionality is not yet implemented. Redirecting to home.');
    onNavigate('home'); 
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-4xl font-extrabold text-sky-400">
          Welcome Back!
        </h2>
        <p className="mt-2 text-center text-sm text-slate-300">
          Sign in to access your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-800 py-8 px-6 shadow-xl rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />

            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" onClick={(e) => {e.preventDefault(); alert("Forgot password not implemented.")}} className="font-medium text-sky-500 hover:text-sky-400">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button type="submit" fullWidth variant="primary" size="lg">
                Sign In
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-800 text-slate-400">Or</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-300">
                Don't have an account?{' '}
                <button
                  onClick={() => onNavigate('signup')}
                  className="font-medium text-sky-500 hover:text-sky-400 focus:outline-none underline"
                >
                  Sign up here
                </button>
              </p>
            </div>
             <div className="mt-8 text-center">
                <Button variant="link" onClick={() => onNavigate('home')}>
                    <i className="fas fa-arrow-left mr-2"></i> Back to Home
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;