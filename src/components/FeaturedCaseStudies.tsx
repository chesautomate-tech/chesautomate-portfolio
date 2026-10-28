import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import { projectPath } from '@/lib/site';
import { followInternalLink } from '@/lib/navigation';
import './featured-case-studies.css';

export default function FeaturedCaseStudies({ projects, onProject }: { projects: Project[]; onProject: (project: Project) => void }) {
  const [index, setIndex] = useState(0);
  if (!projects.length) return null;

  const project = projects[index % projects.length];
  const move = (direction: number) => setIndex(current => (current + direction + projects.length) % projects.length);
  const highlights = project.caseStudy === 'clearnest'
    ? ['Callbacks booked', 'Details saved', 'Owner notified']
    : project.caseStudy === 'northline'
    ? ['Less copying', 'One booking record', 'Staff approve changes']
    : project.caseStudy === 'lead-reactivation'
    ? ['Personal check-ins', 'Replies sorted', 'Staff follow-up']
    : project.tags?.slice(0, 3) ?? [];

  return (
    <section className="home-featured featured-showcase" aria-label="Featured case studies" aria-roledescription="carousel" onKeyDown={event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        move(event.key === 'ArrowRight' ? 1 : -1);
      }
    }}>
      <div className="featured-showcase-header">
        <span className="card-kicker">FEATURED CASE STUDIES</span>
        <span className="featured-showcase-count" aria-live="polite" aria-atomic="true"><span className="sr-only">{project.title}. </span>{index + 1} of {projects.length}</span>
      </div>
      {projects.length > 1 && <>
        <button className="featured-nav featured-nav-previous" type="button" aria-label="Previous case study" aria-controls="featured-case-slide" onClick={() => move(-1)}><ChevronLeft aria-hidden="true" /></button>
        <button className="featured-nav featured-nav-next" type="button" aria-label="Next case study" aria-controls="featured-case-slide" onClick={() => move(1)}><ChevronRight aria-hidden="true" /></button>
      </>}
      <article id="featured-case-slide" className="featured-showcase-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${projects.length}: ${project.title}`}>
        <div className="featured-showcase-copy">
          <span className="featured-showcase-platform">{project.caseStudy === 'clearnest' ? 'Vapi + n8n' : `${project.platform} · ${project.caseStudy === 'northline' ? 'Fictional event company · Personal project' : 'Personal demonstration'}`}</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="featured-value-tags" aria-label="Project highlights">{highlights.map(highlight => <span key={highlight}>{highlight}</span>)}</div>
          <a className="featured-showcase-open" href={projectPath(project)} onClick={event => followInternalLink(event, () => onProject(project))}>View case study <ChevronRight size={16} aria-hidden="true" /></a>
        </div>
        {project.caseStudy === 'clearnest' ? <div className="featured-showcase-preview featured-showcase-video">
          <iframe
            src="https://www.loom.com/embed/c0b16a31fe1941b9b3383aaf30f06e1f?hideEmbedTopBar=true"
            title="ClearNest AI receptionist demo"
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
          <a className="featured-video-caption" href="https://www.loom.com/share/c0b16a31fe1941b9b3383aaf30f06e1f" target="_blank" rel="noreferrer">Watch the call and see the results <span>Open in Loom ↗</span></a>
        </div> : <a className="featured-showcase-preview" href={projectPath(project)} aria-label={`Open ${project.title} case study`} onClick={event => followInternalLink(event, () => onProject(project))}>
          <img src={project.image} alt={`${project.title} workflow diagram`} />
          <span>{project.caseStudy === 'northline' ? '4 workflows for booking setup, checks and approvals' : 'Explore the workflow and how it works'}<ChevronRight size={15} aria-hidden="true" /></span>
        </a>}
      </article>
      {projects.length > 1 && <div className="featured-showcase-dots" aria-label="Choose a featured case study">{projects.map((item, itemIndex) => <button key={item.title} type="button" aria-label={`Show ${item.title}`} aria-current={itemIndex === index ? 'true' : undefined} onClick={() => setIndex(itemIndex)}><span /></button>)}</div>}
    </section>
  );
}
