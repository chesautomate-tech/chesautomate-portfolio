import { projects, type Project } from '@/data/projects';
import portrait from '@/assets/chester-profile-professional.png';

export const siteUrl = 'https://chesautomate-portfolio.pages.dev';
export const views = ['home', 'projects', 'experience', 'services', 'credentials', 'about', 'contact'] as const;
export type View = typeof views[number];
export const viewPath = (view: View) => view === 'home' ? '/' : `/${view}/`;
export const projectPath = (project: Project) => `/projects/${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}/`;

const viewMetadata: Record<View, { title: string; description: string }> = {
  home: { title: 'CRM & AI Automation Specialist | Chester Wapanio', description: 'Chester Wapanio builds CRM and AI workflows with n8n, Make, Zapier and GoHighLevel. Explore his projects and experience for client work, agency collaboration and employment.' },
  projects: { title: 'Automation Projects | Chester Wapanio', description: 'Explore ClearNest’s AI receptionist, Northline booking automation and AI-powered lead reactivation. See how each demo turns manual work into a clear next step.' },
  experience: { title: 'Automation Work Experience | Chester Wapanio', description: 'Automation Logic Specialist contract experience: 50+ workflows built and tested across Zapier, Make and n8n, plus integrations and documentation.' },
  services: { title: 'CRM & Workflow Automation Services | Chester Wapanio', description: 'CRM and lead management, workflow automation, AI-assisted processes, API integrations, data transformation and multi-platform synchronization.' },
  credentials: { title: 'Automation Training & Credentials | Chester Wapanio', description: 'View Chester Wapanio’s training in GoHighLevel, n8n, Make, Zapier and prompt engineering.' },
  about: { title: 'About Chester Wapanio | CRM & AI Automation Specialist', description: 'Meet Chester Wapanio, a CRM and AI Automation Specialist in Bohol, Philippines. Open to client projects, agency collaborations and employment opportunities.' },
  contact: { title: 'Contact Chester Wapanio | Projects, Agencies & Roles', description: 'Discuss a client project, agency collaboration or employment opportunity with Chester Wapanio. Contact him by email, WhatsApp, LinkedIn or OnlineJobs.ph.' },
};

export function resolveRoute(pathname: string): { view: View; project?: Project; notFound?: boolean } {
  const path = pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`;
  const project = projects.find(item => projectPath(item) === path);
  if (project) return { view: 'projects', project };
  const view = views.find(item => viewPath(item) === path);
  return view ? { view } : { view: 'home', notFound: true };
}

export const sitePaths = [...views.map(viewPath), ...projects.map(projectPath)];

export function pageMetadata(pathname: string) {
  const route = resolveRoute(pathname);
  const path = route.notFound ? '/404.html' : route.project ? projectPath(route.project) : viewPath(route.view);
  const metadata = route.notFound
    ? { title: 'Page not found | Chester Wapanio', description: 'Explore Chester Wapanio’s automation portfolio, services and experience.' }
    : route.project
      ? { title: `${route.project.title} | Chester Wapanio`, description: route.project.description || `${route.project.title}: a personal ${route.project.platform} workflow demonstration by Chester Wapanio, built with sample data.` }
      : viewMetadata[route.view];
  return { ...metadata, url: siteUrl + path, image: siteUrl + portrait, noindex: !!route.notFound };
}

export function pageStructuredData(pathname: string) {
  const meta = pageMetadata(pathname);
  const { project } = resolveRoute(pathname);
  const personId = `${siteUrl}/#chester-wapanio`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: `${siteUrl}/`, name: 'ChesAutomate', inLanguage: 'en', publisher: { '@id': personId } },
      { '@type': 'Person', '@id': personId, name: 'Chester Wapanio', url: `${siteUrl}/about/`, image: meta.image, jobTitle: 'CRM & AI Automation Specialist', email: 'mailto:chesautomate@gmail.com', address: { '@type': 'PostalAddress', addressLocality: 'Bohol', addressCountry: 'PH' }, sameAs: ['https://www.linkedin.com/in/chester-wapanio-79130138b', 'https://www.onlinejobs.ph/jobseekers/info/3858644'], knowsAbout: ['CRM automation', 'n8n', 'Make', 'Zapier', 'GoHighLevel', 'API integrations', 'AI workflow automation'] },
      { '@type': 'WebPage', '@id': meta.url, url: meta.url, name: meta.title, description: meta.description, isPartOf: { '@id': `${siteUrl}/#website` }, about: { '@id': personId }, ...(project ? { mainEntity: { '@id': `${meta.url}#project` } } : {}) },
      ...(project ? [{ '@type': 'CreativeWork', '@id': `${meta.url}#project`, name: project.title, description: meta.description, url: meta.url, creator: { '@id': personId }, genre: 'Sample-data automation demonstration', keywords: [project.platform, ...(project.tags || [])], image: siteUrl + project.image }] : []),
    ],
  };
}

export function updatePageMetadata(pathname: string) {
  const meta = pageMetadata(pathname);
  document.title = meta.title;
  const values: Record<string, string> = {
    'meta[name="description"]': meta.description,
    'meta[property="og:title"]': meta.title,
    'meta[property="og:description"]': meta.description,
    'meta[property="og:url"]': meta.url,
    'meta[property="og:image"]': meta.image,
    'meta[name="twitter:title"]': meta.title,
    'meta[name="twitter:description"]': meta.description,
    'meta[name="twitter:image"]': meta.image,
    'meta[name="robots"]': meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  };
  Object.entries(values).forEach(([selector, content]) => document.querySelector(selector)?.setAttribute('content', content));
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', meta.url);
  const schema = document.querySelector('#site-schema');
  if (schema) schema.textContent = JSON.stringify(pageStructuredData(pathname));
}
