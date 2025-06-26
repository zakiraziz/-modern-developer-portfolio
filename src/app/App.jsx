import { Suspense, lazy } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from 'next-themes';
import ErrorBoundary from '@/components/error/ErrorBoundary';
import LoadingFallback from '@/components/ui/LoadingFallback';
import { siteConfig } from '@/config/site';
import { inter, spaceGrotesk } from '@/config/fonts';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';

// Lazy load main components
const Header = lazy(() => import('@/components/layout/Header'));
const Footer = lazy(() => import('@/components/layout/Footer'));

// Dynamic imports for sections with fallback
const Hero = lazy(() => import('@/components/sections/Hero'));
const About = lazy(() => import('@/components/sections/About'));
const Projects = lazy(() => import('@/components/sections/Projects'));
const Contact = lazy(() => import('@/components/sections/Contact'));

export default function App() {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <>
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={siteConfig.name} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteConfig.url} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          spaceGrotesk.variable
        )}>
          <ErrorBoundary fallback={<ErrorFallback />}>
            <Suspense fallback={<LoadingFallback />}>
              <Header />
            </Suspense>

            <main className="relative overflow-hidden">
              <Suspense fallback={<LoadingFallback />}>
                {isHomePage && (
                  <>
                    <Hero />
                    <About />
                    <Projects />
                    <Contact />
                  </>
                )}
              </Suspense>
            </main>

            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </ErrorBoundary>

          <Analytics />
          <SpeedInsights />
        </div>
      </ThemeProvider>
    </>
  );
}

function ErrorFallback() {
  const router = useRouter();
  
  return (
    <div className="grid min-h-screen place-items-center bg-background p-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-destructive mb-4">
          Something went wrong
        </h1>
        <p className="text-muted-foreground mb-6">
          We're sorry for the inconvenience. Please try refreshing the page.
        </p>
        <button
          onClick={() => router.reload()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}