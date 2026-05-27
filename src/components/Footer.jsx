
import { Sparkles, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          <div className="md:col-span-1">
            <div className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <span>AuraMirror</span>
            </div>
            <p className="text-gray-600 mb-6">
              Revolutionizing the retail experience with AI-powered virtual try-on technology.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-blue-800 transition-colors">LinkedIn</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">For Retailers</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">For Shoppers</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact Sales</h4>
            <div className="flex items-start gap-3 text-gray-600 mb-4">
               <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
               <p>sales@auramirror.com</p>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Request Demo
            </button>
          </div>

        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} AuraMirror Inc. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
