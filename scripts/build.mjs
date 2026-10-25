import { build } from 'vite';
import { fileURLToPath } from 'node:url';

// Both passes use the same Vite asset settings so pre-rendered image URLs match the client build.
const root = fileURLToPath(new URL('../', import.meta.url));
const mode = process.argv.includes('--development') ? 'development' : 'production';
process.env.NODE_ENV = 'production';
await build({ root, mode });
await build({ root, mode, build: { ssr: 'src/entry-server.tsx', outDir: 'dist-ssr', copyPublicDir: false, rollupOptions: { output: { entryFileNames: 'entry-server.mjs' } } } });
const { prerender } = await import('./prerender.mjs');
await prerender(root);
