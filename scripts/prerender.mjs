import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export async function prerender(root) {
const { render, pageMetadata, pageStructuredData, sitePaths, siteUrl } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.mjs')).href);
const template = await readFile(resolve(root, 'dist/index.html'), 'utf8');
const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));

if (new Set(sitePaths).size !== sitePaths.length) throw new Error('Duplicate portfolio page paths.');
for (const path of [...sitePaths, '/404.html']) {
  const meta = pageMetadata(path);
  const schema = JSON.stringify(pageStructuredData(path)).replace(/</g, '\\u003c');
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${escape(meta.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escape(meta.description)}" />`)
    .replace(/<meta name="robots"[^>]*>/, `<meta name="robots" content="${meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}" />`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${escape(meta.url)}" />`)
    .replace(/<meta (property|name)="(og|twitter):title"[^>]*>/g, (_, kind, prefix) => `<meta ${kind}="${prefix}:title" content="${escape(meta.title)}" />`)
    .replace(/<meta (property|name)="(og|twitter):description"[^>]*>/g, (_, kind, prefix) => `<meta ${kind}="${prefix}:description" content="${escape(meta.description)}" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${escape(meta.url)}" />`)
    .replace(/<meta (property|name)="(og|twitter):image"[^>]*>/g, (_, kind, prefix) => `<meta ${kind}="${prefix}:image" content="${escape(meta.image)}" />`)
    .replace(/<script id="site-schema" type="application\/ld\+json">[\s\S]*?<\/script>/, () => `<script id="site-schema" type="application/ld+json">${schema}</script>`)
    .replace('<div id="root"></div>', () => `<div id="root" data-prerender-path="${escape(path)}">${render(path)}</div>`);
  const destination = resolve(root, 'dist', path === '/404.html' ? '404.html' : `.${path}index.html`);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html);
}

// Generated from the same routes as the application; no stale URL list to maintain.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitePaths.map(path => `  <url><loc>${siteUrl}${path}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile(resolve(root, 'dist/sitemap.xml'), sitemap);
console.log(`Pre-rendered ${sitePaths.length} portfolio pages and a 404 page. Output: dist`);

}
