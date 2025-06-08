import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names using clsx and optimizes them with tailwind-merge
 * This helps avoid conflicts when using Tailwind CSS utility classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
