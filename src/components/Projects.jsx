import { siteConfig } from '@/config/site';

const Projects = () => (
  <section>
    <h2>Featured Projects</h2>
    <div className="grid gap-8">
      {siteConfig.projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  </section>
);