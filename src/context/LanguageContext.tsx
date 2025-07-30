import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: 'en' | 'hi';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.citizen': 'Citizen Login',
    'nav.authority': 'Authority Login',
    'nav.partner': 'Partner Login',
    'nav.admin': 'Admin',
    'hero.welcome': 'Welcome to Your City',
    'hero.subtitle': 'Stay updated and take action on civic issues in your locality',
    'hero.report': 'Report Issue',
    'hero.updates': 'Check Updates',
    'hero.community': 'Community',
    'about.title': 'About JAAAGO',
    'about.description': 'JAAAGO is a citizen-led civic initiative that bridges the gap between citizens and local authorities. Our platform empowers communities to report issues, track progress, and build a better city together through transparent and accountable governance.',
    'how.title': 'How It Works',
    'how.step1': 'Report',
    'how.step1.desc': 'Upload image/video with description and issue type',
    'how.step2': 'Get Updates',
    'how.step2.desc': 'View status, timeline, and resolution images',
    'how.step3': 'Join the Movement',
    'how.step3.desc': 'Comment, upvote, and engage with community',
    'why.title': 'Why JAAAGO?',
    'why.realtime': 'Real-time reports',
    'why.location': 'Location-based updates',
    'why.community': 'Community wall',
    'why.transparent': 'Transparent resolution',
    'why.citizen': 'Citizen-first design'
  },
  hi: {
    'nav.home': 'होम',
    'nav.citizen': 'नागरिक लॉगिन',
    'nav.authority': 'प्राधिकरण लॉगिन',
    'nav.partner': 'पार्टनर लॉगिन',
    'nav.admin': 'एडमिन',
    'hero.welcome': 'आपके शहर में आपका स्वागत है',
    'hero.subtitle': 'अपने इलाके की नागरिक समस्याओं पर अपडेट रहें और कार्रवाई करें',
    'hero.report': 'समस्या रिपोर्ट करें',
    'hero.updates': 'अपडेट देखें',
    'hero.community': 'समुदाय',
    'about.title': 'जागो के बारे में',
    'about.description': 'जागो एक नागरिक-नेतृत्व वाली नागरिक पहल है जो नागरिकों और स्थानीय अधिकारियों के बीच की खाई को पाटती है। हमारा प्लेटफॉर्म समुदायों को समस्याओं की रिपोर्ट करने, प्रगति को ट्रैक करने और पारदर्शी और जवाबदेह शासन के माध्यम से एक बेहतर शहर बनाने के लिए सशक्त बनाता है।',
    'how.title': 'यह कैसे काम करता है',
    'how.step1': 'रिपोर्ट करें',
    'how.step1.desc': 'विवरण और समस्या प्रकार के साथ छवि/वीडियो अपलोड करें',
    'how.step2': 'अपडेट प्राप्त करें',
    'how.step2.desc': 'स्थिति, समयरेखा और समाधान छवियां देखें',
    'how.step3': 'आंदोलन में शामिल हों',
    'how.step3.desc': 'टिप्पणी करें, अपवोट करें और समुदाय के साथ जुड़ें',
    'why.title': 'जागो क्यों?',
    'why.realtime': 'रीयल-टाइम रिपोर्ट',
    'why.location': 'स्थान-आधारित अपडेट',
    'why.community': 'समुदायी दीवार',
    'why.transparent': 'पारदर्शी समाधान',
    'why.citizen': 'नागरिक-प्रथम डिजाइन'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};