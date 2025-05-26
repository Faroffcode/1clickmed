import React, { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { UserSubView } from '../../types';
import { useAuth } from '../../hooks/useAuth';

interface SignUpPageProps {
  onNavigate: (view: UserSubView) => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await signUp(email, password);
      onNavigate('home');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-4xl font-extrabold text-sky-400">
          Create Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-300">
          Join us and find the best healthcare providers
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-800 py-8 px-6 shadow-xl rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-900/50 text-red-200 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
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
              disabled={isLoading}
            />

            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••• (min. 8 characters)"
              disabled={isLoading}
            />

            <Input
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
            />

            <div>
              <Button 
                type="submit" 
                fullWidth 
                variant="primary" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
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
                Already have an account?{' '}
                <button
                  onClick={() => onNavigate('login')}
                  className="font-medium text-sky-500 hover:text-sky-400 focus:outline-none underline"
                >
                  Sign in here
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

export default SignUpPage;