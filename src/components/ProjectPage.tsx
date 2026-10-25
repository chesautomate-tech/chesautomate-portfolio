import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import type { Project } from '@/data/projects';
import { followInternalLink } from '@/lib/navigation';
import NorthlineCaseStudy from './NorthlineCaseStudy';
import './project-page.css';

export default function ProjectPage({ project, onBack, onDiscuss }: { project: Project; onBack: () => void; onDiscuss: () => void }) {
  return <article className="view-shell project-page">
    <a className="project-back" href="/projects/" onClick={event => followInternalLink(event, onBack)}><ArrowLeft size={18} /> All projects</a>
    <header className="project-page-heading">
      <span className="card-kicker">{project.platform} · Portfolio case study</span>
      <h1>{project.title}</h1>
      <p>{project.caseStudy === 'northline' ? 'A portfolio project for Northline, a fictional event services company.' : 'An independent workflow demonstration built with sample data.'}</p>
    </header>
    {project.caseStudy === 'northline' ? <NorthlineCaseStudy onDiscuss={onDiscuss} /> : <div className="project-page-content">
      {project.description && <p className="project-page-intro">{project.description}</p>}
      {project.tags && <ul className="project-page-tools" aria-label="Tools used">{[project.platform, ...project.tags].map(tag => <li key={tag}>{tag}</li>)}</ul>}
      {(project.problem || project.solution) && <section className="project-page-summary" aria-label="Project overview">
        {project.problem && <div><h2>The business problem</h2><p>{project.problem}</p></div>}
        {project.solution && <div><h2>What I built</h2><p>{project.solution}</p></div>}
      </section>}
      <section className="project-page-diagram"><h2>The workflow</h2><p>Explore the connections and steps in the original workflow diagram.</p><a href={project.image} target="_blank" rel="noreferrer"><img src={project.image} alt={`${project.title} — complete workflow diagram`} /><span>Open full-resolution diagram <ArrowUpRight size={18} /></span></a></section>
      {project.steps && <section className="project-page-steps"><h2>How it works</h2><ol>{project.steps.map(step => <li key={step}><CheckCircle2 size={20} /><span>{step}</span></li>)}</ol></section>}
      {project.errorImage && <section className="project-page-diagram"><h2>Error monitoring and human review</h2><p>The portfolio design includes status checks, opt-out filtering, a handoff after two AI replies, and a separate Slack error-alert workflow. These describe the intended safeguards; production performance and complete enforcement have not been independently verified.</p><a href={project.errorImage} target="_blank" rel="noreferrer"><img src={project.errorImage} alt="Separate n8n error workflow connected to a Slack notification" loading="lazy" /><span>Open error workflow <ArrowUpRight size={18} /></span></a></section>}
      <aside className="project-page-scope"><h2>Project scope</h2><p>This is a personal demonstration using sample data. No client information is included, and no measured client revenue, conversion improvement, or time savings are claimed.</p></aside>
    </div>}
    <footer className="project-page-contact"><div><span className="card-kicker">PROJECTS · COLLABORATIONS · ROLES</span><h2>Let’s talk about your next step.</h2></div><a className="primary-action" href="/contact/" onClick={event => followInternalLink(event, onDiscuss)}>Let’s talk <ArrowUpRight size={18} /></a></footer>
  </article>;
}
