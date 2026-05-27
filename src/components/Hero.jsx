
import { Sparkles, ArrowRight, MonitorPlay } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-24 lg:pb-32">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-100 opacity-50 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>The Future of Retail is Here</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
              Transform Your Store with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Virtual Try-On</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Let your customers try on entire collections in seconds. No fitting room lines, no hassle. Boost engagement and sales with our interactive smart mirror.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-blue-200">
                Request a Demo <ArrowRight className="w-5 h-5" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-semibold transition-all border-2 border-gray-200">
                <MonitorPlay className="w-5 h-5 text-gray-500" /> Watch Video
              </button>
            </div>

            <div className="mt-10 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                  </div>
                ))}
              </div>
              <p>Trusted by <strong>100+</strong> retail stores worldwide</p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative rounded-2xl bg-gray-900 shadow-2xl overflow-hidden aspect-[3/4] max-h-[600px] border-8 border-gray-800">
              {/* This represents the mirror screen */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col items-center justify-center p-8 text-center">
                 <img src="https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=800&auto=format&fit=crop" alt="Virtual Try On Mirror Demo" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay" />

                 <div className="relative z-10 w-full h-full flex flex-col justify-between">
                    <div className="flex justify-between items-center pt-4">
                      <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-1 text-white text-sm font-medium">Scanning...</div>
                      <div className="w-8 h-8 rounded-full border-2 border-white/50 flex items-center justify-center">
                         <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                      </div>
                    </div>

                    <div className="space-y-4 pb-8">
                       <div className="w-64 mx-auto h-64 border-2 border-dashed border-white/50 rounded-lg flex items-center justify-center relative">
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent"></div>
                          <div className="w-full h-1 bg-blue-400 absolute top-1/2 animate-[scan_2s_ease-in-out_infinite]"></div>
                       </div>

                       <div className="flex justify-center gap-3 mt-4">
                         {['S', 'M', 'L', 'XL'].map(size => (
                           <div key={size} className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer transition-all ${size === 'M' ? 'bg-blue-600 text-white' : 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30'}`}>
                             {size}
                           </div>
                         ))}
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Decorative elements around mirror */}
            <div className="absolute -right-6 top-1/4 bg-white p-4 rounded-xl shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Perfect Fit!</p>
                  <p className="text-xs text-gray-500">Size M recommended</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
