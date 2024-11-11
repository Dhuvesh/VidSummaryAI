// DashboardNavbar.js
import React, { useState, useEffect } from 'react';
import { 
  Bell,
  Search,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
  HelpCircle,
  MessageSquare,
  Calendar,
  BarChart2,
  Clock,
  CheckCircle
} from 'lucide-react';

const DashboardNavbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample notifications
  const notifications = [
    {
      id: 1,
      title: 'New Meeting Summary',
      description: 'Daily standup meeting summary is ready',
      time: '5m ago',
      icon: <CheckCircle className="w-4 h-4 text-green-400" />,
      unread: true
    },
    {
      id: 2,
      title: 'Meeting Reminder',
      description: 'Product review in 30 minutes',
      time: '1h ago',
      icon: <Clock className="w-4 h-4 text-blue-400" />,
      unread: true
    },
    {
      id: 3,
      title: 'Analytics Report',
      description: 'Monthly meeting metrics updated',
      time: '2h ago',
      icon: <BarChart2 className="w-4 h-4 text-purple-400" />,
      unread: false
    }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setIsNotificationsOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  // Notifications dropdown
  const NotificationsDropdown = () => (
    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <button className="text-sm text-blue-500 hover:text-blue-600">
            Mark all as read
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
              notification.unread ? 'bg-blue-50 dark:bg-blue-900/10' : ''
            }`}
          >
            <div className="flex gap-3">
              <div className="flex-shrink-0">{notification.icon}</div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {notification.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {notification.description}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {notification.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center">
        <button className="text-sm text-blue-500 hover:text-blue-600">
          View all notifications
        </button>
      </div>
    </div>
  );

  // Profile dropdown
  const ProfileDropdown = () => (
    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">John Doe</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">john@example.com</p>
      </div>
      <div className="p-2">
        <a
          href="#profile"
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <User className="w-4 h-4" />
          Profile
        </a>
        <a
          href="#settings"
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <Settings className="w-4 h-4" />
          Settings
        </a>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <hr className="my-2 border-gray-200 dark:border-gray-700" />
        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Dashboard
              </span>
            </div>
          </div>

          {/* Center section - Search */}
          <div className="hidden md:block flex-1 max-w-xl px-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search meetings, transcripts, or summaries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 dark:bg-gray-700 border-0 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </form>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            {/* Mobile search button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Help */}
            <button className="p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
              <HelpCircle className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <div className="relative dropdown-container">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
                </div>
              </button>
              {isNotificationsOpen && <NotificationsDropdown />}
            </div>

            {/* Profile */}
            <div className="relative dropdown-container">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <img
                  src="/api/placeholder/32/32"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <ChevronDown className="w-4 h-4" />
              </button>
              {isProfileOpen && <ProfileDropdown />}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      {isSearchOpen && (
        <div className="md:hidden p-4 border-t border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-700 border-0 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </form>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;