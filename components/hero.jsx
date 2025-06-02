"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-gray-850 to-gray-800">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.png')] opacity-5"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-overlay filter blur-[120px] opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-overlay filter blur-[120px] opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gray-700/50 rounded-full animate-spin-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gray-700/50 rounded-full animate-spin-slow-reverse"></div>
      </div>

      <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        <div className={`text-center max-w-5xl mx-auto transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className={`mb-8 transition-opacity duration-1000 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <span className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 text-sm font-medium inline-block mb-6 backdrop-blur-sm border border-blue-500/20 shadow-glow-blue">
              ✨ Premium Finance Management
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 leading-tight tracking-tight">
            Transform Your Finances with AI Intelligence
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the future of financial management. Track, analyze, and optimize 
            your spending with powerful AI-driven insights in real-time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <SignInButton forceRedirectUrl="/dashboard" mode="modal">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-7 rounded-full flex items-center gap-3 shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 transition-all duration-300 font-medium hover:scale-105">
                Get Started Free
                <ArrowRight size={20} />
              </Button>
              </SignInButton>
          </div>

          {/* <div className={`relative mb-16 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-sm opacity-50"></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-20 animate-pulse-slow"></div>
            <div className="relative bg-gray-900 rounded-2xl p-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10 pointer-events-none h-full"></div>
              <Image
                src="/banner.jpeg"
                width={1280}
                height={720}
                alt="Dashboard Preview"
                className="rounded-xl shadow-2xl hover:scale-[1.01] transition-transform duration-700"
                priority
              />
            </div>
          </div> */}

          {/* <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="w-12 h-12 rounded-full border-2 border-gray-800 bg-gradient-to-br from-gray-700 to-gray-800 ring-2 ring-blue-500/10 shadow-lg"
                  style={{ 
                    animationDelay: `${i * 0.1}s`, 
                    animation: 'pulse 4s infinite ease-in-out' 
                  }}
                ></div>
              ))}
            </div>
            <p className="text-gray-400">
              <span className="font-semibold text-gray-200">1,000+</span> finance professionals trust us
            </p>
          </div> */}
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
        
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes spin-slow-reverse {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 6s infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 120s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 90s linear infinite;
        }
        
        .shadow-glow-blue {
          box-shadow: 0 0 25px rgba(59, 130, 246, 0.2);
        }
      `}</style>
    </section>
  );
};

export default HeroSection;