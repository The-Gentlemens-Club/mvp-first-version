import { useState } from "react";
import { Crown, Sparkles } from "lucide-react";
import logoVar1 from "@/assets/logo-variation-1.svg";
import logoVar2 from "@/assets/logo-variation-2.svg";
import logoVar3 from "@/assets/logo-variation-3.svg";
import logoVar4 from "@/assets/logo-variation-4.svg";
import logoVar5 from "@/assets/logo-variation-5.svg";

const logoVariations = [
  { 
    src: logoVar1, 
    name: "Classic Gentleman",
    description: "Traditional top hat design with elegant monogram"
  },
  { 
    src: logoVar2, 
    name: "Distinguished Cane",
    description: "Sophisticated cane and monocle with shield emblem"
  },
  { 
    src: logoVar3, 
    name: "Royal Crown",
    description: "Hexagonal crown design for premium exclusivity"
  },
  { 
    src: logoVar4, 
    name: "Formal Attire",
    description: "Bow tie and pocket watch for refined elegance"
  },
  { 
    src: logoVar5, 
    name: "Chess Master",
    description: "Strategic king piece representing gaming mastery"
  }
];

export default function LogoShowcase() {
  const [selectedLogo, setSelectedLogo] = useState(0);

  const scrollToStaking = () => {
    const stakingSection = document.getElementById('staking');
    if (stakingSection) {
      stakingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Crown className="text-yellow-400 w-8 h-8 mr-3" />
            <h3 className="text-3xl font-bold text-white">Brand Identity Collection</h3>
            <Sparkles className="text-yellow-400 w-8 h-8 ml-3" />
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our exclusive logo variations, each crafted to embody the sophisticated elegance 
            and premium gaming experience of The Gentlemen's Club.
          </p>
        </div>

        {/* Main Display */}
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-64 h-64 bg-gray-900 rounded-xl border-2 border-yellow-400/30 p-8 flex items-center justify-center hover:border-yellow-400 transition-colors cursor-pointer"
                   onClick={scrollToStaking}>
                <img 
                  src={logoVariations[selectedLogo].src} 
                  alt={logoVariations[selectedLogo].name}
                  className="w-full h-full object-contain hover:scale-105 transition-transform"
                />
              </div>
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              <h4 className="text-2xl font-bold text-white mb-3">
                {logoVariations[selectedLogo].name}
              </h4>
              <p className="text-gray-300 mb-6 text-lg">
                {logoVariations[selectedLogo].description}
              </p>
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-4 border border-yellow-500/30">
                <p className="text-yellow-300 text-sm font-medium">
                  Click the logo to explore our premium staking rewards and exclusive membership benefits.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {logoVariations.map((logo, index) => (
            <div
              key={index}
              className={`bg-gray-800 rounded-lg p-4 border-2 cursor-pointer transition-all hover:scale-105 ${
                selectedLogo === index 
                  ? 'border-yellow-400 bg-yellow-400/10' 
                  : 'border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => setSelectedLogo(index)}
            >
              <div className="aspect-square flex items-center justify-center mb-2">
                <img 
                  src={logo.src} 
                  alt={logo.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-white text-sm font-medium text-center truncate">
                {logo.name}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button
            onClick={scrollToStaking}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold py-3 px-8 rounded-lg hover:from-yellow-400 hover:to-orange-400 transition-all transform hover:scale-105"
          >
            <Crown className="w-5 h-5 inline mr-2" />
            Join The Elite Club
          </button>
        </div>
      </div>
    </section>
  );
}