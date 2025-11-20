import { BrowserRouter } from 'react-router-dom';
import { Layout } from '@/Components/Layout';
import { ErrorBoundary } from '@/Components/ErrorBoundary';

export function App(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
