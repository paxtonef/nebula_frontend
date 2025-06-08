'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async () => {
    setIsLoading(true);
    router.push('/api/auth/login');
  };

  const handleSignup = async () => {
    setIsLoading(true);
    // Auth0 doesn't have a separate signup endpoint, but we can pass a screen_hint
    // to show the signup form instead of the login form
    // Our mock auth implementation will handle this parameter as well
    router.push('/api/auth/login?screen_hint=signup');
  };
  
  // Check if user came here with intent to signup
  useEffect(() => {
    const intent = searchParams.get('intent');
    if (intent === 'signup' && !isLoading) {
      // Use the router directly to avoid dependency on handleSignup
      setIsLoading(true);
      router.push('/api/auth/login?screen_hint=signup');
    }
  }, [searchParams, router, isLoading]);

  // Functions are defined above

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">Nebula</h1>
          <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">MVP</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col md:flex-row">
        {/* Left Side - Hero Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
            Connect and Grow Your Business Network
          </h2>
          <p className="text-xl text-primary-700 mb-8">
            Nebula helps businesses find trusted partners, suppliers, and clients through verified connections and intelligent matching.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              onClick={handleLogin}
              disabled={isLoading}
              className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-6 text-lg rounded-full shadow-md hover:shadow-lg transition-all duration-200"
            >
              {isLoading ? 'Loading...' : 'Sign In'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleSignup}
              disabled={isLoading}
              className="border-secondary-400 text-secondary-600 hover:bg-secondary-50 px-8 py-6 text-lg rounded-full transition-all duration-200"
            >
              {isLoading ? 'Loading...' : 'Create Account'}
            </Button>
          </div>
          <p className="mt-6 text-sm text-primary-600">
            By signing up, you agree to our <Link href="/terms" className="underline hover:text-secondary-600 transition-colors">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-secondary-600 transition-colors">Privacy Policy</Link>
          </p>
        </div>

        {/* Right Side - Image or Illustration */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center p-8">
          <div className="relative w-full max-w-lg h-80 md:h-96">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary-200">
                  <span className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">N</span>
                </div>
                <h3 className="text-2xl font-semibold text-primary-800">Nebula Business Network</h3>
                <p className="mt-2 text-primary-600">Your trusted business ecosystem</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 sm:px-6 lg:px-8 bg-white border-t border-primary-100">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-primary-600">
            © {new Date().getFullYear()} Nebula Business Network. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/about" className="text-sm text-primary-600 hover:text-secondary-600 transition-colors">About</Link>
            <Link href="/contact" className="text-sm text-primary-600 hover:text-secondary-600 transition-colors">Contact</Link>
            <Link href="/help" className="text-sm text-primary-600 hover:text-secondary-600 transition-colors">Help Center</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
