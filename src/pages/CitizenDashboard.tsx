import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  FileText, 
  Bell, 
  Users, 
  BookOpen, 
  Phone, 
  Home as HomeIcon,
  Upload,
  Camera,
  MapPin,
  Calendar,
  MessageSquare,
  ThumbsUp,
  Filter,
  Search
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CitizenDashboard: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.includes(path);
  };

  const sidebarItems = [
    { path: '/citizen-dashboard', icon: HomeIcon, label: 'Dashboard Home' },
    { path: '/citizen-dashboard/report-issue', icon: FileText, label: 'Report Issue' },
    { path: '/citizen-dashboard/check-updates', icon: Bell, label: 'Check Updates' },
    { path: '/citizen-dashboard/community', icon: Users, label: 'Community Wall' },
    { path: '/citizen-dashboard/blog', icon: BookOpen, label: 'Blog & Awareness' },
    { path: '/citizen-dashboard/contact', icon: Phone, label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-[#fdfaf6] flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-[#E0E0E0]">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#FFA559] rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-xl">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="font-semibold text-[#333333]">{user?.name}</h2>
            <p className="text-sm text-[#666666]">Citizen</p>
          </div>
          
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-[#FFF5E4] text-[#FFA559]'
                    : 'text-[#666666] hover:bg-[#FFF5E4] hover:text-[#FFA559]'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/report-issue" element={<ReportIssue />} />
          <Route path="/check-updates" element={<CheckUpdates />} />
          <Route path="/community" element={<Community />} />
          <Route path="/blog" element={<BlogAwareness />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
};

const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">
          Welcome, {user?.name}!
        </h1>
        <p className="text-[#666666]">
          Your civic engagement dashboard - making your city better, one report at a time.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E0E0E0]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#666666]">Issues Reported</p>
              <p className="text-2xl font-bold text-[#333333]">3</p>
            </div>
            <FileText className="w-8 h-8 text-[#FFA559]" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E0E0E0]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#666666]">Resolved</p>
              <p className="text-2xl font-bold text-[#C9F4AA]">2</p>
            </div>
            <Bell className="w-8 h-8 text-[#C9F4AA]" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E0E0E0]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#666666]">Community Upvotes</p>
              <p className="text-2xl font-bold text-[#FFC26F]">12</p>
            </div>
            <ThumbsUp className="w-8 h-8 text-[#FFC26F]" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E0E0E0]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#666666]">Impact Score</p>
              <p className="text-2xl font-bold text-[#FFA559]">85</p>
            </div>
            <Users className="w-8 h-8 text-[#FFA559]" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Link
          to="/citizen-dashboard/report-issue"
          className="bg-[#FFA559] text-white p-6 rounded-lg hover:bg-[#FF7F3F] transition-colors group"
        >
          <FileText className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-semibold mb-2">Report New Issue</h3>
          <p className="text-sm opacity-90">Upload photos and describe civic problems</p>
        </Link>
        <Link
          to="/citizen-dashboard/check-updates"
          className="bg-[#FFC26F] text-white p-6 rounded-lg hover:bg-[#FF7F3F] transition-colors group"
        >
          <Bell className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-semibold mb-2">Check Updates</h3>
          <p className="text-sm opacity-90">Track your reported issues</p>
        </Link>
        <Link
          to="/citizen-dashboard/community"
          className="bg-[#C9F4AA] text-white p-6 rounded-lg hover:bg-[#a8e686] transition-colors group"
        >
          <Users className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-semibold mb-2">Join Community</h3>
          <p className="text-sm opacity-90">Connect with fellow citizens</p>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
        <h2 className="text-xl font-semibold text-[#333333] mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 bg-[#FFF5E4] rounded-lg">
            <div className="w-2 h-2 bg-[#FFA559] rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#333333]">Pothole reported on Main Street</p>
              <p className="text-xs text-[#666666]">2 days ago • Status: In Progress</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-[#C9F4AA] bg-opacity-20 rounded-lg">
            <div className="w-2 h-2 bg-[#C9F4AA] rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#333333]">Streetlight issue resolved</p>
              <p className="text-xs text-[#666666]">1 week ago • Status: Completed</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-[#FFF5E4] rounded-lg">
            <div className="w-2 h-2 bg-[#FFC26F] rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#333333]">Garbage collection complaint</p>
              <p className="text-xs text-[#666666]">1 week ago • Status: Pending</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReportIssue: React.FC = () => {
  const [formData, setFormData] = useState({
    issueType: '',
    location: '',
    description: '',
    file: null as File | null
  });
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, file });
  };

  const handleLocationDetect = () => {
    setUseCurrentLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({ 
            ...formData, 
            location: `${position.coords.latitude}, ${position.coords.longitude}` 
          });
          alert('Location detected successfully!');
        },
        () => {
          alert('Unable to detect location. Please enter manually.');
          setUseCurrentLocation(false);
        }
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Issue reported successfully! Issue ID: #JAG' + Date.now().toString().slice(-6));
    setFormData({ issueType: '', location: '', description: '', file: null });
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Report Issue</h1>
        <p className="text-[#666666]">Help us fix problems in your community</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Issue Type *
            </label>
            <select
              value={formData.issueType}
              onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
              className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
              required
            >
              <option value="">Select Issue Type</option>
              <option value="Road">Road & Transportation</option>
              <option value="Water">Water Supply</option>
              <option value="Electricity">Electricity</option>
              <option value="Garbage">Garbage & Sanitation</option>
              <option value="Streetlight">Street Lighting</option>
              <option value="Drainage">Drainage</option>
              <option value="Traffic">Traffic Issues</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Location *
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="flex-1 px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                placeholder="Enter location or detect automatically"
                required
              />
              <button
                type="button"
                onClick={handleLocationDetect}
                className="px-4 py-2 bg-[#FFC26F] text-white rounded-lg hover:bg-[#FF7F3F] transition-colors flex items-center space-x-2"
              >
                <MapPin className="w-4 h-4" />
                <span>Detect</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Upload Image/Video *
            </label>
            <div className="border-2 border-dashed border-[#E0E0E0] rounded-lg p-6 text-center hover:border-[#FFA559] transition-colors">
              <input
                type="file"
                onChange={handleFileUpload}
                accept="image/*,video/*"
                className="hidden"
                id="file-upload"
                required
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 text-[#FFA559] mx-auto mb-2" />
                <p className="text-sm text-[#666666]">
                  {formData.file ? formData.file.name : 'Click to upload image or video'}
                </p>
                <p className="text-xs text-[#666666] mt-1">Max size: 10MB</p>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
              rows={4}
              placeholder="Describe the issue in detail..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFA559] text-white py-3 rounded-lg font-semibold hover:bg-[#FF7F3F] transition-colors"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

const CheckUpdates: React.FC = () => {
  const [searchData, setSearchData] = useState({
    issueId: '',
    date: ''
  });
  const [searchResult, setSearchResult] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate search result
    setSearchResult({
      id: searchData.issueId || '#JAG123456',
      type: 'Road',
      location: 'Main Street, Jaipur',
      status: 'In Progress',
      reportedDate: '2025-01-10',
      updatedDate: '2025-01-12',
      description: 'Large pothole causing traffic issues',
      updates: [
        { date: '2025-01-10', status: 'Reported', note: 'Issue reported by citizen' },
        { date: '2025-01-11', status: 'Acknowledged', note: 'Issue forwarded to PWD' },
        { date: '2025-01-12', status: 'In Progress', note: 'Work team assigned' }
      ]
    });
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Check Updates</h1>
        <p className="text-[#666666]">Track the status of your reported issues</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6 mb-6">
        <form onSubmit={handleSearch} className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchData.issueId}
              onChange={(e) => setSearchData({ ...searchData, issueId: e.target.value })}
              className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
              placeholder="Enter Issue ID (e.g., #JAG123456)"
            />
          </div>
          <div>
            <input
              type="date"
              value={searchData.date}
              onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
              className="px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-[#FFA559] text-white rounded-lg hover:bg-[#FF7F3F] transition-colors flex items-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </form>
      </div>

      {searchResult && (
        <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#333333]">Issue Details</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                searchResult.status === 'Completed' ? 'bg-[#C9F4AA] text-white' :
                searchResult.status === 'In Progress' ? 'bg-[#FFC26F] text-white' :
                'bg-[#FF6B6B] text-white'
              }`}>
                {searchResult.status}
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-[#666666]">Issue ID</p>
                <p className="font-medium text-[#333333]">{searchResult.id}</p>
              </div>
              <div>
                <p className="text-sm text-[#666666]">Type</p>
                <p className="font-medium text-[#333333]">{searchResult.type}</p>
              </div>
              <div>
                <p className="text-sm text-[#666666]">Location</p>
                <p className="font-medium text-[#333333]">{searchResult.location}</p>
              </div>
              <div>
                <p className="text-sm text-[#666666]">Reported Date</p>
                <p className="font-medium text-[#333333]">{searchResult.reportedDate}</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-[#666666] mb-2">Description</p>
              <p className="text-[#333333]">{searchResult.description}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#333333] mb-4">Update Timeline</h3>
            <div className="space-y-4">
              {searchResult.updates.map((update: any, index: number) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-[#FFA559] rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#333333]">{update.status}</span>
                      <span className="text-sm text-[#666666]">{update.date}</span>
                    </div>
                    <p className="text-sm text-[#666666] mt-1">{update.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Community: React.FC = () => {
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    date: ''
  });

  const mockIssues = [
    {
      id: '#JAG123456',
      type: 'Road',
      title: 'Pothole on Main Street',
      location: 'Main Street, Jaipur',
      status: 'In Progress',
      upvotes: 12,
      comments: 5,
      reportedDate: '2025-01-10',
      userVoted: false
    },
    {
      id: '#JAG123457',
      type: 'Water',
      title: 'Water supply disruption',
      location: 'Sector 15, Jaipur',
      status: 'Completed',
      upvotes: 8,
      comments: 3,
      reportedDate: '2025-01-08',
      userVoted: true
    }
  ];

  const handleUpvote = (issueId: string) => {
    alert(`Upvoted issue ${issueId}!`);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Community Wall</h1>
        <p className="text-[#666666]">See what's happening in your neighborhood</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
          >
            <option value="">All Types</option>
            <option value="Road">Road</option>
            <option value="Water">Water</option>
            <option value="Electricity">Electricity</option>
            <option value="Garbage">Garbage</option>
          </select>
          
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
          />
          
          <button className="px-4 py-2 bg-[#FFA559] text-white rounded-lg hover:bg-[#FF7F3F] transition-colors flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Apply</span>
          </button>
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {mockIssues.map((issue) => (
          <div key={issue.id} className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2 py-1 bg-[#FFF5E4] text-[#FFA559] text-xs font-medium rounded">
                    {issue.type}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    issue.status === 'Completed' ? 'bg-[#C9F4AA] text-white' :
                    issue.status === 'In Progress' ? 'bg-[#FFC26F] text-white' :
                    'bg-[#FF6B6B] text-white'
                  }`}>
                    {issue.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#333333] mb-1">{issue.title}</h3>
                <p className="text-sm text-[#666666] mb-2">📍 {issue.location}</p>
                <p className="text-sm text-[#666666]">Reported on {issue.reportedDate}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#666666]">{issue.id}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleUpvote(issue.id)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-colors ${
                    issue.userVoted 
                      ? 'bg-[#FFA559] text-white' 
                      : 'bg-[#FFF5E4] text-[#FFA559] hover:bg-[#FFA559] hover:text-white'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{issue.upvotes}</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 bg-[#FFF5E4] text-[#FFA559] rounded-lg hover:bg-[#FFA559] hover:text-white transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">{issue.comments}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BlogAwareness: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'How to Report Civic Issues Effectively',
      excerpt: 'Learn the best practices for reporting civic problems to ensure quick resolution.',
      date: '2025-01-10',
      readTime: '5 min read',
      category: 'Guide'
    },
    {
      id: 2,
      title: 'Understanding Your Rights as a Citizen',
      excerpt: 'Know your civic rights and how to exercise them for better governance.',
      date: '2025-01-08',
      readTime: '8 min read',
      category: 'Awareness'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Blog & Awareness</h1>
        <p className="text-[#666666]">Stay informed about civic issues and your rights</p>
      </div>

      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
            <div className="flex items-center space-x-2 mb-3">
              <span className="px-2 py-1 bg-[#FFF5E4] text-[#FFA559] text-xs font-medium rounded">
                {post.category}
              </span>
              <span className="text-sm text-[#666666]">{post.date}</span>
              <span className="text-sm text-[#666666]">•</span>
              <span className="text-sm text-[#666666]">{post.readTime}</span>
            </div>
            <h2 className="text-xl font-semibold text-[#333333] mb-2">{post.title}</h2>
            <p className="text-[#666666] mb-4">{post.excerpt}</p>
            <button className="text-[#FFA559] hover:text-[#FF7F3F] font-medium text-sm transition-colors">
              Read More →
            </button>
          </div>
        ))}
      </div>

      {/* YouTube Embed Example */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
        <h2 className="text-xl font-semibold text-[#333333] mb-4">Featured Video</h2>
        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
          <div className="text-gray-500 text-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <p>Civic Awareness Video</p>
            <p className="text-sm">YouTube embed would go here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Contact Us</h1>
        <p className="text-[#666666]">Get in touch with our support team</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
          <h2 className="text-xl font-semibold text-[#333333] mb-4">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-1">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-1">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-1">
                Message *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                rows={4}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#FFA559] text-white py-3 rounded-lg font-semibold hover:bg-[#FF7F3F] transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
          <h2 className="text-xl font-semibold text-[#333333] mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-[#FFA559]" />
              <div>
                <p className="font-medium text-[#333333]">Phone</p>
                <p className="text-[#666666]">+91 9876543210</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-[#FFA559]" />
              <div>
                <p className="font-medium text-[#333333]">Email</p>
                <p className="text-[#666666]">support@jaaago.org</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-[#FFA559]" />
              <div>
                <p className="font-medium text-[#333333]">Address</p>
                <p className="text-[#666666]">India</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-[#333333] mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-[#FFA559] hover:text-[#FF7F3F] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-[#FFA559] hover:text-[#FF7F3F] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;