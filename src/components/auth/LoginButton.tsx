import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface LoginButtonProps {
  className?: string;
  variant?: 'primary' | 'outline' | 'link';
  label?: string;
}

export default function LoginButton({ 
  className = '', 
  variant = 'primary',
  label = 'Log In'
}: LoginButtonProps) {
  const router = useRouter();
  
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors";
  const variantStyles = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md",
    outline: "border border-gray-300 hover:bg-gray-100 text-gray-800 py-2 px-4 rounded-md",
    link: "text-primary-600 hover:text-primary-800 underline"
  };
  
  const buttonStyle = `${baseStyles} ${variantStyles[variant]} ${className}`;
  
  return (
    <Link href="/api/auth/login" className={buttonStyle}>
      {label}
    </Link>
  );
}
