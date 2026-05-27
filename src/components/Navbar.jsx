import { useState } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <span>AuraMirror</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 font-medium">How it Works</a>
            <div className="h-6 w-px bg-gray-200"></div>
            <a href="#" className="text-gray-900 font-medium hover:text-blue-600">Find a Mirror</a>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors">
              For Retailers
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-4 shadow-lg">
          <a href="#features" className="block text-gray-600 font-medium py-2">Features</a>
          <a href="#how-it-works" className="block text-gray-600 font-medium py-2">How it Works</a>
          <a href="#" className="block text-gray-900 font-medium py-2">Find a Mirror</a>
          <button className="w-full bg-blue-600 text-white px-5 py-3 rounded-lg font-medium mt-2">
            For Retailers
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
