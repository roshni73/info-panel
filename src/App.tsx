import { useState } from 'react';
import Sidebar from './components/SideBar';

type Page = 'home' | 'data';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <Sidebar
          currentPage={currentPage}
          onNavigate={(page) => {
            setCurrentPage(page);
            setSidebarOpen(false);
          }}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 overflow-auto pt-16 md:pt-0">
          hello
        </main>
      </div>
  );
}