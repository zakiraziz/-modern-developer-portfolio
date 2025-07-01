import { siteConfig } from '@/config/site';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

type SocialIconsProps = {
  size?: 'sm' | 'default' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'secondary' | 'minimal' | 'ghost';
  className?: string;
  iconClassName?: string;
  containerClassName?: string;
  showLabels?: boolean;
  direction?: 'horizontal' | 'vertical';
  animationType?: 'scale' | 'rotate' | 'none';
} & ComponentProps<'div'>;

const SocialIcons = ({ 
  size = 'default',
  variant = 'default',
  className,
  iconClassName,
  containerClassName,
  showLabels = false,
  direction = 'horizontal',
  animationType = 'scale',
  ...props
}: SocialIconsProps) => {
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
    minimal: 'text-foreground hover:text-primary',
    ghost: 'text-foreground hover:bg-accent/50'
  };

  const animations = {
    scale: {
      whileHover: { scale: 1.1 },
      whileTap: { scale: 0.95 }
    },
    rotate: {
      whileHover: { rotate: 15, scale: 1.1 },
      whileTap: { rotate: 0, scale: 0.95 }
    },
    none: {
      whileHover: {},
      whileTap: {}
    }
  };

  return (
    <div 
      className={cn(
        "flex",
        direction === 'horizontal' ? 'flex-row gap-4' : 'flex-col gap-3',
        containerClassName
      )}
      {...props}
    >
      {Object.values(siteConfig.socials).map((social) => (
        <Tooltip key={social.label} delayDuration={100}>
          <TooltipTrigger asChild>
            <motion.div
              className="inline-flex"
              {...animations[animationType]}
            >
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={cn(
                  "transition-colors rounded-full p-2 flex items-center gap-2",
                  variants[variant],
                  className
                )}
              >
                <social.icon className={cn(sizes[size], iconClassName)} />
                {showLabels && (
                  <span className="text-sm font-medium">{social.label}</span>
                )}
              </a>
            </motion.div>
          </TooltipTrigger>
          {!showLabels && (
            <TooltipContent side={direction === 'vertical' ? 'right' : 'bottom'}>
              {social.label}
            </TooltipContent>
          )}
        </Tooltip>
      ))}
    </div>
  );
};

// Variant for footer with subtle animation
const FooterSocialIcons = ({ className }: { className?: string }) => (
  <SocialIcons 
    variant="minimal"
    className={cn("justify-center md:justify-start", className)}
    size="lg"
    animationType="rotate"
  />
);

// Compact variant for headers
const CompactSocialIcons = ({ className }: { className?: string }) => (
  <SocialIcons 
    variant="secondary" 
    size="sm"
    className={cn("gap-2", className)}
    animationType="none"
  />
);

// Vertical variant for sidebars
const VerticalSocialIcons = ({ className }: { className?: string }) => (
  <SocialIcons
    direction="vertical"
    variant="ghost"
    className={className}
    size="default"
  />
);

// With labels variant for sections where you want text
const LabeledSocialIcons = ({ className }: { className?: string }) => (
  <SocialIcons
    showLabels
    variant="default"
    className={cn("gap-3", className)}
    size="default"
    animationType="none"
  />
);

export { 
  SocialIcons, 
  FooterSocialIcons, 
  CompactSocialIcons,
  VerticalSocialIcons,
  LabeledSocialIcons
};
