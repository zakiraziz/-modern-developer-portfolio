'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ReloadIcon, HomeIcon, MailIcon } from '@radix-ui/react-icons';
import { captureException } from '@sentry/nextjs';
import { cn } from '@/lib/utils';

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'CustomError';
    this.statusCode = statusCode;
  }
}

export function ErrorBoundary({ 
  children, 
  fallback: FallbackComponent = DefaultErrorFallback,
  onError,
  resetOnRouteChange = true,
  className 
}) {
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (resetOnRouteChange) {
      const handleRouteChange = () => setError(null);
      router.events.on('routeChangeComplete', handleRouteChange);
      return () => router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [router, resetOnRouteChange]);

  const resetError = () => {
    setError(null);
    if (typeof onError === 'function') {
      onError(null);
    }
  };

  if (error) {
    return (
      <div className={cn('min-h-[300px] flex items-center justify-center', className)}>
        <FallbackComponent 
          error={error} 
          resetError={resetError} 
          router={router}
        />
      </div>
    );
  }

  return (
    <ErrorBoundaryWrapper 
      onError={(error, errorInfo) => {
        captureException(error, { extra: errorInfo });
        setError(error);
        if (typeof onError === 'function') {
          onError(error, errorInfo);
        }
      }}
    >
      {children}
    </ErrorBoundaryWrapper>
  );
}

function ErrorBoundaryWrapper({ children, onError }) {
  useEffect(() => {
    const handleWindowError = (event) => {
      event.preventDefault();
      onError(event.error, {
        componentStack: event.error.stack,
      });
    };

    const handleRejection = (event) => {
      event.preventDefault();
      const error = event.reason || new Error('Promise rejected');
      onError(error, {
        componentStack: error.stack,
      });
    };

    window.addEventListener('error', handleWindowError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleWindowError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, [onError]);

  return children;
}

function DefaultErrorFallback({ error, resetError, router }) {
  const isDev = process.env.NODE_ENV === 'development';
  const isNotFound = error instanceof CustomError && error.statusCode === 404;

  return (
    <div className="max-w-md mx-auto text-center p-6 bg-background rounded-lg border border-border shadow-sm">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-destructive">
          {isNotFound ? 'Page Not Found' : 'Something Went Wrong'}
        </h1>
        
        {isDev && (
          <div className="text-left p-4 bg-accent/50 rounded-md text-sm">
            <p className="font-medium">{error.message}</p>
            <pre className="mt-2 overflow-x-auto text-xs">
              {error.stack}
            </pre>
          </div>
        )}

        <p className="text-foreground/80">
          {isNotFound
            ? "The page you're looking for doesn't exist."
            : "We've encountered an unexpected error. Please try again."}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button
            variant="default"
            onClick={resetError}
            className="gap-2"
          >
            <ReloadIcon className="h-4 w-4" />
            Try Again
          </Button>
          
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="gap-2"
          >
            <HomeIcon className="h-4 w-4" />
            Go Home
          </Button>

          <Button
            variant="ghost"
            onClick={() => window.location.href = `mailto:support@example.com`}
            className="gap-2"
          >
            <MailIcon className="h-4 w-4" />
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}

export function useErrorHandler() {
  const [error, setError] = useState(null);

  const handleError = (error) => {
    setError(error);
    captureException(error);
  };

  const resetError = () => setError(null);

  return { error, handleError, resetError };
}

// Usage example:
/*
function MyComponent() {
  const { error, handleError, resetError } = useErrorHandler();

  if (error) {
    return <DefaultErrorFallback error={error} resetError={resetError} />;
  }

  return (
    <ErrorBoundary 
      fallback={CustomFallback}
      onError={handleError}
      resetOnRouteChange={false}
    >
      <ComponentThatMightError />
    </ErrorBoundary>
  );
}
*/