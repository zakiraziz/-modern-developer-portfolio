// src/app/page.jsx
import { 
  HeroSection, 
  FeaturedProjects, 
  SkillsSection,
  ExperienceSection,
  TestimonialsSection,
  ContactSection
} from '@/components/sections';
import { Container } from '@/components/ui';
import { siteConfig } from '@/config/site';

export default function Home() {
  return (
    <main className="flex flex-col gap-20 pb-20">
      <HeroSection 
        title={siteConfig.metadata.title}
        description={siteConfig.metadata.description}
        ctaText="View My Work"
        ctaHref="#projects"
        secondaryCtaText="Contact Me"
        secondaryCtaHref="#contact"
      />
      
      <Container id="skills">
        <SkillsSection 
          skills={siteConfig.resume.skills} 
          title="My Skills"
          subtitle="Technologies I work with"
        />
      </Container>

      <Container id="projects" className="bg-gray-50 dark:bg-gray-900 py-16 rounded-lg">
        <FeaturedProjects 
          projects={siteConfig.projects.slice(0, 3)} 
          title="Featured Projects"
          subtitle="Some of my best work"
          viewAllHref="/projects"
          viewAllText="View All Projects"
        />
      </Container>

      {siteConfig.resume.experience.length > 0 && (
        <Container id="experience">
          <ExperienceSection 
            experiences={siteConfig.resume.experience}
            title="Work Experience"
            subtitle="My professional journey"
          />
        </Container>
      )}

      {siteConfig.testimonials.length > 0 && (
        <Container id="testimonials">
          <TestimonialsSection 
            testimonials={siteConfig.testimonials}
            title="Client Testimonials"
            subtitle="What people say about my work"
          />
        </Container>
      )}

      <Container id="contact">
        <ContactSection 
          title="Get In Touch"
          subtitle="Let's build something amazing together"
          email={siteConfig.contact.email}
          socialLinks={siteConfig.socialLinks}
        />
      </Container>
    </main>
  );
}