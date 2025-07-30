import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Mail, Lock, Upload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PartnerAuth: React.FC = () => {
  const [formData, setFormData] = useState({
    orgName: '',
    email: '',
    password: '',
    contactPerson: '',
    role: '',
    phone: '',
    verificationDoc: null as File | null
  });
  const [isApproved] = useState(true); // Simulate approval status
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, verificationDoc: file });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isApproved) {
      alert('Your account is pending approval. Please contact the administrator.');
      return;
    }

    // Simulate successful login
    const userData = {
      id: '3',
      name: formData.contactPerson || 'Partner User',
      phone: formData.phone,
      email: formData.email,
      verified: true
    };
    
    login(userData, 'partner');
    navigate('/partner-dashboard');
  };

  return (
    <div className="min-h-screen bg-[#fdfaf6] py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#FFA559] rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#333333]">Partner Portal</h1>
            <p className="text-[#666666]">Contractors & NGOs</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-1">
                Organization Name *
              </label>
              <input
                type="text"
                value={formData.orgName}
                onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333333] mb-1">
                Contact Person *
              </label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333333] mb-1">
                Role *
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                required
              >
                <option value="">Select Role</option>
                <option value="Contractor">Contractor</option>
                <option value="NGO">NGO</option>
                <option value="Service Provider">Service Provider</option>
                <option value="Consultant">Consultant</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                  Phone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333333] mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#666666]" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333333] mb-1">
                Verification Document *
              </label>
              <div className="relative">
                <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#666666]" />
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="w-full pl-10 pr-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                />
              </div>
              <p className="text-xs text-[#666666] mt-1">
                Upload registration certificate or license
              </p>
            </div>

            <div className="bg-[#FFF5E4] p-3 rounded-lg">
              <p className="text-sm text-[#666666]">
                <strong>Note:</strong> Partner accounts require verification and approval. 
                You'll be notified once your application is reviewed.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FFA559] text-white py-3 rounded-lg font-semibold hover:bg-[#FF7F3F] transition-colors"
            >
              {isApproved ? 'Login' : 'Submit Application'}
            </button>

            <Link
              to="/"
              className="block text-center text-[#666666] hover:text-[#FFA559] transition-colors"
            >
              Back to Home
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PartnerAuth;