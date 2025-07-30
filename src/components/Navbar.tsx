import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useLocation as useLocationContext } from '../context/LocationContext';

const Navbar: React.FC = () => {
  const { user, userType, logout } = useAuth();
  const { t, toggleLanguage, language } = useLanguage();
  const { city } = useLocationContext();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-[#E0E0E0] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="flex items-center">
              <img 
                src="/logo.png" 
                alt="JAAAGO Logo" 
                className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-200"
                onError={(e) => {
                  // Fallback to SVG if PNG fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = '/logo.svg';
                }}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#333333] group-hover:text-[#FFA559] transition-colors">
                JAAAGO
              </h1>
              <p className="text-xs text-[#666666] -mt-1">
                Raise your voice, fix your city
              </p>
            </div>
          </Link>

          {/* City Display */}
          <div className="flex items-center space-x-1 text-sm text-[#666666] bg-[#FFF5E4] px-3 py-1 rounded-full">
            <MapPin className="w-4 h-4" />
            <span>📍 {city}</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {!user ? (
              <>
                <Link
                  to="/"
                  className={`text-sm font-medium transition-colors hover:text-[#FFA559] ${
                    isActive('/') ? 'text-[#FFA559]' : 'text-[#333333]'
                  }`}
                >
                  {t('nav.home')}
                </Link>
                <Link
                  to="/citizen-auth"
                  className={`text-sm font-medium transition-colors hover:text-[#FFA559] ${
                    isActive('/citizen-auth') ? 'text-[#FFA559]' : 'text-[#333333]'
                  }`}
                >
                  {t('nav.citizen')}
                </Link>
                <Link
                  to="/authority-auth"
                  className={`text-sm font-medium transition-colors hover:text-[#FFA559] ${
                    isActive('/authority-auth') ? 'text-[#FFA559]' : 'text-[#333333]'
                  }`}
                >
                  {t('nav.authority')}
                </Link>
                <Link
                  to="/partner-auth"
                  className={`text-sm font-medium transition-colors hover:text-[#FFA559] ${
                    isActive('/partner-auth') ? 'text-[#FFA559]' : 'text-[#333333]'
                  }`}
                >
                  {t('nav.partner')}
                </Link>
                <Link
                  to="/admin-auth"
                  className={`text-sm font-medium transition-colors hover:text-[#FFA559] ${
                    isActive('/admin-auth') ? 'text-[#FFA559]' : 'text-[#333333]'
                  }`}
                >
                  {t('nav.admin')}
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-[#666666]">
                  Welcome, {user.name}
                </span>
                <Link
                  to={`/${userType}-dashboard`}
                  className="text-sm font-medium text-[#FFA559] hover:text-[#FF7F3F] transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-[#666666] hover:text-[#333333] transition-colors"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-sm font-medium text-[#666666] hover:text-[#FFA559] transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'हिं' : 'EN'}</span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <button className="text-[#333333] hover:text-[#FFA559] transition-colors">
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className="bg-current w-5 h-0.5 mb-1"></span>
                <span className="bg-current w-5 h-0.5 mb-1"></span>
                <span className="bg-current w-5 h-0.5"></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;