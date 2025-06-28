import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  FiGithub, 
  FiLinkedin, 
  FiMail, 
  FiMenu, 
  FiX,
  FiSun,
  FiMoon,
  FiExternalLink
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { siteConfig } from '@/config/site';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function Header() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollDirection = useScrollDirection();
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  // Close mobile menu when clicking outside
  useOnClickOutside(navRef, () => setIsOpen(false));

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
    { 
      name: 'Blog', 
      href: siteConfig.links.blog,
      external: true
    },
  ];

  const socialLinks = [
    {
      icon: <FiGithub className="h-5 w-5" />,
      href: siteConfig.links.github,
      label: 'GitHub',
    },
    {
      icon: <FiLinkedin className="h-5 w-5" />,
      href: siteConfig.links.linkedin,
      label: 'LinkedIn',
    },
    {
      icon: <FiMail className="h-5 w-5" />,
      href: `mailto:${siteConfig.links.email}`,
      label: 'Email',
    },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header
      className={cn(
        'fixed w-full z-50 transition-all duration-300 border-b',
        scrolled 
          ? 'bg-background/90 backdrop-blur-sm border-border/10' 
          : 'bg-background/80 border-transparent',
        scrollDirection === 'down' && !isOpen ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link 
          href="/" 
          className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
          aria-label="Home"
          onClick={() => setIsOpen(false)}
        >
          {siteConfig.name}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" ref={navRef}>
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.name}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1',
                      router.asPath.includes(item.href) ? 'text-primary' : 'text-foreground/80'
                    )}
                  >
                    {item.name}
                    <FiExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-primary',
                      router.asPath.includes(item.href) ? 'text-primary' : 'text-foreground/80'
                    )}
                    scroll={false}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 ml-6 pl-6 border-l border-border">
            {socialLinks.map((link) => (
              <Tooltip key={link.label}>
                <TooltipTrigger asChild>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-accent"
                  >
                    {link.icon}
                  </a>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  {link.label}
                </TooltipContent>
              </Tooltip>
            ))}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="text-muted-foreground hover:text-primary"
                >
                  {mounted ? (
                    theme === 'dark' ? (
                      <FiSun className="h-5 w-5" />
                    ) : (
                      <FiMoon className="h-5 w-5" />
                    )
                  ) : (
                    <FiSun className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Toggle theme
              </TooltipContent>
            </Tooltip>
          </div>
        </nav>

        {/* Mobile Navigation Button */}
        <div className="md:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="text-muted-foreground hover:text-primary"
          >
            {mounted ? (
              theme === 'dark' ? (
                <FiSun className="h-5 w-5" />
              ) : (
                <FiMoon className="h-5 w-5" />
              )
            ) : (
              <FiSun className="h-5 w-5" />
            )}
          </Button>

          <button
            className="p-2 rounded-md text-muted-foreground hover:text-primary focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-6 py-4">
              <ul className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <motion.li 
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'flex items-center gap-2 py-3 px-4 rounded-lg text-lg font-medium transition-colors hover:text-primary hover:bg-accent',
                          router.asPath.includes(item.href) ? 'text-primary' : 'text-foreground/80'
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                        <FiExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          'block py-3 px-4 rounded-lg text-lg font-medium transition-colors hover:text-primary hover:bg-accent',
                          router.asPath.includes(item.href) ? 'text-primary' : 'text-foreground/80'
                        )}
                        onClick={() => setIsOpen(false)}
                        scroll={false}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>

              <div className="flex gap-4 mt-6 pt-6 border-t border-border justify-center">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="text-muted-foreground hover:text-primary transition-colors p-3 rounded-full hover:bg-accent"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
