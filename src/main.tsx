import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './refinements.css';

const root = document.getElementById('root')!;
const app = <App initialPath={root.dataset.prerenderPath || window.location.pathname} />;
if (root.dataset.prerenderPath) hydrateRoot(root, app);
else createRoot(root).render(app);
