import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CitizenAuth: React.FC = () => {
  const [mode, setMode] = useState<'choice' | 'signup' | 'login'>('choice');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    address: '',
    pincode: '',
    state: '',
    district: '',
    phone: ''
  });
  const [age, setAge] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signInWithEmail, registerUser } = useAuth();
  const navigate = useNavigate();

  const calculateAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    
    return calculatedAge;
  };

  const handleDOBChange = (dob: string) => {
    setFormData({ ...formData, dob });
    const calculatedAge = calculateAge(dob);
    setAge(calculatedAge);
    
    if (calculatedAge < 18) {
      setError('You must be at least 18 years old to register.');
    } else {
      setError('');
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (age && age < 18) {
      setError('You must be at least 18 years old to register.');
      setIsLoading(false);
      return;
    }

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
        phone: formData.phone,
        address: formData.address,
        dob: formData.dob,
        pincode: formData.pincode,
        state: formData.state,
        district: formData.district,
        verified: true
      };

      await registerUser(userData, formData.password);
      navigate('/citizen-dashboard');
    } catch (error: any) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signInWithEmail(formData.email, formData.password);
      navigate('/citizen-dashboard');
    } catch (error: any) {
      setError(error.message || 'Login failed. Please check your credentials.');
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
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#333333]">Citizen Portal</h1>
            <p className="text-[#666666]">Join the civic movement</p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {mode === 'choice' && (
            <div className="space-y-4">
              <button
                onClick={() => setMode('signup')}
                className="w-full bg-[#FFA559] text-white py-3 rounded-lg font-semibold hover:bg-[#FF7F3F] transition-colors"
              >
                Sign Up
              </button>
              <button
                onClick={() => setMode('login')}
                className="w-full bg-white text-[#FFA559] py-3 rounded-lg font-semibold border-2 border-[#FFA559] hover:bg-[#FFF5E4] transition-colors"
              >
                Login
              </button>
              <Link
                to="/"
                className="block text-center text-[#666666] hover:text-[#FFA559] transition-colors"
              >
                Back to Home
              </Link>
            </div>
          )}

          {mode === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
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
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#666666]" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleDOBChange(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                  required
                />
                {age !== null && (
                  <p className={`text-sm mt-1 ${age < 18 ? 'text-[#FF6B6B]' : 'text-[#666666]'}`}>
                    Age: {age} years
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                  placeholder="Enter 10-digit number"
                  maxLength={10}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  Address *
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                    maxLength={6}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-1">
                    State *
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                    required
                  >
                    <option value="">Select State</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  District *
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#FFA559] text-white py-3 rounded-lg font-semibold hover:bg-[#FF7F3F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>

              <button
                type="button"
                onClick={() => setMode('choice')}
                className="w-full text-[#666666] hover:text-[#FFA559] transition-colors"
              >
                Back
              </button>
            </form>
          )}

          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#666666]" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559]"
                    placeholder="your.email@example.com"
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

              <button
                type="button"
                onClick={() => setMode('choice')}
                className="w-full text-[#666666] hover:text-[#FFA559] transition-colors"
              >
                Back
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitizenAuth;