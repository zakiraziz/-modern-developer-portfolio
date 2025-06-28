// src/app/about/page.jsx
import { 
  AboutSection, 
  ExperienceTimeline,
  SkillsSection,
  EducationTimeline,
  TestimonialsSection,
  CodingActivity,
  TechStackCarousel
} from '@/components/sections';
import { Container, SectionHeader } from '@/components/ui';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { FiDownload } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

export default function About() {
  const hobbies = [
    { 
      title: "Photography", 
      description: "Capturing moments and landscapes",
      icon: "📷"
    },
    { 
      title: "Hiking", 
      description: "Exploring nature trails",
      icon: "🥾"
    },
    { 
      title: "Reading", 
      description: "Mostly sci-fi and tech books",
      icon: "📚"
    },
    { 
      title: "Chess", 
      description: "Strategic thinking exercises",
      icon: "♟️"
    }
  ];

  return (
    <article className="space-y-20 pb-20">
      {/* Hero About Section */}
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
        </motion.div>
        
        <div className="mt-8 flex gap-4">
          <Button asChild>
            <a href={siteConfig.resume.downloadUrl} download>
              <FiDownload className="mr-2" />
              Download Resume
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#contact">
              Contact Me
            </a>
          </Button>
        </div>
      </Container>

      {/* Tech Stack Carousel */}
      <Container className="overflow-hidden">
        <SectionHeader
          title="My Tech Stack"
          subtitle="Tools I use daily"
          centered
        />
        <TechStackCarousel 
          items={siteConfig.resume.skills
            .filter(skill => skill.featured)
            .map(skill => ({
              name: skill.name,
              icon: skill.icon,
              category: skill.category
            }))}
        />
      </Container>

      {/* Skills Section */}
      <Container className="bg-muted/50 py-16 rounded-lg">
        <SkillsSection 
          skills={siteConfig.resume.skills}
          title="My Skills"
          subtitle="Technologies I've mastered"
          columns={3}
          showIcons
          showCategories
        />
      </Container>

      {/* Experience Timeline */}
      <Container id="experience">
        <ExperienceTimeline 
          experiences={siteConfig.resume.experience} 
          title="Work Experience"
          subtitle="My professional journey"
        />
      </Container>

      {/* Education Timeline */}
      <Container id="education">
        <EducationTimeline
          education={siteConfig.resume.education || [
            {
              institution: "Stanford University",
              degree: "Computer Science Degree",
              year: "2018",
              description: "Specialized in Web Technologies and Human-Computer Interaction",
              courses: ["Advanced Web Development", "Machine Learning", "UX Design"]
            }
          ]}
          title="Education"
          subtitle="My learning path"
        />
      </Container>

      {/* Coding Activity */}
      {siteConfig.codingActivity && (
        <Container id="coding-activity">
          <CodingActivity 
            data={siteConfig.codingActivity}
            title="My Coding Activity"
            subtitle="Recent contributions and workflow"
          />
        </Container>
      )}

      {/* Testimonials */}
      {siteConfig.testimonials?.length > 0 && (
        <Container id="testimonials" className="bg-muted/50 py-16 rounded-lg">
          <TestimonialsSection 
            testimonials={siteConfig.testimonials}
            title="What People Say"
            subtitle="Client and colleague testimonials"
          />
        </Container>
      )}

      {/* Hobbies & Interests */}
      <Container id="hobbies">
        <SectionHeader
          title="When I'm Not Coding"
          subtitle="My passions outside of work"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hobbies.map((hobby, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              className="p-6 bg-background rounded-lg border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-3">{hobby.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{hobby.title}</h3>
              <p className="text-muted-foreground">{hobby.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Certifications */}
      {siteConfig.resume.certifications?.length > 0 && (
        <Container id="certifications">
          <SectionHeader
            title="Certifications"
            subtitle="My professional accreditations"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {siteConfig.resume.certifications.map((cert, index) => (
              <div key={index} className="p-6 bg-background rounded-lg border shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{cert.name}</h3>
                    <p className="text-muted-foreground mb-3">{cert.issuer} • {cert.date}</p>
                    {cert.credentialId && (
                      <Badge variant="secondary" className="mb-3">
                        Credential ID: {cert.credentialId}
                      </Badge>
                    )}
                  </div>
                  {cert.logo && (
                    <img 
                      src={cert.logo} 
                      alt={`${cert.issuer} logo`} 
                      className="h-12 w-12 object-contain"
                    />
                  )}
                </div>
                {cert.url && (
                  <Button variant="link" size="sm" asChild className="px-0">
                    <a href={cert.url} target="_blank" rel="noopener noreferrer">
                      View Credential
                    </a>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Container>
      )}
    </article>
  );
}
