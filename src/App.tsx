import { BrowserRouter } from 'react-router-dom';
import { Layout } from '@/Components/Layout';

export function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
