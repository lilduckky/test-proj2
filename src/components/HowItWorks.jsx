

const steps = [
  {
    number: "01",
    title: "Step In Front",
    description: "Approach the mirror. Our sensors will instantly detect your presence and map your body shape privately and securely."
  },
  {
    number: "02",
    title: "Select & Swipe",
    description: "Use simple hand gestures or the touchscreen interface to browse the store's entire catalog and select items."
  },
  {
    number: "03",
    title: "See the Magic",
    description: "Watch as the clothes seamlessly appear on your reflection. Turn around, move, and see how the fabric flows."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works in Store</h2>
            <p className="text-lg text-gray-600 mb-10">
              A frictionless experience designed to delight customers from the moment they walk up to the mirror.
            </p>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                      {step.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
               <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                 Find a Mirror Near You
               </button>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100 aspect-video">
               <img
                 src="https://images.unsplash.com/photo-1605280263929-1c42c62ef169?q=80&w=1000&auto=format&fit=crop"
                 alt="Customer using virtual mirror"
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-black/20 flex items-center justify-center group cursor-pointer">
                 <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                   <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-blue-600 border-b-8 border-b-transparent ml-2"></div>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
