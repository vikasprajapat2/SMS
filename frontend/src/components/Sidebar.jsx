import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Globe, LayoutDashboard, Users, UserSquare2, BookOpen,
  GraduationCap, Calendar, FileText, Settings, Bell,
  Mail, HelpCircle, CreditCard, BarChart2, Layers,
  ShoppingBag, Award, MessageSquare, Home, PieChart, Activity,
  Database, Shield, Star, Package, Clipboard, Video, Music,
  Heart, Zap, Target, Coffee
} from 'lucide-react';

const Sidebar = () => {
  const icons = [
    Globe, LayoutDashboard, Users, UserSquare2, GraduationCap, 
    BookOpen, Calendar, CreditCard, BarChart2, FileText, 
    Bell, Mail, Activity, PieChart, Shield, Database, 
    Award, Target, Clipboard, Heart, Layers, Video, 
    Coffee, Zap, Settings, HelpCircle
  ];

  return (
    <aside className="w-14 bg-white border-r border-slate-100 h-screen sticky top-0 flex flex-col items-center py-3 gap-1 z-20 overflow-y-auto">
      {/* Logo */}
      <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center mb-4 flex-shrink-0 shadow-lg" style={{boxShadow:'0 4px 14px rgba(79,70,229,0.4)'}}>
        <GraduationCap className="text-white" size={18} />
      </div>

      {icons.map((Icon, index) => (
        <NavLink
          key={index}
          to={index === 1 ? '/' : `/${index}`}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
        >
          <Icon size={17} />
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
