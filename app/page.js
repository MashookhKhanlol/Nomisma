import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import HeroSection from "@/components/hero";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-28 bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 border-t border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-105 transition-transform duration-500 ease-out">
                <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-300 mb-3">
                  {stat.value}
                </div>
                <div className="text-gray-300 font-light tracking-wider uppercase text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-4 bg-black">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-white">
            Premium Financial Management
          </h2>
          <p className="text-center text-gray-400 mb-20 max-w-2xl mx-auto">
            Sophisticated tools designed to elevate your financial experience
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuresData.map((feature, index) => (
              <Card key={index} className="bg-gradient-to-b from-gray-800 to-gray-900 border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-500 overflow-hidden rounded-xl backdrop-blur-sm">
                <div className="h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
                <CardContent className="space-y-6 p-10">
                  <div className="text-amber-400">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-28 bg-gradient-to-b from-black to-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-white">The Process</h2>
          <p className="text-center text-gray-400 mb-20 max-w-2xl mx-auto">
            Our streamlined approach to financial excellence
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            {howItWorksData.map((step, index) => (
              <div key={index} className="relative z-10 text-center hover:translate-y-[-8px] transition-all duration-500 ease-out">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-10 shadow-[0_10px_25px_rgba(245,158,11,0.3)] rotate-45">
                  <div className="-rotate-45 text-gray-900">{step.icon}</div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-700 to-transparent hidden md:block"></div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-white">Client Experiences</h2>
          <p className="text-center text-gray-400 mb-20 max-w-2xl mx-auto">
            Insights from our valued members
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonialsData.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-500 rounded-xl overflow-hidden backdrop-blur-sm">
                <CardContent className="p-10">
                  <div className="mb-8 text-amber-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="currentColor" className="opacity-60">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.999v10h-9.999z"/>
                    </svg>
                  </div>
                  <p className="text-gray-300 italic mb-8">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <div className="w-14 h-14 relative">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="rounded-full object-cover border-2 border-amber-500"
                      />
                    </div>
                    <div className="ml-5">
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-amber-400">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
