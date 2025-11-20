import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Data from '../../view/data';
import { Sidebar } from '../SideBar';
import Home from '../../view/home';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main >
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-lg text-[#006483]">InfoPanel</h1>
            <div className="w-10" />
          </div>
        </div>

        <div className="p-4 md:p-6 lg:p-8">
          <div>
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
