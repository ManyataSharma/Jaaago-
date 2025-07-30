import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  FileText, 
  BarChart3, 
  Users, 
  Settings,
  Filter,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  Upload,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthorityDashboard: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.includes(path);
  };

  const sidebarItems = [
    { path: '/authority-dashboard', icon: Shield, label: 'Dashboard Home' },
    { path: '/authority-dashboard/issues', icon: FileText, label: 'Manage Issues' },
    { path: '/authority-dashboard/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/authority-dashboard/citizens', icon: Users, label: 'Citizen Feedback' },
    { path: '/authority-dashboard/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-[#fdfaf6] flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-[#E0E0E0]">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#FFA559] rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-semibold text-[#333333]">{user?.name}</h2>
            <p className="text-sm text-[#666666]">Authority</p>
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
          <Route path="/" element={<AuthorityDashboardHome />} />
          <Route path="/issues" element={<ManageIssues />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/citizens" element={<CitizenFeedback />} />
          <Route path="/settings" element={<AuthoritySettings />} />
        </Routes>
      </div>
    </div>
  );
};

const AuthorityDashboardHome: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">
          Welcome, {user?.name}!
        </h1>
        <p className="text-[#666666]">
          Authority dashboard - manage civic issues and serve citizens effectively.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E0E0E0]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#666666]">Pending Issues</p>
              <p className="text-2xl font-bold text-[#FF6B6B]">8</p>
            </div>
            <AlertCircle className="w-8 h-8 text-[#FF6B6B]" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E0E0E0]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#666666]">In Progress</p>
              <p className="text-2xl font-bold text-[#FFC26F]">12</p>
            </div>
            <Clock className="w-8 h-8 text-[#FFC26F]" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E0E0E0]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#666666]">Resolved</p>
              <p className="text-2xl font-bold text-[#C9F4AA]">45</p>
            </div>
            <CheckCircle className="w-8 h-8 text-[#C9F4AA]" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E0E0E0]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#666666]">Resolution Rate</p>
              <p className="text-2xl font-bold text-[#FFA559]">78%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-[#FFA559]" />
          </div>
        </div>
      </div>

      {/* Recent Issues */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
        <h2 className="text-xl font-semibold text-[#333333] mb-4">Recent Issues</h2>
        <div className="space-y-4">
          {[
            { id: '#JAG123456', type: 'Road', title: 'Pothole on Main Street', urgency: 'High', date: '2025-01-12' },
            { id: '#JAG123457', type: 'Water', title: 'Water supply disruption', urgency: 'Medium', date: '2025-01-11' },
            { id: '#JAG123458', type: 'Electricity', title: 'Street light not working', urgency: 'Low', date: '2025-01-11' }
          ].map((issue) => (
            <div key={issue.id} className="flex items-center justify-between p-4 bg-[#FFF5E4] rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="px-2 py-1 bg-[#FFA559] text-white text-xs font-medium rounded">
                    {issue.type}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    issue.urgency === 'High' ? 'bg-[#FF6B6B] text-white' :
                    issue.urgency === 'Medium' ? 'bg-[#FFC26F] text-white' :
                    'bg-[#C9F4AA] text-white'
                  }`}>
                    {issue.urgency}
                  </span>
                </div>
                <h3 className="font-medium text-[#333333]">{issue.title}</h3>
                <p className="text-sm text-[#666666]">{issue.id} • {issue.date}</p>
              </div>
              <Link
                to={`/authority-dashboard/issues?id=${issue.id}`}
                className="px-4 py-2 bg-[#FFA559] text-white rounded-lg hover:bg-[#FF7F3F] transition-colors text-sm"
              >
                Review
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ManageIssues: React.FC = () => {
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    urgency: '',
    date: ''
  });
  const [selectedIssue, setSelectedIssue] = useState<any>(null);

  const mockIssues = [
    {
      id: '#JAG123456',
      type: 'Road',
      title: 'Pothole on Main Street',
      location: 'Main Street, Jaipur',
      status: 'Pending',
      urgency: 'High',
      reportedDate: '2025-01-12',
      description: 'Large pothole causing traffic issues and vehicle damage',
      citizen: 'Priya Sharma',
      phone: '+91 9876543210'
    },
    {
      id: '#JAG123457',
      type: 'Water',
      title: 'Water supply disruption',
      location: 'Sector 15, Jaipur',
      status: 'In Progress',
      urgency: 'Medium',
      reportedDate: '2025-01-11',
      description: 'No water supply for the past 3 days',
      citizen: 'Raj Kumar',
      phone: '+91 9876543211'
    }
  ];

  const handleStatusUpdate = (issueId: string, newStatus: string) => {
    alert(`Issue ${issueId} status updated to: ${newStatus}`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`Resolution image uploaded: ${file.name}`);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Manage Issues</h1>
        <p className="text-[#666666]">Review and update citizen-reported issues</p>
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
          
          <select
            value={filters.urgency}
            onChange={(e) => setFilters({ ...filters, urgency: e.target.value })}
            className="px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
          >
            <option value="">All Urgency</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
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
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {mockIssues.map((issue) => (
            <div 
              key={issue.id} 
              className={`bg-white rounded-lg shadow-sm border p-4 cursor-pointer transition-colors ${
                selectedIssue?.id === issue.id ? 'border-[#FFA559]' : 'border-[#E0E0E0] hover:border-[#FFC26F]'
              }`}
              onClick={() => setSelectedIssue(issue)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-[#FFF5E4] text-[#FFA559] text-xs font-medium rounded">
                    {issue.type}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    issue.urgency === 'High' ? 'bg-[#FF6B6B] text-white' :
                    issue.urgency === 'Medium' ? 'bg-[#FFC26F] text-white' :
                    'bg-[#C9F4AA] text-white'
                  }`}>
                    {issue.urgency}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    issue.status === 'Completed' ? 'bg-[#C9F4AA] text-white' :
                    issue.status === 'In Progress' ? 'bg-[#FFC26F] text-white' :
                    'bg-[#FF6B6B] text-white'
                  }`}>
                    {issue.status}
                  </span>
                </div>
                <span className="text-xs text-[#666666]">{issue.id}</span>
              </div>
              <h3 className="font-semibold text-[#333333] mb-1">{issue.title}</h3>
              <p className="text-sm text-[#666666] mb-2">📍 {issue.location}</p>
              <p className="text-sm text-[#666666]">Reported: {issue.reportedDate}</p>
            </div>
          ))}
        </div>

        {/* Issue Details */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
          {selectedIssue ? (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-[#333333] mb-2">{selectedIssue.title}</h2>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-2 py-1 bg-[#FFF5E4] text-[#FFA559] text-xs font-medium rounded">
                    {selectedIssue.type}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    selectedIssue.urgency === 'High' ? 'bg-[#FF6B6B] text-white' :
                    selectedIssue.urgency === 'Medium' ? 'bg-[#FFC26F] text-white' :
                    'bg-[#C9F4AA] text-white'
                  }`}>
                    {selectedIssue.urgency}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-[#666666]">Location</p>
                    <p className="font-medium text-[#333333]">{selectedIssue.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#666666]">Reported Date</p>
                    <p className="font-medium text-[#333333]">{selectedIssue.reportedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#666666]">Citizen</p>
                    <p className="font-medium text-[#333333]">{selectedIssue.citizen}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#666666]">Phone</p>
                    <p className="font-medium text-[#333333]">{selectedIssue.phone}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-[#666666] mb-2">Description</p>
                  <p className="text-[#333333]">{selectedIssue.description}</p>
                </div>
              </div>

              {/* Status Update */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#333333] mb-2">
                  Update Status
                </label>
                <div className="flex space-x-2">
                  <select
                    className="flex-1 px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                    defaultValue={selectedIssue.status}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <button
                    onClick={() => handleStatusUpdate(selectedIssue.id, 'In Progress')}
                    className="px-4 py-2 bg-[#FFA559] text-white rounded-lg hover:bg-[#FF7F3F] transition-colors"
                  >
                    Update
                  </button>
                </div>
              </div>

              {/* Resolution Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#333333] mb-2">
                  Upload Resolution Image
                </label>
                <div className="border-2 border-dashed border-[#E0E0E0] rounded-lg p-4 text-center hover:border-[#FFA559] transition-colors">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                    id="resolution-upload"
                  />
                  <label htmlFor="resolution-upload" className="cursor-pointer">
                    <Upload className="w-6 h-6 text-[#FFA559] mx-auto mb-2" />
                    <p className="text-sm text-[#666666]">Click to upload resolution image</p>
                  </label>
                </div>
              </div>

              {/* Comments */}
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">
                  Add Comment
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                    placeholder="Add a comment..."
                  />
                  <button className="px-4 py-2 bg-[#FFC26F] text-white rounded-lg hover:bg-[#FF7F3F] transition-colors flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-[#666666] py-12">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Select an issue to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Analytics: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Analytics</h1>
        <p className="text-[#666666]">Track performance and issue resolution metrics</p>
      </div>

      {/* Analytics cards and charts would go here */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E0E0E0]">
          <h3 className="text-lg font-semibold text-[#333333] mb-4">Resolution Time</h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#FFA559] mb-2">5.2</p>
            <p className="text-sm text-[#666666]">Average days</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E0E0E0]">
          <h3 className="text-lg font-semibold text-[#333333] mb-4">Citizen Satisfaction</h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#C9F4AA] mb-2">4.3</p>
            <p className="text-sm text-[#666666]">Out of 5.0</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E0E0E0]">
          <h3 className="text-lg font-semibold text-[#333333] mb-4">Issues This Month</h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#FFC26F] mb-2">127</p>
            <p className="text-sm text-[#666666]">↑ 15% from last month</p>
          </div>
        </div>
      </div>

      {/* Chart placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
        <h2 className="text-xl font-semibold text-[#333333] mb-4">Issue Trends</h2>
        <div className="h-64 bg-[#FFF5E4] rounded-lg flex items-center justify-center">
          <div className="text-center text-[#666666]">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Chart visualization would go here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CitizenFeedback: React.FC = () => {
  const feedback = [
    {
      id: 1,
      citizen: 'Priya Sharma',
      issue: '#JAG123456',
      rating: 5,
      comment: 'Very satisfied with the quick resolution of the pothole issue.',
      date: '2025-01-12'
    },
    {
      id: 2,
      citizen: 'Raj Kumar',
      issue: '#JAG123457',
      rating: 4,
      comment: 'Good response time, but could have been communicated better.',
      date: '2025-01-11'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Citizen Feedback</h1>
        <p className="text-[#666666]">Reviews and ratings from citizens</p>
      </div>

      <div className="space-y-4">
        {feedback.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-[#333333]">{item.citizen}</h3>
                <p className="text-sm text-[#666666]">Issue: {item.issue}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full ${
                        i < item.rating ? 'bg-[#FFA559]' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-[#666666]">{item.date}</p>
              </div>
            </div>
            <p className="text-[#333333]">{item.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const AuthoritySettings: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Settings</h1>
        <p className="text-[#666666]">Manage your authority account settings</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
        <h2 className="text-xl font-semibold text-[#333333] mb-4">Account Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-1">
              Department
            </label>
            <input
              type="text"
              value="Public Works Department"
              className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-1">
              Jurisdiction
            </label>
            <input
              type="text"
              value="Ward 12, Jaipur"
              className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-1">
              Notification Preferences
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm text-[#333333]">Email notifications for new issues</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm text-[#333333]">SMS notifications for urgent issues</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorityDashboard;