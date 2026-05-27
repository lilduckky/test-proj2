
import { CheckCircle2 } from 'lucide-react';

const Benefits = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* For Shoppers */}
          <div className="bg-gray-800 rounded-3xl p-8 md:p-12 border border-gray-700 relative overflow-hidden">
             <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>

             <h3 className="text-2xl md:text-3xl font-bold mb-6">For Shoppers</h3>
             <ul className="space-y-6">
               <li className="flex gap-4">
                 <CheckCircle2 className="w-6 h-6 text-blue-400 flex-shrink-0" />
                 <div>
                   <h4 className="font-semibold text-lg">No More Fitting Rooms</h4>
                   <p className="text-gray-400 mt-1">Skip the long lines and the hassle of taking off and putting on clothes.</p>
                 </div>
               </li>
               <li className="flex gap-4">
                 <CheckCircle2 className="w-6 h-6 text-blue-400 flex-shrink-0" />
                 <div>
                   <h4 className="font-semibold text-lg">Hygienic Try-On</h4>
                   <p className="text-gray-400 mt-1">Try on garments without worrying about who wore them previously.</p>
                 </div>
               </li>
               <li className="flex gap-4">
                 <CheckCircle2 className="w-6 h-6 text-blue-400 flex-shrink-0" />
                 <div>
                   <h4 className="font-semibold text-lg">Discover More</h4>
                   <p className="text-gray-400 mt-1">Try on 50 outfits in 5 minutes. Find your perfect style faster.</p>
                 </div>
               </li>
             </ul>
          </div>

          {/* For Retailers */}
          <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl p-8 md:p-12 border border-blue-800 relative overflow-hidden">
             <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500 rounded-full opacity-30 blur-3xl"></div>

             <h3 className="text-2xl md:text-3xl font-bold mb-6">For Retailers</h3>
             <ul className="space-y-6">
               <li className="flex gap-4">
                 <CheckCircle2 className="w-6 h-6 text-blue-300 flex-shrink-0" />
                 <div>
                   <h4 className="font-semibold text-lg text-white">Boost Conversion Rates</h4>
                   <p className="text-blue-200 mt-1">Interactive experiences significantly increase purchase intent and average order value.</p>
                 </div>
               </li>
               <li className="flex gap-4">
                 <CheckCircle2 className="w-6 h-6 text-blue-300 flex-shrink-0" />
                 <div>
                   <h4 className="font-semibold text-lg text-white">Reduce Return Rates</h4>
                   <p className="text-blue-200 mt-1">Accurate size recommendations mean customers buy what actually fits them.</p>
                 </div>
               </li>
               <li className="flex gap-4">
                 <CheckCircle2 className="w-6 h-6 text-blue-300 flex-shrink-0" />
                 <div>
                   <h4 className="font-semibold text-lg text-white">Save Floor Space</h4>
                   <p className="text-blue-200 mt-1">Display your entire digital inventory without needing physical racks for every item.</p>
                 </div>
               </li>
             </ul>

             <button className="mt-10 bg-white text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors w-full sm:w-auto">
               View ROI Calculator
             </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Benefits;
