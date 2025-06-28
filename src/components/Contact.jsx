import { siteConfig } from '@/config/site';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const SocialIcons = ({ 
  size = 'default',
  variant = 'default',
  className 
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    default: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-7 w-7'
  };

  const variants = {
    default: 'text-muted-foreground hover:text-primary',
    primary: 'text-primary hover:text-primary/80',
    secondary: 'text-secondary hover:text-secondary/80',
    minimal: 'text-foreground hover:text-primary'
  };

  return (
    <div className={cn("flex gap-4", className)}>
      {Object.values(siteConfig.socials).map((social) => (
        <Tooltip key={social.label}>
          <TooltipTrigger asChild>
            <motion.a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={cn(
                "transition-colors rounded-full p-2 hover:bg-accent",
                variants[variant]
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className={sizes[size]} />
            </motion.a>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {social.label}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

// Variant for footer with subtle animation
const FooterSocialIcons = () => (
  <SocialIcons 
    variant="minimal"
    className="justify-center md:justify-start"
    size="lg"
  />
);

// Compact variant for headers
const CompactSocialIcons = () => (
  <SocialIcons 
    variant="secondary" 
    size="sm"
    className="gap-2"
  />
);

export { SocialIcons, FooterSocialIcons, CompactSocialIcons };
