import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, Building, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthorityAuth: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    govId: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    jurisdiction: '',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signInWithEmail, registerAuthority } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signInWithEmail(formData.email, formData.password);
      navigate('/authority-dashboard');
    } catch (error: any) {
      setError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      const userData = {
        id: '',
        name: formData.name,
        email: formData.email,
        govId: formData.govId,
        department: formData.department,
        jurisdiction: formData.jurisdiction,
        verified: false
      };

      await registerAuthority(userData, formData.password);
      navigate('/authority-dashboard');
    } catch (error: any) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfaf6] py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#FFA559] rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#333333]">Authority Portal</h1>
            <p className="text-[#666666]">Government Officials Only</p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Mode Toggle */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === 'login'
                  ? 'bg-white text-[#FFA559] shadow-sm'
                  : 'text-gray-600 hover:text-[#FFA559]'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === 'register'
                  ? 'bg-white text-[#FFA559] shadow-sm'
                  : 'text-gray-600 hover:text-[#FFA559]'
              }`}
            >
              Register
            </button>
          </div>

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  Official Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#666666]" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                    placeholder="official@gov.in"
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
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-10 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 text-[#666666]" /> : <Eye className="w-4 h-4 text-[#666666]" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#FFA559] text-white py-3 rounded-lg font-semibold hover:bg-[#FF7F3F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>

              <Link
                to="/"
                className="block text-center text-[#666666] hover:text-[#FFA559] transition-colors"
              >
                Back to Home
              </Link>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  Full Name *
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
                  Government ID *
                </label>
                <input
                  type="text"
                  value={formData.govId}
                  onChange={(e) => setFormData({ ...formData, govId: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                  placeholder="Enter your official ID"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  Official Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#666666]" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                    placeholder="official@gov.in"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  Department *
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                  placeholder="e.g., Municipal Corporation"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  Jurisdiction *
                </label>
                <input
                  type="text"
                  value={formData.jurisdiction}
                  onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                  placeholder="e.g., Jaipur City"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#666666]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-10 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                    placeholder="Minimum 6 characters"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 text-[#666666]" /> : <Eye className="w-4 h-4 text-[#666666]" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#666666]" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-10 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4 text-[#666666]" /> : <Eye className="w-4 h-4 text-[#666666]" />}
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> Your registration will be reviewed by administrators before approval.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#FFA559] text-white py-3 rounded-lg font-semibold hover:bg-[#FF7F3F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>

              <Link
                to="/"
                className="block text-center text-[#666666] hover:text-[#FFA559] transition-colors"
              >
                Back to Home
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorityAuth;