import React from 'react';
import { Globe, Users, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0B1020]/80 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between">
        <div className="text-gray-400 text-sm mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} FIFA World Cup 2026 Predictor. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Globe className="h-5 w-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-[#0077b5] transition-colors">
            <Users className="h-5 w-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-[#ea4335] transition-colors">
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
