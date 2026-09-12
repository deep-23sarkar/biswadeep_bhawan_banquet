'use client';

import { Card } from '@/components/ui/card';
import { HomeIcon, BookMarked, Image, Video } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    {
      label: 'Total Bookings',
      value: '24',
      icon: BookMarked,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Images Uploaded',
      value: '156',
      icon: Image,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Videos Uploaded',
      value: '8',
      icon: Video,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
    // {
    //   label: 'Total Users',
    //   value: '342',
    //   icon: Users,
    //   color: 'text-green-600',
    //   bgColor: 'bg-green-50',
    // },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to your admin panel. Here&apos;s an overview of your activity.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`rounded-lg ${stat.bgColor} p-3`}>
                    <Icon size={24} className={stat.color} />
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Hello Sir!</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">Biswadeep Bhavan</p>
                  </div>
                  <div className={`rounded-lg bg-green-50 p-3`}>
                    <HomeIcon size={24} className="text-green-600" />
                  </div>
                </div>
              </div>
            </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href="/admin/bookings"
            className="group rounded-lg border border-gray-200 bg-white p-6 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <BookMarked size={28} className="mb-3 text-blue-600" />
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              Manage Bookings
            </h3>
            <p className="mt-1 text-sm text-gray-600">View and manage all booking requests</p>
          </a>

          <a
            href="/admin/upload-images"
            className="group rounded-lg border border-gray-200 bg-white p-6 hover:border-purple-300 hover:shadow-md transition-all"
          >
            <Image size={28} className="mb-3 text-purple-600" />
            <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
              Upload Images
            </h3>
            <p className="mt-1 text-sm text-gray-600">Add and manage image gallery</p>
          </a>

          <a
            href="/admin/upload-videos"
            className="group rounded-lg border border-gray-200 bg-white p-6 hover:border-pink-300 hover:shadow-md transition-all"
          >
            <Video size={28} className="mb-3 text-pink-600" />
            <h3 className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
              Upload Videos
            </h3>
            <p className="mt-1 text-sm text-gray-600">Upload and manage video content</p>
          </a>
        </div>
      </div>
    </div>
  );
}
