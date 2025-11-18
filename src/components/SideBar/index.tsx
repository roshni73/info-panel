import { Home, Database, X } from "lucide-react";
import "./sidebar.css";

interface SidebarProps {
  currentPage: "home" | "data";
  onNavigate: (page: "home" | "data") => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ currentPage, onNavigate, isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { id: "home" as const, label: "Home", icon: Home },
    { id: "data" as const, label: "Data", icon: Database },
  ];

  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside
        className={`sidebar ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="sidebar-header">
          <div className="flex items-center justify-between">
            <div className="sidebar-logo">
              <h1 className="sidebar-title">
                <span className="sidebar-title-info">Info</span>
                <span className="sidebar-title-panel">Panel</span>
              </h1>
            </div>
            <button
              onClick={onClose}
              className="md:hidden p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <p className="sidebar-subtitle">Analytics Dashboard</p>
        </div>
        <nav className="sidebar-nav">
          <ul className="sidebar-list">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`sidebar-item ${
                      isActive ? "sidebar-item-active" : "sidebar-item-inactive"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="sidebar-footer">
          <p className="sidebar-footer-text">v1.0.0</p>
        </div>
      </aside>
    </>
  );
}