import { useEffect, useMemo, useState } from 'react';
import {
  Award, Bot, BriefcaseBusiness, Check, ChevronRight, CircleUserRound, Copy, ExternalLink,
  FolderKanban, Home, Layers3, Linkedin, Mail, MapPin, Menu, MessageCircle, Network,
  Puzzle, Sparkles, Workflow, X,
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import ProjectPage from '@/components/ProjectPage';
import { resolveRoute, viewPath, projectPath, updatePageMetadata, views, type View } from '@/lib/site';
import { followInternalLink } from '@/lib/navigation';
import FeaturedCaseStudies from '@/components/FeaturedCaseStudies';
import { ToolDock, type ToolDockItem } from '@/components/ui/ToolDock';
import { Platform, Project, projects } from '@/data/projects';
import profile from '@/assets/chester-profile-professional.png';
import n8nLogo from '@/assets/logos/n8n.png';
import makeLogo from '@/assets/logos/make.png';
import zapierLogo from '@/assets/logos/zapier.jpg';
import highlevelLogo from '@/assets/logos/highlevel.png';
import claudeIcon from '@/assets/tool-icons/claude.svg';
import codexIcon from '@/assets/tool-icons/openai.svg';
import hubspotIcon from '@/assets/tool-icons/vector/hubspot.svg';
import asanaIcon from '@/assets/tool-icons/vector/asana.svg';
import airtableIcon from '@/assets/tool-icons/vector/airtable.svg';
import slackIcon from '@/assets/tool-icons/vector/slack.svg';
import trelloIcon from '@/assets/tool-icons/vector/trello.svg';
import xeroIcon from '@/assets/tool-icons/vector/xero.svg';
import supabaseIcon from '@/assets/tool-icons/vector/supabase.svg';
import lovableIcon from '@/assets/tool-icons/vector/lovable.svg';
import googleIcon from '@/assets/tool-icons/vector/google-workspace.svg';
import makeCert from '@/assets/certificates/make-cert.png';
import zapierCert from '@/assets/certificates/zapier-cert.png';
import n8nCert from '@/assets/certificates/n8n-cert.png';
import ghlCert from '@/assets/certificates/ghl-cert.png';
import promptCert from '@/assets/certificates/prompt-engineering-cert.png';
import '@/dashboard.css';
import '@/experience.css';


const emailAddress = 'chesautomate@gmail.com';
const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=chesautomate@gmail.com&su=Portfolio%20Inquiry';
const outlookUrl = 'https://outlook.office.com/mail/deeplink/compose?to=chesautomate@gmail.com&subject=Portfolio%20Inquiry';
const whatsappUrl = 'https://wa.me/639125033533?text=Hi%20Chester%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20automation%20project.';

const navigation: { id: View; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'experience', label: 'Experience', icon: BriefcaseBusiness },
  { id: 'services', label: 'Services', icon: Layers3 },
  { id: 'credentials', label: 'Credentials', icon: Award },
  { id: 'about', label: 'About', icon: CircleUserRound },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const platforms: { name: Platform; logo: string; className: string }[] = [
  { name: 'n8n', logo: n8nLogo, className: 'n8n' },
  { name: 'Make', logo: makeLogo, className: 'make' },
  { name: 'Zapier', logo: zapierLogo, className: 'zapier' },
  { name: 'GoHighLevel', logo: highlevelLogo, className: 'highlevel' },
];

const supportingTools: ToolDockItem[] = [
  { label: 'HubSpot', icon: hubspotIcon, background: '#ffffff', scale: 74 },
  { label: 'Asana', icon: asanaIcon, background: '#ffffff', scale: 60 },
  { label: 'Airtable', icon: airtableIcon, background: '#ffffff', scale: 68 },
  { label: 'Slack', icon: slackIcon, background: '#ffffff', scale: 66 },
  { label: 'Trello', icon: trelloIcon, background: '#ffffff', scale: 70 },
  { label: 'Xero', icon: xeroIcon, background: '#ffffff', scale: 68 },
  { label: 'Supabase', icon: supabaseIcon, background: '#111111', scale: 70 },
  { label: 'Lovable', icon: lovableIcon, background: '#f7f4ee', scale: 78 },
  { label: 'Google Workspace', icon: googleIcon, background: '#ffffff', scale: 70 },
  { label: 'Claude', icon: claudeIcon, background: '#d97757', invert: true },
  { label: 'Codex', icon: codexIcon, background: '#222222', invert: true },
];

const services = [
  { icon: Network, title: 'CRM & lead management', text: 'Pipelines, forms, funnels, and follow-up sequences that keep every lead organized.' },
  { icon: Workflow, title: 'Workflow automation', text: 'Connected processes with clear conditions, useful safeguards, and fewer manual steps.' },
  { icon: Bot, title: 'AI-powered workflows', text: 'Message classification, drafting, reply routing, and thoughtful human handoffs.' },
  { icon: Puzzle, title: 'API integrations', text: 'Webhooks and HTTP connections for tools that need more than a ready-made integration.' },
  { icon: Sparkles, title: 'Data transformation', text: 'Clean, parse, and reshape incoming data so it is ready for the next step.' },
  { icon: Layers3, title: 'Multi-platform sync', text: 'Keep your CRM, email, spreadsheets, and project tools working from the same information.' },
];

const certificates = [
  { title: 'AI Automation with n8n', platform: 'n8n', image: n8nCert },
  { title: 'HighLevel CRM Full Training', platform: 'GoHighLevel', image: ghlCert },
  { title: 'No Code Automation with Make.com', platform: 'Make', image: makeCert },
  { title: 'No Code Automation with Zapier', platform: 'Zapier', image: zapierCert },
  { title: 'Prompt Engineering', platform: 'AI Skills', image: promptCert },
];

export default function Index({ initialPath = '/' }: { initialPath?: string }) {
  const [path, setPath] = useState(initialPath);
  const { view, project: routeProject, notFound } = resolveRoute(path);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<(typeof certificates)[number] | null>(null);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [platform, setPlatform] = useState<'All' | Platform>('All');

  useEffect(() => {
    const syncLocation = () => {
      const legacyView = window.location.hash.slice(1) as View;
      if (views.includes(legacyView)) {
        const next = viewPath(legacyView);
        window.history.replaceState(null, '', next);
        setPath(next);
      } else {
        setPath(window.location.pathname);
      }
      setMenuOpen(false);
    };
    syncLocation();
    window.addEventListener('popstate', syncLocation);
    window.addEventListener('hashchange', syncLocation);
    return () => {
      window.removeEventListener('popstate', syncLocation);
      window.removeEventListener('hashchange', syncLocation);
    };
  }, []);

  useEffect(() => { updatePageMetadata(path); }, [path]);

  const navigateTo = (next: string) => {
    window.history.pushState(null, '', next);
    setPath(next);
    setMenuOpen(false);
    requestAnimationFrame(() => {
      document.getElementById('dashboard-main')?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
  };
  const navigate = (next: View) => navigateTo(viewPath(next));
  const openProject = (project: Project) => navigateTo(projectPath(project));

  const filteredProjects = useMemo(
    () => platform === 'All' ? projects : projects.filter(project => project.platform === platform),
    [platform],
  );

  return (
    <div className="portfolio-app">
      <a className="dashboard-skip" href="#dashboard-main">Skip to content</a>
      <aside className={`profile-sidebar ${menuOpen ? 'is-open' : ''}`}>
        <div className="profile-block">
          <img className="profile-photo" src={profile} alt="Chester Wapanio" />
          <div><p className="profile-name">Chester Wapanio</p><p>CRM & AI Automation Specialist</p></div>
          <button className="mobile-menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        <div className="profile-location"><MapPin size={16} /> Bohol, Philippines · Remote</div>
        <div className="profile-socials" aria-label="Professional profiles">
          <button type="button" onClick={() => setEmailDialogOpen(true)} aria-label="Email Chester"><Mail /></button>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Message Chester on WhatsApp"><MessageCircle /></a>
          <a href="https://www.linkedin.com/in/chester-wapanio-79130138b" target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><Linkedin /></a>
          <a href="https://www.onlinejobs.ph/jobseekers/info/3858644" target="_blank" rel="noreferrer" aria-label="OnlineJobs profile"><BriefcaseBusiness /></a>
        </div>
        <div className="sidebar-rule" />
        <nav className="sidebar-nav" aria-label="Portfolio sections">
          {navigation.map(item => { const Icon = item.icon; return <a key={item.id} href={viewPath(item.id)} className={view === item.id ? 'active' : ''} aria-current={view === item.id && !notFound ? 'page' : undefined} onClick={event => followInternalLink(event, () => navigate(item.id))}><Icon /><span>{item.label}</span></a>; })}
        </nav>
        <p className="sidebar-foot">© 2026 Chester Wapanio</p>
      </aside>

      <main id="dashboard-main" className="dashboard-main" tabIndex={-1}>
        {notFound ? <div className="view-shell"><PageHeading eyebrow="404" title="This page isn’t here." text="Explore my automation projects, services and experience from the portfolio." /><a className="primary-action" href="/" onClick={event => followInternalLink(event, () => navigate('home'))}>Back to home</a></div> : routeProject ? <ProjectPage project={routeProject} onBack={() => navigate('projects')} onDiscuss={() => navigate('contact')} /> : <>
        {view === 'home' && <HomeView navigate={navigate} onProject={openProject} />}
        {view === 'projects' && <ProjectsView platform={platform} setPlatform={setPlatform} projects={filteredProjects} onProject={openProject} />}
        {view === 'experience' && <ExperienceView navigate={navigate} />}
        {view === 'services' && <ServicesView navigate={navigate} />}
        {view === 'credentials' && <CredentialsView onCertificate={setSelectedCertificate} />}
        {view === 'about' && <AboutView navigate={navigate} />}
        {view === 'contact' && <ContactView onEmail={() => setEmailDialogOpen(true)} />}
        </>}
      </main>

      <Dialog open={!!selectedCertificate} onOpenChange={(open) => { if (!open) setSelectedCertificate(null); }}>
        <DialogContent className="dashboard-certificate-dialog">{selectedCertificate && <><DialogTitle>{selectedCertificate.title}</DialogTitle><DialogDescription>{selectedCertificate.platform} · Training certificate</DialogDescription><img src={selectedCertificate.image} alt={`${selectedCertificate.title} certificate`} /><a href={selectedCertificate.image} target="_blank" rel="noreferrer">Open full-resolution certificate <ExternalLink size={15} /></a></>}</DialogContent>
      </Dialog>
      <EmailDialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen} />
    </div>
  );
}

function PageHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <header className="page-heading"><span>{eyebrow}</span><h1>{title}</h1><p>{text}</p></header>;
}

function HomeView({ navigate, onProject }: { navigate: (view: View) => void; onProject: (project: Project) => void }) {
  const featuredProjects = projects.filter(project => project.featured);
  return <div className="view-shell home-view">
    <section className="home-intro"><div className="intro-copy"><span className="availability-badge"><i /> Open to freelance and team opportunities</span><span className="eyebrow">CRM · AUTOMATION · AI</span><h1>Automation systems that keep <span>leads moving.</span></h1><p>I connect your tools, organize your leads, and automate the follow-up—so your business has fewer repetitive steps and a clearer customer journey.</p><div className="hero-actions"><a className="primary-action" href="/projects/" onClick={event => followInternalLink(event, () => navigate('projects'))}>Explore projects</a><a className="secondary-action" href="/contact/" onClick={event => followInternalLink(event, () => navigate('contact'))}>Discuss your workflow</a></div></div><aside className="hero-proof" aria-label="Portfolio summary"><span className="card-kicker">PORTFOLIO AT A GLANCE</span><h3>Built to show the work.</h3><div className="proof-stats"><div><strong>{projects.length}</strong><span>Workflow demos</span></div><div><strong>4</strong><span>Platforms</span></div><div><strong>5</strong><span>Credentials</span></div></div><p>Hands-on automation projects built with sample data and clear workflow logic.</p></aside></section>
    <FeaturedCaseStudies projects={featuredProjects} onProject={onProject} />
    <section className="tool-rail" aria-label="Automation platforms"><div className="tool-rail-label"><span>CORE TOOLKIT</span><strong>Platforms I build with</strong></div><div className="tool-rail-marquee"><div className="tool-rail-track">{[...platforms, ...platforms, ...platforms].map((item, index) => <div className={`tool-logo ${item.className}`} key={`${item.name}-${index}`} aria-hidden={index >= platforms.length}><img src={item.logo} alt={index < platforms.length ? item.name : ''} /></div>)}</div></div></section>
    <section className="supporting-tools" aria-labelledby="supporting-tools-title">
      <div className="supporting-tools-copy">
        <span>CONNECTED ECOSYSTEM</span>
        <h3 id="supporting-tools-title">Tools I connect with—and more</h3>
        <p>A growing toolkit across AI, data, communication, finance, and project management for building complete workflows.</p>
      </div>
      <ToolDock items={supportingTools} />
    </section>
    <section className="bento-grid" aria-label="Portfolio overview">
      <button className="bento-card experience-card" type="button" onClick={() => navigate('experience')}><span className="card-icon"><BriefcaseBusiness /></span><span className="card-kicker">CONTRACT EXPERIENCE</span><h3>50+ workflows built and tested.</h3><p>Automation Logic Specialist on contract, translating requirements into workflows, integrations, and tested results.</p><div className="mini-platforms"><span>Zapier</span><span>Make</span><span>n8n</span></div><span className="card-link">Explore my experience <ChevronRight /></span></button>
      <button className="bento-card projects-card" type="button" onClick={() => navigate('projects')}><span className="card-icon"><FolderKanban /></span><span className="card-kicker">PROJECT LIBRARY</span><strong className="big-number">{projects.length}</strong><h3>Workflow demonstrations</h3><div className="mini-platforms"><span>n8n</span><span>Make</span><span>Zapier</span><span>GHL</span></div></button>
      <button className="bento-card services-card" type="button" onClick={() => navigate('services')}><span className="card-icon"><Layers3 /></span><span className="card-kicker">SERVICES</span><h3>What I can build</h3><ol>{services.slice(0, 5).map((service, index) => <li key={service.title}><span>{service.title}</span><small>0{index + 1}</small></li>)}</ol></button>
      <button className="bento-card credentials-card" type="button" onClick={() => navigate('credentials')}><span className="card-icon"><Award /></span><span className="card-kicker">CREDENTIALS</span><h3>Training behind the work</h3><div className="cert-preview"><img src={n8nCert} alt="Complete n8n training certificate preview" /></div><span className="credential-card-link">View all credentials <ChevronRight /></span></button>
      <button className="bento-card contact-card" type="button" onClick={() => navigate('contact')}><span className="card-icon"><Mail /></span><span className="card-kicker">AVAILABLE FOR OPPORTUNITIES</span><h3>Have a process that needs simplifying?</h3><p>Let’s talk about the tools, handoffs, and repetitive steps in your workflow.</p></button>
    </section>
    <p className="sample-note">Portfolio projects are personal demonstrations created with sample data.</p>
  </div>;
}

function ProjectsView({ platform, setPlatform, projects: visibleProjects, onProject }: { platform: 'All' | Platform; setPlatform: (platform: 'All' | Platform) => void; projects: Project[]; onProject: (project: Project) => void }) {
  const filters: ('All' | Platform)[] = ['All', 'n8n', 'Make', 'Zapier', 'GoHighLevel'];
  return <div className="view-shell"><PageHeading eyebrow="PROJECTS" title="Workflow logic you can explore." text="A collection of personal automation demonstrations built with sample data. Open any project to see the workflow at full size." /><div className="project-filters" role="group" aria-label="Filter projects by platform">{filters.map(filter => <button type="button" key={filter} className={platform === filter ? 'active' : ''} onClick={() => setPlatform(filter)}>{filter}</button>)}</div><div className="dashboard-project-grid">{visibleProjects.map(project => <a className="dashboard-project-card" href={projectPath(project)} key={`${project.platform}-${project.title}`} onClick={event => followInternalLink(event, () => onProject(project))}><div className="project-image"><img src={project.image} alt={`${project.title} workflow`} loading="lazy" /></div><div className="project-card-body"><span>{project.platform}</span><h3>{project.title}</h3><p>{project.description || 'A personal workflow demonstration exploring connected automation logic.'}</p><small>View workflow <ChevronRight /></small></div></a>)}</div></div>;
}

function ExperienceView({ navigate }: { navigate: (view: View) => void }) {
  const responsibilities = [
    { icon: Workflow, title: 'Workflow logic', text: 'Turned written requirements into multi-step workflows with conditional branches, lookup rules, and data handoffs.' },
    { icon: Network, title: 'Data and API integrations', text: 'Cleaned and normalized inputs, applied formulas and JavaScript steps, and connected applications through REST APIs and webhooks.' },
    { icon: Check, title: 'Testing and validation', text: 'Tested normal, missing-data, and invalid-input cases. Checked outputs between steps and compared results with project requirements.' },
    { icon: FolderKanban, title: 'Exports and documentation', text: 'Prepared workflow exports and technical documentation so the configurations and results could be reviewed against project requirements.' },
  ];

  return <div className="view-shell experience-view">
    <PageHeading eyebrow="EXPERIENCE" title="Business automation experience." text="Contract workflow development, application integrations, testing, and technical documentation." />
    <article className="experience-engagement" aria-labelledby="experience-role">
      <div className="experience-summary">
        <div className="experience-label"><BriefcaseBusiness size={16} /><span>COMPLETED CONTRACT</span></div>
        <h3 id="experience-role">Automation Logic Specialist — Contract</h3>
        <div className="experience-meta"><span>January–May 2026</span></div>
        <p className="experience-description">Built and tested 50+ business automation workflows across Zapier, Make, and n8n. Translated written requirements into workflow logic, data transformations, and application integrations. Tested normal and edge-case inputs and prepared workflow exports and technical documentation for review.</p>
        <div className="experience-stack" aria-label="Contract tools"><span>Zapier</span><span>Make</span><span>n8n</span><span>REST APIs</span><span>Webhooks</span></div>
      </div>
      <aside className="experience-scope" aria-label="Contract scope">
        <div><strong>50+</strong><span>Workflows built and tested</span></div>
        <div><strong>3</strong><span>Automation platforms</span></div>
        <p>This count describes my contract workflows. Personal demonstrations are listed separately in the Projects section.</p>
      </aside>
    </article>
    <p className="experience-confidentiality"><strong>Confidentiality note:</strong> Internal project details and deliverables are kept private. Portfolio examples are independent demonstrations built with sample data.</p>
    <section className="experience-responsibilities" aria-labelledby="experience-work-heading">
      <div className="experience-section-heading"><span className="card-kicker">WHAT I DELIVERED</span><h3 id="experience-work-heading">From requirements to tested workflows.</h3></div>
      <div className="experience-work-grid">{responsibilities.map(item => { const Icon = item.icon; return <article className="experience-work-card" key={item.title}><span className="card-icon"><Icon /></span><h4>{item.title}</h4><p>{item.text}</p></article>; })}</div>
    </section>
    <div className="wide-cta"><div className="experience-demo-copy"><span>INDEPENDENT DEMONSTRATIONS</span><h3>Explore my approach in practice.</h3><p>My personal projects use sample data to demonstrate workflow logic, integrations, and data handling. They are separate from the contract work described above.</p></div><div className="experience-actions"><button className="secondary-action" type="button" onClick={() => navigate('projects')}>Explore demo projects</button><button className="primary-action" type="button" onClick={() => navigate('contact')}>Discuss your workflow</button></div></div>
  </div>;
}

function ServicesView({ navigate }: { navigate: (view: View) => void }) {
  return <div className="view-shell"><PageHeading eyebrow="SERVICES" title="Your tools, working as one." text="Practical automation for the parts of your day that should not need another manual step." /><div className="service-dashboard-grid">{services.map((service, index) => { const Icon = service.icon; return <article className="service-dashboard-card" key={service.title}><div><span className="service-icon"><Icon /></span><small>0{index + 1}</small></div><h3>{service.title}</h3><p>{service.text}</p></article>; })}</div><div className="wide-cta"><div><span>HAVE A PROCESS IN MIND?</span><h3>Let’s find the repetitive steps worth removing.</h3></div><button type="button" className="primary-action" onClick={() => navigate('contact')}>Start a conversation</button></div></div>;
}

function CredentialsView({ onCertificate }: { onCertificate: (certificate: (typeof certificates)[number]) => void }) {
  return <div className="view-shell"><PageHeading eyebrow="CREDENTIALS" title="Learning turned into practice." text="Training in the platforms and skills behind my automation work." /><div className="credentials-grid">{certificates.map(certificate => <button className="credential-card" type="button" key={certificate.title} onClick={() => onCertificate(certificate)}><div className="credential-image"><img src={certificate.image} alt={`${certificate.title} certificate`} loading="lazy" /></div><div><span>{certificate.platform}</span><h3>{certificate.title}</h3><small>View certificate <ExternalLink /></small></div></button>)}</div></div>;
}

function AboutView({ navigate }: { navigate: (view: View) => void }) {
  const skills = ['Webhooks', 'HTTP requests', 'JSON / XML', 'JavaScript', 'Conditional logic', 'Iterators', 'Error handling', 'OAuth', 'Regex', 'Data transformation'];
  return <div className="view-shell"><PageHeading eyebrow="ABOUT" title="Automation designed around real business needs." text="I build connected CRM and AI workflows that reduce repetitive work, strengthen follow-up, and keep information moving between the tools your business relies on." /><section className="about-panel"><div className="about-copy"><h3>I turn disconnected processes into clear, reliable automation systems.</h3><p>I’m Chester Wapanio, a CRM & AI Automation Specialist based in Bohol, Philippines. Using GoHighLevel, n8n, Make, and Zapier, I design practical workflows for lead management, CRM updates, AI-assisted routing, follow-up, and cross-platform data movement.</p><p>Every project in this portfolio is a hands-on demonstration built with sample data. The work shows how I map a process, structure the workflow logic, anticipate failure points, and create clear handoffs when human judgment is needed.</p><div className="about-values"><span><Workflow /> Business-focused workflow design</span><span><Puzzle /> Safeguards and human handoffs</span><span><Sparkles /> Practical, continuous improvement</span></div></div><div className="about-profile-card"><img src={profile} alt="Chester Wapanio" /><strong>Chester Wapanio</strong><span>CRM & AI Automation Specialist</span><small><MapPin /> Bohol, Philippines · GMT+8</small><button className="primary-action" type="button" onClick={() => navigate('contact')}>Discuss your workflow</button></div></section><section className="skills-panel"><span className="card-kicker">TECHNICAL CAPABILITIES</span><h3>The skills behind dependable automation.</h3><div>{skills.map(skill => <span key={skill}>{skill}</span>)}</div></section></div>;
}

function ContactView({ onEmail }: { onEmail: () => void }) {
  return <div className="view-shell contact-view"><PageHeading eyebrow="CONTACT" title="Let’s make the workflow clearer." text="Tell me what you are working on, where the process gets repetitive, or how I could contribute to your team." /><div className="contact-grid"><button type="button" onClick={onEmail}><span className="contact-icon"><Mail /></span><div><small>EMAIL</small><h3>{emailAddress}</h3><p>Choose Gmail, Outlook, or copy my email address.</p></div><ChevronRight /></button><a href={whatsappUrl} target="_blank" rel="noreferrer"><span className="contact-icon"><MessageCircle /></span><div><small>WHATSAPP</small><h3>+63 912 503 3533</h3><p>Start a direct conversation about your workflow.</p></div><ExternalLink /></a><a href="https://www.linkedin.com/in/chester-wapanio-79130138b" target="_blank" rel="noreferrer"><span className="contact-icon"><Linkedin /></span><div><small>LINKEDIN</small><h3>Chester Wapanio</h3><p>Connect and view my professional profile.</p></div><ExternalLink /></a><a href="https://www.onlinejobs.ph/jobseekers/info/3858644" target="_blank" rel="noreferrer"><span className="contact-icon"><BriefcaseBusiness /></span><div><small>ONLINEJOBS.PH</small><h3>View my jobseeker profile</h3><p>Skills, availability, and work information.</p></div><ExternalLink /></a></div><div className="availability-card"><span className="availability-dot" /><div><strong>Open to freelance projects and team opportunities</strong><p>Based in the Philippines and available for remote collaboration.</p></div></div></div>;
}

function EmailDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) setCopied(false);
  }, [open]);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(emailAddress);
    setCopied(true);
  };

  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="email-dialog">
      <DialogTitle>Choose how to email me</DialogTitle>
      <DialogDescription>Open a web email service or copy the address to use anywhere.</DialogDescription>
      <div className="email-address"><Mail size={18} /><span>{emailAddress}</span></div>
      <div className="email-options">
        <a href={gmailUrl} target="_blank" rel="noreferrer"><span>Open in Gmail</span><ExternalLink size={16} /></a>
        <a href={outlookUrl} target="_blank" rel="noreferrer"><span>Open in Outlook</span><ExternalLink size={16} /></a>
        <button type="button" onClick={copyEmail}>{copied ? <><Check size={17} /> Email copied</> : <><Copy size={17} /> Copy email address</>}</button>
      </div>
    </DialogContent>
  </Dialog>;
}
