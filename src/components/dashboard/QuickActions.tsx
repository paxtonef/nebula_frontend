'use client';

import Link from 'next/link';
import { Search, UserPlus, MessageSquare, Building, Settings } from 'lucide-react';

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  color: string;
}

function QuickAction({ icon, label, href, color }: QuickActionProps) {
  return (
    <Link 
      href={href}
      className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-md ${color} transition-all duration-200 hover:scale-105 hover:shadow-lg`}
    >
      <div className="text-white mb-2">
        {icon}
      </div>
      <span className="text-white text-sm font-medium">{label}</span>
    </Link>
  );
}

export default function QuickActions() {
  const actions = [
    {
      icon: <Search size={24} />,
      label: 'Find Businesses',
      href: '/businesses',
      color: 'bg-gradient-to-br from-primary-500 to-primary-600',
    },
    {
      icon: <UserPlus size={24} />,
      label: 'Connections',
      href: '/connections',
      color: 'bg-gradient-to-br from-secondary-500 to-secondary-600',
    },
    {
      icon: <MessageSquare size={24} />,
      label: 'Messages',
      href: '/messages',
      color: 'bg-gradient-to-br from-accent-500 to-accent-600',
    },
    {
      icon: <Building size={24} />,
      label: 'My Business',
      href: '/profile',
      color: 'bg-gradient-to-br from-primary-600 to-secondary-600',
    },
    {
      icon: <Settings size={24} />,
      label: 'Settings',
      href: '/settings',
      color: 'bg-gray-600',
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
      {actions.map((action) => (
        <QuickAction
          key={action.label}
          icon={action.icon}
          label={action.label}
          href={action.href}
          color={action.color}
        />
      ))}
    </div>
  );
}
