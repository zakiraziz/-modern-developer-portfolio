// src/app/about/page.jsx
import { 
  AboutSection, 
  ExperienceTimeline,
  SkillsSection,
  EducationTimeline,
  TestimonialsSection
} from '@/components/sections';
import { Container } from '@/components/ui';
import { siteConfig } from '@/config/site';

export default function About() {
  return (
    <article className="space-y-20 pb-10">
      <Container>
        <AboutSection 
          title="About Me"
          subtitle="Get to know me better"
          bio={siteConfig.metadata.bio || `
            I'm a ${siteConfig.metadata.role} with ${siteConfig.resume.yearsOfExperience}+ years of experience 
            building modern web applications. My expertise includes ${siteConfig.resume.skills
              .filter(skill => skill.featured)
              .slice(0, 5)
              .map(skill => skill.name)
              .join(', ')}.
          `}
          image={siteConfig.metadata.aboutImage}
          stats={[
            { value: `${siteConfig.resume.yearsOfExperience}+`, label: 'Years Experience' },
            { value: `${siteConfig.projects.length}+`, label: 'Projects Completed' },
            { value: '100%', label: 'Client Satisfaction' }
          ]}
        />
      </Container>

      <Container className="bg-gray-50 dark:bg-gray-900 py-16 rounded-lg">
        <SkillsSection 
          skills={siteConfig.resume.skills}
          title="My Skills"
          subtitle="Technologies I've mastered"
          columns={3}
          showIcons
        />
      </Container>

      <Container id="experience">
        <ExperienceTimeline 
          experiences={siteConfig.resume.experience} 
          title="Work Experience"
          subtitle="My professional journey"
        />
      </Container>

      <Container id="education">
        <EducationTimeline
          education={siteConfig.resume.education || [
            {
              institution: "Stanford University",
              degree: "Computer Science Degree",
              year: "2018",
              description: "Specialized in Web Technologies and Human-Computer Interaction"
            }
          ]}
          title="Education"
          subtitle="My learning path"
        />
      </Container>

      {siteConfig.testimonials?.length > 0 && (
        <Container id="testimonials">
          <TestimonialsSection 
            testimonials={siteConfig.testimonials}
            title="What People Say"
            subtitle="Client and colleague testimonials"
          />
        </Container>
      )}

      <Container id="hobbies">
        <section>
          <h2 className="text-3xl font-bold mb-6">When I'm Not Coding</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Photography", description: "Capturing moments and landscapes" },
              { title: "Hiking", description: "Exploring nature trails" },
              { title: "Reading", description: "Mostly sci-fi and tech books" },
              { title: "Chess", description: "Strategic thinking exercises" }
            ].map((hobby, index) => (
              <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{hobby.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{hobby.description}</p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </article>
  );
}