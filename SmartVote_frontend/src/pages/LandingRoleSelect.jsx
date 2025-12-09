import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronLeft, 
  ChevronRight, 
  Vote, 
  UserPlus, 
  ShieldCheck, 
  ArrowRight 
} from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";

// Import your images
import img1 from "../assets/voting/img1.jpg";
import img2 from "../assets/voting/img2.png";
import img3 from "../assets/voting/img3.jpg";

export default function LandingRoleSelect() {
  return (
    <div className="max-w-6xl mx-auto pb-12">


      {/* 1. Hero Slider Section */}
      <div className="mt-6 mb-10">
        <ImageSlider
          images={[
            {
              src: img1,
              title: "Your Voice Matters",
              caption: "Secure, transparent, and encrypted online voting.",
            },
            {
              src: img2,
              title: "Manage Campaigns",
              caption: "Easy nomination filing and manifesto management for candidates.",
            },
            {
              src: img3,
              title: "Real-time Analytics",
              caption: "Live turnout monitoring and instant result generation.",
            },
          ]}
        />
      </div>

      {/* 2. Role Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RoleCard 
            title="I am a Voter" 
            description="Login with your Enrollment ID to cast your secure ballot." 
            to="/voter/login"
            icon={Vote}
            theme="emerald" // Green for "Go" / "Action"
        />
        <RoleCard 
            title="I am a Candidate" 
            description="File nominations, upload manifestos, and track status." 
            to="/candidate/login"
            icon={UserPlus}
            theme="indigo" // Blue/Indigo for "Professional"
        />
        <RoleCard 
            title="Administrator" 
            description="Configure elections, manage voters, and publish results." 
            to="/admin/login"
            icon={ShieldCheck}
            theme="slate" // Grey for "Utility/Backend"
        />
      </div>
    </div>
  );
}

// --- Sub-Components ---

function RoleCard({ title, description, to, icon: Icon, theme }) {
  // Theme map for dynamic coloring
  const themes = {
    emerald: "hover:border-emerald-500 hover:shadow-emerald-100 group-hover:text-emerald-600 bg-emerald-50 text-emerald-600",
    indigo: "hover:border-indigo-500 hover:shadow-indigo-100 group-hover:text-indigo-600 bg-indigo-50 text-indigo-600",
    slate: "hover:border-slate-500 hover:shadow-slate-100 group-hover:text-slate-600 bg-slate-100 text-slate-600",
  };

  return (
    <Link
      to={to}
      className={`group relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${themes[theme].split(' ')[0]}`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${themes[theme].split(' ').slice(2).join(' ')}`}>
        <Icon size={24} />
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-black transition-colors">
        {title}
      </h3>
      
      <p className="text-sm text-slate-500 leading-relaxed mb-6">
        {description}
      </p>

      <div className="flex items-center text-sm font-semibold text-slate-900 gap-1 group-hover:gap-2 transition-all">
        Continue <ArrowRight size={16} />
      </div>
    </Link>
  );
}

function ImageSlider({ images, autoPlayInterval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);
    return () => clearInterval(id);
  }, [images.length, autoPlayInterval]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-md border border-slate-200 bg-slate-900 group">
      
      {/* Images with Fade Transition */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full">
        {images.map((img, index) => (
            <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
                    ${index === currentIndex ? "opacity-100" : "opacity-0"}
                `}
            >
                <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover opacity-90"
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
        ))}
      </div>

      {/* Caption Content */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white z-10">
         <div className="overflow-hidden">
            <h3 key={currentIndex + "title"} className="text-2xl font-bold mb-1 animate-in slide-in-from-bottom-2 fade-in duration-500">
                {images[currentIndex].title}
            </h3>
            <p key={currentIndex + "desc"} className="text-slate-200 text-sm md:text-base max-w-xl animate-in slide-in-from-bottom-3 fade-in duration-700">
                {images[currentIndex].caption}
            </p>
         </div>
      </div>

      {/* Navigation Buttons (Hidden on mobile, visible on hover/desktop) */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full p-2 border border-white/20 transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full p-2 border border-white/20 transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={24} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 right-6 flex gap-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full 
              ${idx === currentIndex ? "w-8 h-2 bg-indigo-500" : "w-2 h-2 bg-white/50 hover:bg-white"}
            `}
          />
        ))}
      </div>
    </div>
  );
}