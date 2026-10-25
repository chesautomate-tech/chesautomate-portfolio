import { renderToString } from 'react-dom/server';
import App from './App';
import { pageMetadata, pageStructuredData, sitePaths, siteUrl } from './lib/site';

export { pageMetadata, pageStructuredData, sitePaths, siteUrl };
export function render(path: string) {
  return renderToString(<App initialPath={path} />);
}
