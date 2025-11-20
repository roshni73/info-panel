import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Database, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-[#006483] text-white w-64 min-h-screen p-6 flex flex-col transform transition-transform duration-300 ease-in-out lg:transform-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 text-white/80 hover:text-white"
          aria-label="Close sidebar"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">InfoPanel</h1>
          <p className="text-white/70 text-sm">Dashboard Application</p>
        </div>
        <nav className="flex-1">
          <button
            onClick={() => handleNavigate('/home')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-2 ${
              isActive('/home')
                ? 'bg-[#0099A8] text-white'
                : 'text-white/80 hover:bg-[#0099A8]/30'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => handleNavigate('/data')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/data')
                ? 'bg-[#0099A8] text-white'
                : 'text-white/80 hover:bg-[#0099A8]/30'
            }`}
          >
            <Database className="w-5 h-5" />
            <span>Data</span>
          </button>
        </nav>
        <div className="mt-auto pt-6 border-t border-white/10">
          <p className="text-xs text-white/50">© 2025 InfoPanel</p>
        </div>
      </aside>
    </>
  );
}
