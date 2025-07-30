import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Briefcase, 
  FileText, 
  BarChart3, 
  MessageSquare, 
  Settings,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PartnerDashboard: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.includes(path);
  };

  const sidebarItems = [
    { path: '/partner-dashboard', icon: Briefcase, label: 'Dashboard Home' },
    { path: '/partner-dashboard/tasks', icon: FileText, label: 'Assigned Tasks' },
    { path: '/partner-dashboard/performance', icon: BarChart3, label: 'Performance' },
    { path: '/partner-dashboard/communication', icon: MessageSquare, label: 'Communication' },
    { path: '/partner-dashboard/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-[#fdfaf6] flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-[#E0E0E0]">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#FFA559] rounded-full flex items-center justify-center mx-auto mb-3">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-semibold text-[#333333]">{user?.name}</h2>
            <p className="text-sm text-[#666666]">Partner</p>
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
          <Route path="/" element={<PartnerDashboardHome />} />
          <Route path="/tasks" element={<AssignedTasks />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/communication" element={<Communication />} />
          <Route path="/settings" element={<PartnerSettings />} />
        </Routes>
      </div>
    </div>
  );
};

const PartnerDashboardHome: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">
          Welcome, {user?.name}!
        </h1>
        <p className="text-[#666666]">
          Partner dashboard - manage assigned tasks and track your performance.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E0E0E0]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#666666]">Pending Tasks</p>
              <p className="text-2xl font-bold text-[#FF6B6B]">3</p>
            </div>
            <Clock className="w-8 h-8 text-[#FF6B6B]" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E0E0E0]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#666666]">In Progress</p>
              <p className="text-2xl font-bold text-[#FFC26F]">5</p>
            </div>
            <FileText className="w-8 h-8 text-[#FFC26F]" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E0E0E0]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#666666]">Completed</p>
              <p className="text-2xl font-bold text-[#C9F4AA]">28</p>
            </div>
            <CheckCircle className="w-8 h-8 text-[#C9F4AA]" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E0E0E0]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#666666]">Success Rate</p>
              <p className="text-2xl font-bold text-[#FFA559]">92%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-[#FFA559]" />
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
        <h2 className="text-xl font-semibold text-[#333333] mb-4">Recent Tasks</h2>
        <div className="space-y-4">
          {[
            { id: '#TASK001', title: 'Repair pothole on Main Street', status: 'In Progress', deadline: '2025-01-15', priority: 'High' },
            { id: '#TASK002', title: 'Install street light in Sector 12', status: 'Pending', deadline: '2025-01-18', priority: 'Medium' },
            { id: '#TASK003', title: 'Fix water pipe leakage', status: 'Completed', deadline: '2025-01-10', priority: 'High' }
          ].map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 bg-[#FFF5E4] rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    task.status === 'Completed' ? 'bg-[#C9F4AA] text-white' :
                    task.status === 'In Progress' ? 'bg-[#FFC26F] text-white' :
                    'bg-[#FF6B6B] text-white'
                  }`}>
                    {task.status}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    task.priority === 'High' ? 'bg-[#FF6B6B] text-white' :
                    task.priority === 'Medium' ? 'bg-[#FFC26F] text-white' :
                    'bg-[#C9F4AA] text-white'
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <h3 className="font-medium text-[#333333]">{task.title}</h3>
                <p className="text-sm text-[#666666]">{task.id} • Deadline: {task.deadline}</p>
              </div>
              <Link
                to={`/partner-dashboard/tasks?id=${task.id}`}
                className="px-4 py-2 bg-[#FFA559] text-white rounded-lg hover:bg-[#FF7F3F] transition-colors text-sm"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AssignedTasks: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const mockTasks = [
    {
      id: '#TASK001',
      title: 'Repair pothole on Main Street',
      description: 'Large pothole needs immediate repair due to traffic safety concerns',
      location: 'Main Street, Jaipur',
      status: 'In Progress',
      priority: 'High',
      assignedDate: '2025-01-12',
      deadline: '2025-01-15',
      authority: 'PWD Officer',
      contact: '+91 9876543210'
    },
    {
      id: '#TASK002',
      title: 'Install street light in Sector 12',
      description: 'New street light installation required for improved security',
      location: 'Sector 12, Jaipur',
      status: 'Pending',
      priority: 'Medium',
      assignedDate: '2025-01-13',
      deadline: '2025-01-18',
      authority: 'Electricity Department',
      contact: '+91 9876543211'
    }
  ];

  const handleTaskAction = (taskId: string, action: 'accept' | 'decline' | 'complete') => {
    alert(`Task ${taskId} ${action}ed successfully!`);
  };

  const handleProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`Proof uploaded: ${file.name}`);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Assigned Tasks</h1>
        <p className="text-[#666666]">Manage your assigned civic tasks</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Tasks List */}
        <div className="space-y-4">
          {mockTasks.map((task) => (
            <div 
              key={task.id} 
              className={`bg-white rounded-lg shadow-sm border p-4 cursor-pointer transition-colors ${
                selectedTask?.id === task.id ? 'border-[#FFA559]' : 'border-[#E0E0E0] hover:border-[#FFC26F]'
              }`}
              onClick={() => setSelectedTask(task)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    task.status === 'Completed' ? 'bg-[#C9F4AA] text-white' :
                    task.status === 'In Progress' ? 'bg-[#FFC26F] text-white' :
                    'bg-[#FF6B6B] text-white'
                  }`}>
                    {task.status}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    task.priority === 'High' ? 'bg-[#FF6B6B] text-white' :
                    task.priority === 'Medium' ? 'bg-[#FFC26F] text-white' :
                    'bg-[#C9F4AA] text-white'
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <span className="text-xs text-[#666666]">{task.id}</span>
              </div>
              <h3 className="font-semibold text-[#333333] mb-1">{task.title}</h3>
              <p className="text-sm text-[#666666] mb-2">📍 {task.location}</p>
              <p className="text-sm text-[#666666]">Deadline: {task.deadline}</p>
            </div>
          ))}
        </div>

        {/* Task Details */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
          {selectedTask ? (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-[#333333] mb-2">{selectedTask.title}</h2>
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    selectedTask.status === 'Completed' ? 'bg-[#C9F4AA] text-white' :
                    selectedTask.status === 'In Progress' ? 'bg-[#FFC26F] text-white' :
                    'bg-[#FF6B6B] text-white'
                  }`}>
                    {selectedTask.status}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    selectedTask.priority === 'High' ? 'bg-[#FF6B6B] text-white' :
                    selectedTask.priority === 'Medium' ? 'bg-[#FFC26F] text-white' :
                    'bg-[#C9F4AA] text-white'
                  }`}>
                    {selectedTask.priority}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-[#666666]">Location</p>
                    <p className="font-medium text-[#333333]">{selectedTask.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#666666]">Deadline</p>
                    <p className="font-medium text-[#333333]">{selectedTask.deadline}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#666666]">Authority</p>
                    <p className="font-medium text-[#333333]">{selectedTask.authority}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#666666]">Contact</p>
                    <p className="font-medium text-[#333333]">{selectedTask.contact}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-[#666666] mb-2">Description</p>
                  <p className="text-[#333333]">{selectedTask.description}</p>
                </div>
              </div>

              {/* Actions */}
              {selectedTask.status === 'Pending' && (
                <div className="flex space-x-2 mb-6">
                  <button
                    onClick={() => handleTaskAction(selectedTask.id, 'accept')}
                    className="flex-1 bg-[#C9F4AA] text-white py-2 rounded-lg hover:bg-[#a8e686] transition-colors flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Accept</span>
                  </button>
                  <button
                    onClick={() => handleTaskAction(selectedTask.id, 'decline')}
                    className="flex-1 bg-[#FF6B6B] text-white py-2 rounded-lg hover:bg-[#ff5252] transition-colors flex items-center justify-center space-x-2"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Decline</span>
                  </button>
                </div>
              )}

              {selectedTask.status === 'In Progress' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      Upload Proof of Work
                    </label>
                    <div className="border-2 border-dashed border-[#E0E0E0] rounded-lg p-4 text-center hover:border-[#FFA559] transition-colors">
                      <input
                        type="file"
                        onChange={handleProofUpload}
                        accept="image/*"
                        className="hidden"
                        id="proof-upload"
                      />
                      <label htmlFor="proof-upload" className="cursor-pointer">
                        <div className="w-8 h-8 bg-[#FFA559] rounded-full flex items-center justify-center mx-auto mb-2">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <p className="text-sm text-[#666666]">Click to upload proof image</p>
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={() => handleTaskAction(selectedTask.id, 'complete')}
                    className="w-full bg-[#FFA559] text-white py-3 rounded-lg hover:bg-[#FF7F3F] transition-colors font-semibold"
                  >
                    Mark as Complete
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-[#666666] py-12">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Select a task to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Performance: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Performance</h1>
        <p className="text-[#666666]">Track your performance metrics and achievements</p>
      </div>

      {/* Performance metrics */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E0E0E0]">
          <h3 className="text-lg font-semibold text-[#333333] mb-4">Completion Rate</h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#C9F4AA] mb-2">92%</p>
            <p className="text-sm text-[#666666]">Tasks completed on time</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E0E0E0]">
          <h3 className="text-lg font-semibold text-[#333333] mb-4">Average Rating</h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#FFA559] mb-2">4.7</p>
            <p className="text-sm text-[#666666]">Out of 5.0 stars</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E0E0E0]">
          <h3 className="text-lg font-semibold text-[#333333] mb-4">Response Time</h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#FFC26F] mb-2">2.1</p>
            <p className="text-sm text-[#666666]">Average hours</p>
          </div>
        </div>
      </div>

      {/* Performance chart placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
        <h2 className="text-xl font-semibold text-[#333333] mb-4">Monthly Performance</h2>
        <div className="h-64 bg-[#FFF5E4] rounded-lg flex items-center justify-center">
          <div className="text-center text-[#666666]">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Performance chart would go here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Communication: React.FC = () => {
  const [messages] = useState([
    {
      id: 1,
      from: 'PWD Officer',
      message: 'Please start work on the pothole repair task assigned to you.',
      timestamp: '2025-01-12 10:30 AM',
      type: 'received'
    },
    {
      id: 2,
      from: 'You',
      message: 'Work has been started. Will complete by deadline.',
      timestamp: '2025-01-12 11:15 AM',
      type: 'sent'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      alert(`Message sent: ${newMessage}`);
      setNewMessage('');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Communication</h1>
        <p className="text-[#666666]">Chat with authorities and officials</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] h-[500px] flex flex-col">
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.type === 'sent'
                      ? 'bg-[#FFA559] text-white'
                      : 'bg-[#FFF5E4] text-[#333333]'
                  }`}
                >
                  {message.type === 'received' && (
                    <p className="text-xs font-medium mb-1">{message.from}</p>
                  )}
                  <p className="text-sm">{message.message}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'sent' ? 'text-white opacity-75' : 'text-[#666666]'
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-[#E0E0E0]">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#FFA559] text-white rounded-lg hover:bg-[#FF7F3F] transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const PartnerSettings: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Settings</h1>
        <p className="text-[#666666]">Manage your partner account settings</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-6">
        <h2 className="text-xl font-semibold text-[#333333] mb-4">Account Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-1">
              Organization Name
            </label>
            <input
              type="text"
              value="ABC Construction"
              className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-1">
              Role
            </label>
            <input
              type="text"
              value="Contractor"
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
                <span className="text-sm text-[#333333]">Email notifications for new tasks</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm text-[#333333]">SMS notifications for urgent tasks</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;