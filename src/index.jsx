// src/app/page.jsx
import { 
  HeroSection, 
  FeaturedProjects, 
  SkillsSection,
  ExperienceSection,
  TestimonialsSection,
  ContactSection,
  BlogPreviewSection,
  AchievementsSection
} from '@/components/sections';
import { Container, ScrollToTop } from '@/components/ui';
import { siteConfig } from '@/config/site';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
};

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-20 pb-20 relative">
        {/* Hero Section with Particles Background */}
        <HeroSection 
          title={siteConfig.hero.title || siteConfig.name}
          subtitle={siteConfig.hero.subtitle}
          description={siteConfig.hero.description || siteConfig.description}
          ctaText={siteConfig.hero.primaryCta.text}
          ctaHref={siteConfig.hero.primaryCta.href}
          secondaryCtaText={siteConfig.hero.secondaryCta.text}
          secondaryCtaHref={siteConfig.hero.secondaryCta.href}
          socialLinks={siteConfig.socials}
          showParticles={true}
        />
        
        {/* Skills Section with Animated Progress Bars */}
        <Container id="skills" className="scroll-mt-24">
          <SkillsSection 
            skills={siteConfig.skills} 
            title="My Skills"
            subtitle="Technologies I work with"
            variant="progress-bars" // or "icons", "tags"
            showLevel={true}
          />
        </Container>

        {/* Featured Projects with Filtering */}
        <Container id="projects" className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 rounded-lg">
          <FeaturedProjects 
            projects={siteConfig.projects.filter(p => p.featured).slice(0, 4)}
            title="Featured Projects"
            subtitle="Some of my best work"
            viewAllHref="/projects"
            viewAllText="View All Projects"
            categories={['All', ...new Set(siteConfig.projects.map(p => p.category))]}
          />
        </Container>

        {/* Work Experience Timeline */}
        {siteConfig.experience?.length > 0 && (
          <Container id="experience" className="scroll-mt-24">
            <ExperienceSection 
              experiences={siteConfig.experience}
              title="Work Experience"
              subtitle="My professional journey"
              layout="timeline" // or "cards", "compact"
            />
          </Container>
        )}

        {/* Achievements/Certifications */}
        {siteConfig.achievements?.length > 0 && (
          <Container id="achievements">
            <AchievementsSection 
              achievements={siteConfig.achievements}
              title="Achievements & Certifications"
              subtitle="My proudest accomplishments"
            />
          </Container>
        )}

        {/* Latest Blog Posts */}
        {siteConfig.blog?.posts?.length > 0 && (
          <Container id="blog">
            <BlogPreviewSection 
              posts={siteConfig.blog.posts.slice(0, 3)}
              title="Latest Articles"
              subtitle="Thoughts on web development"
              viewAllHref="/blog"
              viewAllText="Read All Articles"
            />
          </Container>
        )}

        {/* Testimonials Carousel */}
        {siteConfig.testimonials?.length > 0 && (
          <Container id="testimonials" className="bg-gray-50 dark:bg-gray-900 py-16 rounded-lg">
            <TestimonialsSection 
              testimonials={siteConfig.testimonials}
              title="Client Testimonials"
              subtitle="What people say about my work"
              variant="carousel" // or "grid"
            />
          </Container>
        )}

        {/* Contact Section with Form */}
        <Container id="contact" className="scroll-mt-24">
          <ContactSection 
            title="Get In Touch"
            subtitle="Let's build something amazing together"
            email={siteConfig.links.email}
            socialLinks={siteConfig.links}
            showContactForm={true}
            formFields={[
              { name: 'name', type: 'text', required: true },
              { name: 'email', type: 'email', required: true },
              { name: 'message', type: 'textarea', required: true }
            ]}
          />
        </Container>

        {/* Scroll to Top Button */}
        <ScrollToTop />
      </main>

      {/* Vercel Analytics */}
      <Analytics />
      <SpeedInsights />
    </>
  );
}
