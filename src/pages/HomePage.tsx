import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Bell,
  Users,
  Building,
  MapPin,
  Eye,
  MessageSquare,
  Shield,
  Smartphone,
  Star,
  ChevronLeft,
  ChevronRight,
  Play
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useLocation } from '../context/LocationContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageTransition from '../components/PageTransition';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const { city, requestLocation } = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const handleLocationRequest = () => {
    requestLocation().catch(() => {
      // Error already handled in context
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#fdfaf6]">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#FFF5E4] to-[#fdfaf6] py-20 px-4" data-aos="fade-up">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#333333] mb-6">
              {t('hero.welcome')}
            </h1>
            <p className="text-xl text-[#666666] mb-8 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>

            {/* City Display with Location Request */}
            <div className="mb-8">
              <button
                onClick={handleLocationRequest}
                className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-[#E0E0E0]"
              >
                <MapPin className="w-5 h-5 text-[#FFA559]" />
                <span className="text-[#333333] font-medium">📍 {city}</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/citizen-auth"
                className="bg-[#FFA559] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#FF7F3F] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t('hero.report')}
              </Link>
              <Link
                to="/citizen-auth"
                className="bg-white text-[#FFA559] px-8 py-4 rounded-full font-semibold hover:bg-[#FFF5E4] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-[#FFA559]"
              >
                {t('hero.updates')}
              </Link>
              <Link
                to="/citizen-auth"
                className="bg-[#FFC26F] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#FF7F3F] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t('hero.community')}
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 px-4 bg-white" data-aos="fade-up">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#333333] mb-6">
                  {t('about.title')}
                </h2>
                <p className="text-[#666666] text-lg leading-relaxed">
                  {t('about.description')}
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-64 h-64 bg-[#FFF5E4] rounded-full flex items-center justify-center overflow-hidden">
                  <img src="/image.png" alt="About JAAAGO" className="w-64 h-64 rounded-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 bg-[#FFF5E4]" data-aos="fade-up">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[#333333] text-center mb-12">
              {t('how.title')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-[#FFA559] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF7F3F] transition-colors">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#333333] mb-2">
                  {t('how.step1')}
                </h3>
                <p className="text-[#666666]">
                  {t('how.step1.desc')}
                </p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-[#FFC26F] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF7F3F] transition-colors">
                  <Bell className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#333333] mb-2">
                  {t('how.step2')}
                </h3>
                <p className="text-[#666666]">
                  {t('how.step2.desc')}
                </p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-[#C9F4AA] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#a8e686] transition-colors">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#333333] mb-2">
                  {t('how.step3')}
                </h3>
                <p className="text-[#666666]">
                  {t('how.step3.desc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why JAAAGO */}
        <section className="py-16 px-4 bg-white" data-aos="fade-up">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[#333333] text-center mb-12">
              {t('why.title')}
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              <div className="text-center group">
                <div className="w-12 h-12 bg-[#FFA559] rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-[#333333] mb-1">{t('why.realtime')}</h4>
              </div>
              <div className="text-center group">
                <div className="w-12 h-12 bg-[#FFC26F] rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-[#333333] mb-1">{t('why.location')}</h4>
              </div>
              <div className="text-center group">
                <div className="w-12 h-12 bg-[#C9F4AA] rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-[#333333] mb-1">{t('why.community')}</h4>
              </div>
              <div className="text-center group">
                <div className="w-12 h-12 bg-[#FFA559] rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-[#333333] mb-1">{t('why.transparent')}</h4>
              </div>
              <div className="text-center group">
                <div className="w-12 h-12 bg-[#FFC26F] rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-[#333333] mb-1">{t('why.citizen')}</h4>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 bg-[#FFF5E4]" data-aos="fade-up">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#333333] text-center mb-12">
              What Citizens Say
            </h2>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center justify-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#FFA559] fill-current" />
                  ))}
                </div>
              </div>
              <blockquote className="text-lg text-[#666666] text-center italic mb-4">
                "JAAAGO helped me get the broken streetlight in my neighborhood fixed within a week.
                The transparency and updates kept me informed throughout the process."
              </blockquote>
              <div className="text-center">
                <p className="font-semibold text-[#333333]">Priya Sharma</p>
                <p className="text-sm text-[#666666]">Citizen, Jaipur</p>
              </div>
            </div>
          </div>
        </section>

        {/* Before/After Showcase */}
        <section className="py-16 px-4 bg-white" data-aos="fade-up">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[#333333] text-center mb-12">
              Real Impact Stories
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#FFF5E4] rounded-lg p-6">
                <div className="mb-4">
                  <span className="bg-[#FF6B6B] text-white px-3 py-1 rounded-full text-sm font-medium">
                    Before
                  </span>
                </div>
                <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
                  <img src="/before.jpeg" alt="Pothole on Main Road" className="w-full h-48 object-cover rounded-lg" />
                </div>
                <p className="text-[#666666]">
                  Reported by citizen on March 1st, 2025
                </p>
              </div>
              <div className="bg-[#C9F4AA] rounded-lg p-6">
                <div className="mb-4">
                  <span className="bg-[#4CAF50] text-white px-3 py-1 rounded-full text-sm font-medium">
                    After
                  </span>
                </div>
                <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
                  <img src="/after.jpeg" alt="Road Repaired Successfully" className="w-full h-48 object-cover rounded-lg" />
                </div>
                <p className="text-[#666666]">
                  Resolved by city authorities on March 8th, 2025
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* App Download */}
        <section className="py-16 px-4 bg-[#333333] text-white" data-aos="fade-up">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Get JAAAGO on Your Phone
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Download our mobile app for even easier civic engagement on the go.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-gray-600 px-6 py-3 rounded-lg flex items-center space-x-3 opacity-50">
                <Smartphone className="w-6 h-6" />
                <div className="text-left">
                  <p className="text-xs">Coming Soon</p>
                  <p className="font-semibold">Google Play</p>
                </div>
              </div>
              <div className="bg-gray-600 px-6 py-3 rounded-lg flex items-center space-x-3 opacity-50">
                <Smartphone className="w-6 h-6" />
                <div className="text-left">
                  <p className="text-xs">Coming Soon</p>
                  <p className="font-semibold">App Store</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default HomePage;