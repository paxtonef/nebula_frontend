declare module '@auth0/nextjs-auth0/client' {
  export interface UserProfile {
    email?: string;
    email_verified?: boolean;
    name?: string;
    nickname?: string;
    picture?: string;
    sub?: string;
    updated_at?: string;
    [key: string]: any;
  }

  export interface UserContext {
    user?: UserProfile;
    error?: Error;
    isLoading: boolean;
  }

  export function useUser(): UserContext;
  export function withPageAuthRequired<P extends {}>(
    Component: React.ComponentType<P>,
    options?: WithPageAuthRequiredOptions
  ): React.ComponentType<P>;

  export interface WithPageAuthRequiredOptions {
    returnTo?: string;
    onRedirecting?: () => React.ReactElement;
    onError?: (error: Error) => React.ReactElement;
  }
  
  export interface UserProviderProps {
    children: React.ReactNode;
  }
  
  export function UserProvider(props: UserProviderProps): React.ReactElement;
}
