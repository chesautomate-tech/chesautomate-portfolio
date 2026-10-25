import Index from './pages/Index';

export default function App({ initialPath = '/' }: { initialPath?: string }) {
  return <Index initialPath={initialPath} />;
}
