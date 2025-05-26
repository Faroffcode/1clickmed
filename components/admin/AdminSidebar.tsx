import React from 'react';
import { APP_NAME } from '../../constants'; // Import APP_NAME

type AdminPage = 'dashboard' | 'doctors' | 'hospitals' | 'medical-shops' | 'labs' | 'messages' | 'settings';

interface AdminSidebarProps {
  activePage: AdminPage;
  setActivePage: (page: AdminPage) => void;
}

interface NavItemProps {
  iconClass: string;
  label: string;
  page: AdminPage;
  activePage: AdminPage;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ iconClass, label, page, activePage, onClick }) => {
  const isActive = activePage === page;
  return (
    <li>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); onClick(); }}
        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150
                    ${isActive 
                      ? 'bg-sky-600 text-white shadow-lg' 
                      : 'text-slate-300 hover:bg-slate-700 hover:text-slate-100'
                    }`}
        aria-current={isActive ? 'page' : undefined}
      >
        <i className={`${iconClass} w-5 h-5 mr-3`} aria-hidden="true"></i>
        {label}
        {isActive && <i className="fas fa-chevron-right ml-auto text-xs opacity-75"></i>}
      </a>
    </li>
  );
};

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activePage, setActivePage }) => {
  const navItems: Omit<NavItemProps, 'activePage' | 'onClick'>[] = [
    { iconClass: 'fas fa-tachometer-alt', label: 'Dashboard', page: 'dashboard' },
    { iconClass: 'fas fa-user-doctor', label: 'Doctors', page: 'doctors' },
    { iconClass: 'fas fa-hospital', label: 'Hospitals', page: 'hospitals' },
    { iconClass: 'fas fa-store', label: 'Medical Shops', page: 'medical-shops' },
    { iconClass: 'fas fa-flask-vial', label: 'Pathology Labs', page: 'labs' },
    { iconClass: 'fas fa-envelope', label: 'Contact Messages', page: 'messages' },
    { iconClass: 'fas fa-cog', label: 'Settings', page: 'settings' },
  ];

  return (
    <aside className="w-64 bg-slate-900 p-4 flex flex-col border-r border-slate-700/50">
      <div className="flex items-center mb-8 px-2 pt-2">
        <span className="text-2xl font-bold text-sky-400">1click</span>
        <span className="text-2xl font-bold text-white">Med</span>
        <span className="ml-2 text-xs font-semibold bg-sky-500 text-white px-2 py-0.5 rounded-full">Admin</span>
      </div>
      <nav>
        <ul className="space-y-2">
          {navItems.map(item => (
            <NavItem
              key={item.page}
              {...item}
              activePage={activePage}
              onClick={() => setActivePage(item.page)}
            />
          ))}
        </ul>
      </nav>
      <div className="mt-auto p-2 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} {APP_NAME} Admin
      </div>
    </aside>
  );
};

export default AdminSidebar;