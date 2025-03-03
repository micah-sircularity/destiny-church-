import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaCalendarAlt, 
  FaPencilAlt, 
  FaChartBar, 
  FaFileAlt,
  FaDatabase
} from 'react-icons/fa';

const NavItem = ({ to, icon, text }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex items-center py-3 px-4 rounded-md transition-colors ${
          isActive 
            ? 'bg-primary text-white' 
            : 'text-gray-600 hover:bg-gray-100'
        }`
      }
    >
      {icon}
      <span className="ml-3">{text}</span>
    </NavLink>
  );
};

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-sm h-full">
      <div className="py-6 px-4">
        <nav className="mt-5 space-y-2">
          <NavItem to="/" icon={<FaHome />} text="Dashboard" />
          <NavItem to="/content-calendar" icon={<FaCalendarAlt />} text="Content Calendar" />
          <NavItem to="/post-composer" icon={<FaPencilAlt />} text="Post Composer" />
          <NavItem to="/analytics" icon={<FaChartBar />} text="Analytics" />
          <NavItem to="/reporting" icon={<FaFileAlt />} text="Reporting" />
          <NavItem to="/data-management" icon={<FaDatabase />} text="Data Management" />
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
