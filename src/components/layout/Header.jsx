'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { ThemeToggle } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      scrolled ? "bg-background/90 shadow-sm" : "bg-background/80",
      isOpen ? "bg-background" : ""
    )}>
      <div className="container flex items-center justify-between py-4">
        <Link 
          href="/" 
          className="text-xl font-bold flex items-center gap-2"
          onClick={() => setIsOpen(false)}
        >
          {siteConfig.metadata.logo && (
            <img 
              src={siteConfig.metadata.logo} 
              alt={siteConfig.metadata.name} 
              className="h-8 w-8 rounded-full"
            />
          )}
          <span>{siteConfig.metadata.name}</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href ? "text-primary" : "text-foreground/80 hover:text-foreground"
              )}
            >
              {item.href === pathname && (
                <motion.span
                  layoutId="activeNavItem"
                  className="absolute inset-0 bg-primary/10 rounded-md"
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                />
              )}
              {item.name}
            </Link>
          ))}
          <div className="ml-4 flex items-center gap-2">
            <ThemeToggle />
            {siteConfig.metadata.resumeUrl && (
              <Button asChild variant="outline" size="sm">
                <Link href={siteConfig.metadata.resumeUrl} target="_blank">
                  Resume
                </Link>
              </Button>
            )}
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 top-16 bg-background z-40 overflow-y-auto"
            >
              <div className="container py-6">
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "px-4 py-3 text-lg font-medium rounded-lg transition-colors",
                        pathname === item.href 
                          ? "bg-primary/10 text-primary" 
                          : "text-foreground/80 hover:bg-accent"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-border flex flex-col gap-4">
                    <ThemeToggle className="w-full justify-start px-4 py-3" />
                    {siteConfig.metadata.resumeUrl && (
                      <Button asChild variant="outline" className="w-full">
                        <Link 
                          href={siteConfig.metadata.resumeUrl} 
                          target="_blank"
                          onClick={() => setIsOpen(false)}
                        >
                          Download Resume
                        </Link>
                      </Button>
                    )}
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}