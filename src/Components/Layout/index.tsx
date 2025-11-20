import { useState, useCallback } from 'react';
import { Menu } from 'lucide-react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Data from '@views/data';
import { Sidebar } from '@/Components/SideBar';
import Home from '@views/home';
import { APP_CONFIG } from '@/config/api';

export function Layout(): React.JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const handleOpenSidebar = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
      <main className="flex-1 flex flex-col min-h-0">
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-30 shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={handleOpenSidebar}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-lg text-[#006483]">{APP_CONFIG.name}</h1>
            <div className="w-10" />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/data" element={<Data />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}
