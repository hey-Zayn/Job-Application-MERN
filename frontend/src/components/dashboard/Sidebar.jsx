import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  FileText, 
  MessageSquare, 
  Settings, 
  BarChart3,
  Building,
  Calendar,
  Bell,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Sidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/recruiter/dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      name: 'Job Postings',
      href: '/recruiter/jobs',
      icon: Briefcase,
      badge: '12'
    },
    {
      name: 'Candidates',
      href: '/recruiter/candidates',
      icon: Users,
      badge: '24'
    },
    {
      name: 'Applications',
      href: '/recruiter/applications',
      icon: FileText,
      badge: '48'
    },
    {
      name: 'Interviews',
      href: '/recruiter/interviews',
      icon: Calendar,
      badge: '8'
    },
    {
      name: 'Company',
      href: '/recruiter/company',
      icon: Building,
      badge: null
    },
    {
      name: 'Analytics',
      href: '/recruiter/analytics',
      icon: BarChart3,
      badge: null
    },
    {
      name: 'Messages',
      href: '/recruiter/messages',
      icon: MessageSquare,
      badge: '3'
    }
  ];

  const bottomMenuItems = [
    {
      name: 'Notifications',
      href: '/recruiter/notifications',
      icon: Bell,
      badge: '5'
    },
    {
      name: 'Settings',
      href: '/recruiter/settings',
      icon: Settings,
      badge: null
    },
    {
      name: 'Help & Support',
      href: '/recruiter/help',
      icon: HelpCircle,
      badge: null
    }
  ];

  const isActive = (href) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <div className={cn(
      "flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-lg">JobPilot</h1>
              <p className="text-xs text-gray-500">Recruiter</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mx-auto">
            <Briefcase className="h-5 w-5 text-white" />
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0 hover:bg-gray-100"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* User Profile */}
      <div className={cn(
        "p-4 border-b border-gray-200",
        collapsed ? "px-2" : "px-4"
      )}>
        <div className={cn(
          "flex items-center gap-3",
          collapsed && "justify-center"
        )}>
          <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
            <AvatarImage src="/avatars/recruiter.jpg" alt="Recruiter" />
            <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
              RJ
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm truncate">
                Sarah Johnson
              </h3>
              <p className="text-xs text-gray-500 truncate">
                Senior Recruiter
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 group",
                  active
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  collapsed ? "justify-center" : "justify-between"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn(
                    "h-5 w-5 flex-shrink-0",
                    active ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                  )} />
                  {!collapsed && (
                    <span>{item.name}</span>
                  )}
                </div>
                
                {!collapsed && item.badge && (
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "h-5 px-1.5 text-xs font-medium",
                      active ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
                
                {collapsed && item.badge && (
                  <div className="absolute top-1 right-1">
                    <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Menu */}
      <div className="border-t border-gray-200 p-4 space-y-2">
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 group",
                active
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                collapsed ? "justify-center" : "justify-between"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn(
                  "h-5 w-5 flex-shrink-0",
                  active ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                )} />
                {!collapsed && (
                  <span>{item.name}</span>
                )}
              </div>
              
              {!collapsed && item.badge && (
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "h-5 px-1.5 text-xs font-medium",
                    active ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
                  )}
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}

        {/* Logout Button */}
        <button className={cn(
          "flex items-center w-full rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group",
          collapsed ? "justify-center" : "justify-start gap-3"
        )}>
          <LogOut className="h-5 w-5 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Quick Stats - Only show when expanded */}
      {!collapsed && (
        <div className="border-t border-gray-200 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 m-3 rounded-lg">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600">Active Jobs</span>
              <span className="font-semibold text-gray-900">12</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600">New Apps</span>
              <span className="font-semibold text-gray-900">8</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600">Interviews</span>
              <span className="font-semibold text-gray-900">5</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;