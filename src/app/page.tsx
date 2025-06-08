import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-700">Nebula</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="btn-outline">
              Log In
            </Link>
            <Link href="/login?intent=signup" className="btn-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Business Networking for European SMEs</h1>
              <p className="text-xl mb-8">Connect, collaborate, and grow with other European small and medium enterprises. Build trusted relationships and expand your business network.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login" className="btn-secondary px-8 py-3 text-center">
                  Get Started
                </Link>
                <Link href="#features" className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-3 rounded-md font-medium text-center">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative h-96 w-full">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg shadow-xl flex items-center justify-center">
                  <div className="p-8 text-center">
                    <p className="text-lg font-medium mb-4">Network Visualization Placeholder</p>
                    <p>Interactive business connections map will appear here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
            <p className="mt-4 text-xl text-gray-600">Everything you need to build your business network</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Verified Business Profiles',
                description: 'Create and maintain a verified business profile to showcase your company to potential partners.',
                icon: '🏢',
              },
              {
                title: 'Trust Scoring System',
                description: 'Our proprietary trust scoring helps you identify reliable business partners quickly.',
                icon: '🔒',
              },
              {
                title: 'Smart Matching',
                description: 'Find the perfect business connections with our AI-powered matching algorithm.',
                icon: '🔍',
              },
              {
                title: 'Secure Introductions',
                description: 'Request and facilitate introductions to potential partners through mutual connections.',
                icon: '🤝',
              },
              {
                title: 'Business Reviews',
                description: 'Build credibility with verified reviews from your business partners and customers.',
                icon: '⭐',
              },
              {
                title: 'GDPR Compliant',
                description: 'Your data is secure and handled in compliance with European data protection regulations.',
                icon: '🔐',
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-xl text-gray-600">Choose the plan that works for your business</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: '€0',
                period: 'Free forever',
                features: [
                  'Basic business profile',
                  'Up to 10 connections',
                  'Limited search functionality',
                  'Community support',
                ],
                cta: 'Get Started',
                highlighted: false,
              },
              {
                name: 'Professional',
                price: '€49',
                period: 'per month',
                features: [
                  'Enhanced business profile',
                  'Unlimited connections',
                  'Advanced search & filters',
                  'Introduction requests',
                  'Priority support',
                ],
                cta: 'Try Free for 14 Days',
                highlighted: true,
              },
              {
                name: 'Enterprise',
                price: '€199',
                period: 'per month',
                features: [
                  'Multiple user accounts',
                  'Advanced analytics',
                  'API access',
                  'Dedicated account manager',
                  'Custom integrations',
                  'SLA guarantees',
                ],
                cta: 'Contact Sales',
                highlighted: false,
              },
            ].map((plan, index) => (
              <div 
                key={index} 
                className={`rounded-lg shadow-md p-8 ${
                  plan.highlighted 
                    ? 'bg-primary-50 border-2 border-primary-500 relative' 
                    : 'bg-white'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/api/auth/login" 
                  className={`block text-center py-2 px-4 rounded-md font-medium ${
                    plan.highlighted 
                      ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                      : 'bg-gray-800 hover:bg-gray-900 text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Nebula</h3>
              <p className="text-gray-400">Business networking platform for European SMEs.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-gray-400 hover:text-white">Features</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">GDPR</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© {new Date().getFullYear()} Nebula. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
