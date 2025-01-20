
import { Plane, Github, Linkedin, Mail, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t width-full">
      <div className="container mx-auto px-6 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Branding Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Plane className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold">Voyage AI</h3>
            </div>
            <p className="text-sm text-slate-600">
              Your AI-powered travel companion for discovering and planning amazing journeys around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="hover:text-blue-600 cursor-pointer">Home</li>
              <li className="hover:text-blue-600 cursor-pointer">Destinations</li>
              <li className="hover:text-blue-600 cursor-pointer">Plan a Trip</li>
              <li className="hover:text-blue-600 cursor-pointer">Travel Guide</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contact@voyageia.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>www.voyageAI.com</span>
              </li>
            </ul>
          </div>

          {/* Creator */}
          <div className="space-y-4">
            <h4 className="font-semibold">Created By</h4>
            <p className="text-sm text-slate-600">Abhishek</p>
            <div className="flex gap-4">
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/in/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-slate-600">
          <p>© {currentYear} Voyage AI. Created with ❤️ by Abhishek. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;