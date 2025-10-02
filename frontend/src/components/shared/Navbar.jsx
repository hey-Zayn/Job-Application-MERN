import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import { BaggageClaim, BriefcaseBusiness, Phone, Search, Globe, User, LogOut } from "lucide-react";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getDisplayName = () => {
    if (!user) return '';
    return user.fullName || user.email?.split('@')[0] || 'User';
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      {/* Top Bar */}
      <div className="w-full bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-6 text-sm">
            <Link to="/employers" className="hover:text-blue-200 transition-colors">
              For Employers
            </Link>
            <Link to="/candidates" className="hover:text-blue-200 transition-colors">
              For Candidates
            </Link>
            <Link to="/pricing" className="hover:text-blue-200 transition-colors">
              Pricing
            </Link>
            <Link to="/support" className="hover:text-blue-200 transition-colors">
              Customer Support
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+923003636186"
              className="flex items-center gap-2 hover:text-blue-200 transition-colors text-sm"
              title="Call us"
            >
              <Phone size={16} />
              <span className="hidden sm:inline">+92 300 3636186</span>
            </a>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700 p-2 h-8">
                  <Globe size={16} />
                  <span className="ml-1 text-sm">EN</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-40 p-2" align="end">
                <div className="flex flex-col gap-1">
                  <Button variant="ghost" size="sm" className="justify-start gap-2">
                    <span className="text-sm">🇺🇸 English</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start gap-2">
                    <span className="text-sm">🇵🇰 Urdu</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start gap-2">
                    <span className="text-sm">🇫🇷 French</span>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BriefcaseBusiness className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Job<span className="text-blue-600">Pilot</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`font-medium text-sm transition-colors px-2 py-1 rounded-md ${
                isActiveLink("/") 
                  ? "text-blue-600 bg-blue-50" 
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className={`font-medium text-sm transition-colors px-2 py-1 rounded-md ${
                isActiveLink("/jobs") 
                  ? "text-blue-600 bg-blue-50" 
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Find Jobs
            </Link>
            <Link
              to="/companies"
              className={`font-medium text-sm transition-colors px-2 py-1 rounded-md ${
                isActiveLink("/companies") 
                  ? "text-blue-600 bg-blue-50" 
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Browse Companies
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:block w-[400px] mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors placeholder-gray-500 text-sm shadow-sm"
                placeholder="Search jobs, companies, or keywords..."
                aria-label="Search"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {!user ? (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {/* Mobile Search Icon */}
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Search className="h-5 w-5" />
                </Button>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="User menu"
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={user.profile?.profilePhoto}
                          alt={getDisplayName()}
                        />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {getInitials(getDisplayName())}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:inline text-sm font-medium text-gray-700">
                        {getDisplayName()}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-4" align="end">
                    <div className="flex items-center gap-3 mb-4 p-2 bg-gray-50 rounded-lg">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={user.profile?.profilePhoto}
                          alt={getDisplayName()}
                        />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {getInitials(getDisplayName())}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-sm font-semibold text-gray-900">
                          {getDisplayName()}
                        </h2>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        <p className="text-xs text-blue-600 capitalize mt-1">
                          {user.role}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Link to="/profile">
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <User className="h-4 w-4" />
                          View Profile
                        </Button>
                      </Link>
                      
                      {user.role === 'student' && (
                        <Link to="/my-jobs">
                          <Button variant="outline" className="w-full justify-start gap-2">
                            <BriefcaseBusiness className="h-4 w-4" />
                            My Applications
                          </Button>
                        </Link>
                      )}
                      
                      {user.role === 'recruiter' && (
                        <Link to="/dashboard">
                          <Button variant="outline" className="w-full justify-start gap-2">
                            <BaggageClaim className="h-4 w-4" />
                            Recruiter Dashboard
                          </Button>
                        </Link>
                      )}
                      
                      <Button 
                        variant="destructive" 
                        className="w-full justify-start gap-2"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors placeholder-gray-500 text-sm"
              placeholder="Search jobs, companies, or keywords..."
              aria-label="Search"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;