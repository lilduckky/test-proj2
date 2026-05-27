
import { Shirt, Zap, RefreshCw, Smartphone, Layers, Eye } from 'lucide-react';

const features = [
  {
    icon: <Shirt className="w-6 h-6 text-blue-600" />,
    title: "Photorealistic Try-On",
    description: "Our advanced AI ensures clothes drape naturally and react to movement just like real fabric."
  },
  {
    icon: <Zap className="w-6 h-6 text-blue-600" />,
    title: "Instant Size Recommendations",
    description: "Body scanning technology suggests the perfect size instantly, reducing returns and increasing satisfaction."
  },
  {
    icon: <RefreshCw className="w-6 h-6 text-blue-600" />,
    title: "Endless Inventory",
    description: "Let customers try on items that aren't even on the physical floor. Your entire catalog, available instantly."
  },
  {
    icon: <Layers className="w-6 h-6 text-blue-600" />,
    title: "Mix & Match Outfits",
    description: "Shoppers can pair tops, bottoms, and accessories to build complete looks without carrying piles of clothes."
  },
  {
    icon: <Smartphone className="w-6 h-6 text-blue-600" />,
    title: "Save to Mobile",
    description: "Customers can scan a QR code to save their favorite looks to their phone and buy later online."
  },
  {
    icon: <Eye className="w-6 h-6 text-blue-600" />,
    title: "Valuable Analytics",
    description: "Gain insights into which items are tried on most frequently, helping you optimize your purchasing decisions."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Magic Behind the Mirror</h2>
          <p className="text-lg text-gray-600">
            Powered by state-of-the-art computer vision and augmented reality, our mirror delivers a flawless try-on experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
