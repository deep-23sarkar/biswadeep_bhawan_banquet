'use client';

import { BookOpen, ImagePlus, Video, Home, X, PictureInPicture, FileVideo2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: Home,
  },
  {
    label: 'Bookings',
    href: '/admin/bookings',
    icon: BookOpen,
  },
  {
    label: 'Upload Images',
    href: '/admin/upload-images',
    icon: ImagePlus,
  },
  {
    label: 'Upload Videos',
    href: '/admin/upload-videos',
    icon: Video,
  },
  {
    label: 'All Pictures',
    href: '/admin/show-pictures',
    icon: PictureInPicture
  },
  {
    label: 'All Reviews',
    href: '/admin/show-reviews',
    icon: FileVideo2
  }
];

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 z-30 h-[calc(100vh-64px)] w-64 border-r border-gray-200 bg-gray-50 p-6 transition-transform duration-300 md:static md:top-0 md:h-screen md:translate-x-0 md:border-r md:bg-gray-50',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between md:hidden">
          <h2 className="font-semibold text-gray-900">Navigation</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-gray-200"
            aria-label="Close sidebar"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <nav className="mt-8 space-y-2 md:mt-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
