import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

export default function LoadingFallback() {
  const loadingVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    },
    exit: { opacity: 0 }
  };

  const dotVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center",
        "bg-background/80 backdrop-blur-sm"
      )}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={loadingVariants}
    >
      {/* Animated Logo/Brand */}
      <motion.div
        className="mb-8 flex flex-col items-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <div className="h-10 w-10 rounded-full bg-primary/20 animate-pulse" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          {siteConfig.name}
        </h2>
      </motion.div>

      {/* Animated Dots */}
      <div className="flex items-center justify-center space-x-2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="h-4 w-4 rounded-full bg-primary"
            variants={dotVariants}
            animate="animate"
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="mt-8 w-full max-w-xs">
        <div className="relative h-1 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="absolute left-0 top-0 h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </div>
      </div>

      {/* Optional Status Text */}
      <motion.p
        className="mt-4 text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Loading your experience...
      </motion.p>
    </motion.div>
  );
}