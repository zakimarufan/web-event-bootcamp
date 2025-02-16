'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Get user role from stored profile or API
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    setUserRole(userProfile.role);
  }, []);

  // Add page title based on current path
  const getPageTitle = () => {
    const path = pathname.split('/').pop();
    return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle()}</h1>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
