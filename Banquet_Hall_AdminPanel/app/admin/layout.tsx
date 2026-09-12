'use client';

import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { useState } from 'react';



export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  //   // Check if user is authenticated
  //   const authToken = localStorage.getItem('authToken');
  //   if (!authToken) {
  //     router.push('/login');
  //   }
  // }, [router]);

  // if (!mounted) {
  //   return (
  //     <div className="flex h-screen items-center justify-center">
  //       <div className="text-gray-500">Loading...</div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex h-screen flex-col bg-white">
      {/* Navbar */}
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
