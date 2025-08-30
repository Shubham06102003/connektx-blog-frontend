'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import { publicApi } from '@/lib/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, FolderOpen, Users, Eye } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    featuredBlogs: 0,
    totalCategories: 0,
    totalViews: 0,
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    setIsAuthenticated(true);
    fetchDashboardData();
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      const [blogsRes, categoriesRes] = await Promise.all([
        publicApi.getBlogs(),
        publicApi.getCategories(),
      ]);

      const blogs = blogsRes.data;
      const publishedBlogs = blogs.filter(blog => blog.published);
      const featuredBlogs = blogs.filter(blog => blog.featured);
      const totalViews = blogs.reduce((sum, blog) => sum + blog.count, 0);

      setStats({
        totalBlogs: blogs.length,
        publishedBlogs: publishedBlogs.length,
        featuredBlogs: featuredBlogs.length,
        totalCategories: categoriesRes.data.length,
        totalViews,
      });

      // Create chart data for blog views
      const chartData = blogs
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
        .map(blog => ({
          name: blog.title.length > 20 ? blog.title.substring(0, 20) + '...' : blog.title,
          views: blog.count
        }));
      
      setChartData(chartData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to your blog admin panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FileText className="text-blue-600 mr-3" size={24} />
              <div>
                <p className="text-sm text-gray-600">Total Blogs</p>
                <p className="text-2xl font-bold">{stats.totalBlogs}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="text-green-600 mr-3" size={24} />
              <div>
                <p className="text-sm text-gray-600">Published</p>
                <p className="text-2xl font-bold">{stats.publishedBlogs}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FolderOpen className="text-purple-600 mr-3" size={24} />
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold">{stats.totalCategories}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Eye className="text-orange-600 mr-3" size={24} />
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold">{stats.totalViews}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Top 5 Most Viewed Blogs</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
