import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { FaCalendarPlus, FaPencilAlt, FaChartLine } from 'react-icons/fa';

const DashboardCard = ({ title, icon, description, linkTo, linkText, bgColor }) => (
  <div className={`rounded-lg shadow-md p-6 ${bgColor} text-white`}>
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-lg font-semibold ml-2">{title}</h3>
    </div>
    <p className="mb-4">{description}</p>
    <Link to={linkTo} className="inline-block px-4 py-2 bg-white rounded-md text-gray-800 font-medium hover:bg-gray-100 transition-colors">
      {linkText}
    </Link>
  </div>
);

const Dashboard = () => {
  const { posts, loading } = useAppContext();
  
  const scheduledPosts = posts.filter(post => post.status === 'scheduled');
  const draftPosts = posts.filter(post => post.status === 'draft');
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-medium text-gray-500">Scheduled Posts</h3>
          <p className="text-3xl font-bold">{scheduledPosts.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-medium text-gray-500">Draft Posts</h3>
          <p className="text-3xl font-bold">{draftPosts.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-medium text-gray-500">Platforms</h3>
          <p className="text-3xl font-bold">3</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard 
          title="Content Calendar" 
          icon={<FaCalendarPlus className="h-5 w-5" />}
          description="Schedule and manage your social media content calendar" 
          linkTo="/content-calendar" 
          linkText="View Calendar" 
          bgColor="bg-primary"
        />
        <DashboardCard 
          title="Create New Post" 
          icon={<FaPencilAlt className="h-5 w-5" />}
          description="Compose and schedule a new social media post" 
          linkTo="/post-composer" 
          linkText="Create Post" 
          bgColor="bg-secondary"
        />
        <DashboardCard 
          title="Analytics Overview" 
          icon={<FaChartLine className="h-5 w-5" />}
          description="View your social media performance metrics" 
          linkTo="/analytics" 
          linkText="View Analytics" 
          bgColor="bg-indigo-600"
        />
      </div>
    </div>
  );
};

export default Dashboard;
