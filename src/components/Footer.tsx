import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  return (
    <footer className="bg-[#333333] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="JAAAGO Logo" 
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  // Fallback to SVG if PNG fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = '/logo.svg';
                }}
              />
              <div>
                <h3 className="text-xl font-bold">JAAAGO</h3>
                <p className="text-sm text-gray-400">Raise your voice, fix your city</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering citizens to build better communities through transparent civic engagement.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#FFA559] transition-colors">
                  Report an Issue
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#FFA559] transition-colors">
                  Check Updates
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#FFA559] transition-colors">
                  Community Wall
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#FFA559] transition-colors">
                  Blog & Awareness
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#FFA559]" />
                <span className="text-gray-400">support@jaaago.org</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#FFA559]" />
                <span className="text-gray-400">+91 1800-JAAAGO</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#FFA559]" />
                <span className="text-gray-400">Jaipur, Rajasthan</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Stay Updated</h4>
            <p className="text-gray-400 text-sm">
              Subscribe to our newsletter for the latest updates on civic issues and community initiatives.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559] text-white placeholder-gray-400"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#FFA559] text-white py-2 rounded-lg font-semibold hover:bg-[#FF7F3F] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#FFA559] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FFA559] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FFA559] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FFA559] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm text-center">
              © 2025 JAAAGO. All rights reserved.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-gray-500 text-xs text-center">
            <strong>Disclaimer:</strong> JAAAGO is a citizen-led civic initiative designed to facilitate communication between citizens and local authorities. 
            We are not affiliated with any government body and serve as an independent platform for civic engagement. 
            All reported issues are forwarded to relevant authorities, but resolution timelines depend on official processes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;