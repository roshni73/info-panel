import { BrowserRouter } from 'react-router-dom';
import { Layout } from '@/Components/Layout';

export function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}