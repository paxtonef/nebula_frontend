declare module 'next/link' {
  import { ComponentProps, ReactElement } from 'react';
  
  export interface LinkProps extends ComponentProps<'a'> {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
  }
  
  export default function Link(props: LinkProps): ReactElement;
}

declare module 'next/navigation' {
  export function useRouter(): {
    push: (url: string, options?: { shallow?: boolean }) => void;
    replace: (url: string, options?: { shallow?: boolean }) => void;
    back: () => void;
    prefetch: (url: string) => void;
  };
  
  export function usePathname(): string;
  
  export function useSearchParams(): URLSearchParams;
  
  export function redirect(url: string): never;
}
