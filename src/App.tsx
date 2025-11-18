import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout';

export function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
