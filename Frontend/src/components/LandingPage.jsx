import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  FileText, 
  Clock, 
  Brain,
  ChevronRight,
  Check,
  Play,
  RefreshCw,
  Star,
  Users,
  Zap,
  Twitter,
  Linkedin,
  Github,
  Mail,
  ArrowUp
} from 'lucide-react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false); 
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate refresh action
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleStart = () => {
    navigate('/upload');
  };

  const features = [
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Real-time Transcription",
      description: "Convert speech to text instantly with high accuracy"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Smart Summaries",
      description: "Get concise, actionable meeting highlights"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Time-Saving",
      description: "Reduce meeting documentation time by 80%"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Insights",
      description: "Extract key decisions and action items automatically"
    }
  ];

  const stats = [
    { icon: <Users />, value: "10K+", label: "Active Users" },
    { icon: <Star />, value: "4.9", label: "User Rating" },
    { icon: <Zap />, value: "95%", label: "Accuracy" }
  ];
  const footerLinks = {
    Product: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Integrations', href: '#' },
      { label: 'Updates', href: '#' },
    ],
    Company: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Press Kit', href: '#' },
    ],
    Resources: [
      { label: 'Documentation', href: '#' },
      { label: 'Help Center', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    Legal: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'Status', href: '#' },
    ],
  };
  return (
    <div className="w-full h-full bg-gray-900 text-white ">
      <Navbar />
      {/* Refresh Button */}
      <div className="fixed top-20   right-4 z-50">
        <button 
          onClick={handleRefresh}
          className={`p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-all ${
            isRefreshing ? 'animate-spin' : ''
          }`}
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Enhanced Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-gray-900" />
          <div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"
            style={{
              transform: `translate3d(0, ${scrollY * 0.2}px, 0)`
            }}
          />
          {/* Floating Elements */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-blue-500/10 rounded-full"
                style={{
                  width: Math.random() * 100 + 50 + 'px',
                  height: Math.random() * 100 + 50 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  transform: `translate3d(0, ${scrollY * (0.1 + Math.random() * 0.2)}px, 0)`,
                  transition: 'transform 0.2s ease-out'
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 py-20">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-2 text-blue-400">
              <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                New Feature
              </div>
              <span>AI-Powered Meeting Analytics</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Transform Your Meetings
              </span>
              <br />
              <span className="text-white">
                Into Action
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Leverage AI to automatically transcribe, summarize, and extract actionable insights 
              from your meetings in real-time.
            </p>

            <div className="flex gap-4 mb-12">
              <button onClick={handleStart} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg flex items-center gap-2 transition-all transform hover:scale-105">
                Get Started <ChevronRight className="w-4 h-4" />
              </button>
              <button className="border border-blue-600 hover:bg-blue-600/10 px-8 py-4 rounded-lg flex items-center gap-2 transition-all">
                Watch Demo <Play className="w-4 h-4" />
              </button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center p-4 rounded-lg bg-blue-600/10 backdrop-blur-lg"
                >
                  <div className="text-blue-400 mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
              className={`p-6 rounded-xl transition-all duration-300 ${
                hoveredFeature === index 
                  ? 'bg-blue-600/20 scale-105' 
                  : 'bg-gray-800/50'
              }`}
            >
              <div className="mb-4 text-blue-400">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-900/50 to-blue-600/50 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Meetings?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are saving time and improving their meeting productivity
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 justify-center transition-all">
              Start Free Trial <Check className="w-4 h-4" />
            </button>
            <button className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3 rounded-lg transition-all">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
      <footer className="relative border-t border-gray-800">
        {/* Newsletter Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-blue-900/30 to-blue-600/30 rounded-xl p-8 mb-12">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-gray-300 mb-6">
                Get the latest updates on new features and AI innovations
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-blue-500/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-lg font-semibold mb-4 text-gray-100">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                MeetingAI
              </div>
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg transition-all transform ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}

export default LandingPage;