import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
import { siteConfig } from '@/config/site';

export default function Hero() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -100]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background elements */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={variants}>
            <p className="text-primary font-mono mb-4">Hi, my name is</p>
          </motion.div>

          <motion.h1 
            variants={variants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            {siteConfig.name.split(' ')[0]}.
            <br />
            <span className="text-primary">I build things for the web.</span>
          </motion.h1>

          <motion.h2 
            variants={variants}
            className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-gray-600 dark:text-gray-300 max-w-3xl"
          >
            {siteConfig.hero.subtitle}
          </motion.h2>

          <motion.p 
            variants={variants}
            className="text-lg mb-8 max-w-2xl text-gray-500 dark:text-gray-400"
          >
            {siteConfig.hero.description}
          </motion.p>

          <motion.div 
            variants={variants}
            className="flex flex-wrap gap-4"
          >
            <Button 
              href="#projects" 
              size={isDesktop ? "lg" : "default"}
              className="group"
            >
              View my work
              <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              href={siteConfig.resumeUrl}
              variant="outline"
              size={isDesktop ? "lg" : "default"}
              className="group"
              target="_blank"
            >
              Download Resume
              <FiDownload className="ml-2 transition-transform group-hover:translate-y-1" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Animated scroll indicator for desktop */}
        {isDesktop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="animate-bounce flex flex-col items-center">
              <p className="text-sm text-gray-500 mb-2">Scroll down</p>
              <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'loop',
                  }}
                  className="w-1 h-2 bg-gray-400 rounded-full mt-2"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}