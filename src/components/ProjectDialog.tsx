import { ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Project, type Platform } from '@/data/projects';
import n8nLogo from '@/assets/logos/icons/n8n.svg';
import makeLogo from '@/assets/logos/icons/make.svg';
import zapierLogo from '@/assets/logos/icons/zapier.png';
import highlevelLogo from '@/assets/logos/icons/highlevel.png';

const platformLogos: Record<Platform, { src: string; className: string }> = {
  n8n: { src: n8nLogo, className: 'n8n' },
  Make: { src: makeLogo, className: 'make' },
  Zapier: { src: zapierLogo, className: 'zapier' },
  GoHighLevel: { src: highlevelLogo, className: 'highlevel' },
};

export default function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <Dialog open={!!project} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="project-dialog">
        {project && (
          <>
            <header className="project-dialog-heading">
              <div className="project-dialog-labels">
                <span className={`project-platform-logo ${platformLogos[project.platform].className}`}>
                  <img src={platformLogos[project.platform].src} alt={`${project.platform} logo`} />
                </span>
                <span className="project-dialog-context"><strong>{project.platform}</strong><span>Workflow case study</span></span>
              </div>
              <DialogTitle>{project.title}</DialogTitle>
              <DialogDescription>Personal portfolio demonstration built with sample data</DialogDescription>
            </header>

            <div className="project-dialog-body">
              <section className="project-dialog-overview">
                <a className="full-canvas" href={project.image} target="_blank" rel="noopener noreferrer">
                  <img src={project.image} alt={`${project.title} — complete workflow`} />
                  <span>View full-resolution workflow <ArrowUpRight size={15} /></span>
                </a>

                <div className="project-summary">
                  {project.description && <p className="detail-intro">{project.description}</p>}
                  {project.tags?.length > 0 && (
                    <div className="project-dialog-tags" aria-label="Tools used">
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  )}
                  {project.problem && (
                    <div className="summary-block">
                      <span>The challenge</span>
                      <p>{project.problem}</p>
                    </div>
                  )}
                  {project.solution && (
                    <div className="summary-block">
                      <span>The solution</span>
                      <p>{project.solution}</p>
                    </div>
                  )}
                </div>
              </section>

              {(project.steps || project.errorImage) && (
                <section className="project-detail-grid">
                  {project.steps && (
                    <div className="detail-steps">
                      <span className="detail-label">Workflow logic</span>
                      <h3>How it works</h3>
                      <ol>{project.steps.map((step) => <li key={step}><CheckCircle2 size={16} /> <span>{step}</span></li>)}</ol>
                    </div>
                  )}
                  {project.errorImage && (
                    <div className="safeguards">
                      <span className="detail-label">Reliability</span>
                      <h3><ShieldCheck size={20} /> Built-in safeguards</h3>
                      <ul>
                        <li>Status tracking prevents duplicate outreach.</li>
                        <li>Opt-outs and self-sent emails are filtered.</li>
                        <li>AI replies stop after two messages for human handoff.</li>
                        <li>Workflow errors trigger a separate Slack alert.</li>
                      </ul>
                    </div>
                  )}
                </section>
              )}

              {project.errorImage && (
                <section className="error-section">
                  <div>
                    <span className="detail-label">Error monitoring</span>
                    <h3>A separate alert workflow</h3>
                    <p>Failures are routed to Slack so the workflow can be reviewed quickly.</p>
                  </div>
                  <a className="full-canvas error-canvas" href={project.errorImage} target="_blank" rel="noopener noreferrer">
                    <img src={project.errorImage} alt="Error Trigger connected to Slack notification" />
                    <span>View error workflow <ArrowUpRight size={15} /></span>
                  </a>
                </section>
              )}

              <p className="project-note">Personal project · Sample data · No client information used</p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
