'use client';

import { LogOut, MenuIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';


interface NavbarProps {
  onToggleSidebar?: () => void;
}

export function Navbar({ onToggleSidebar }: NavbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear any stored auth data (if implemented)
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
          aria-label="Toggle sidebar"
        >
          <MenuIcon size={20} className="text-gray-600 cursor-pointer" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
      >
        <LogOut size={18} />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </header>
  );
}
