import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";
import Image from "next/image";

const Header = async () => {
  await checkUser();

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Nomisma Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="font-bold text-xl text-blue-600 hidden sm:inline">
              Nomisma
            </span>
          </Link>

          {/* Center Nav Links - Only shown to signed-out users */}
          <div className="hidden md:flex items-center space-x-6">
            <SignedOut>
              <a
                href="#features"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Pricing
              </a>
            </SignedOut>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <SignedIn>
              <Link href="/transaction/create">
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 shadow-sm"
                >
                  <PenBox size={16} />
                  <span className="hidden sm:inline">Add Transaction</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-200 text-white-700 hover:text-blue-800 hover:bg-blue-50 flex items-center gap-2"
                >
                  <LayoutDashboard size={16} />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              </Link>
            </SignedIn>

            <SignedOut>
              <SignInButton forceRedirectUrl="/dashboard">
                <Button
                  variant="outline"
                  className="border-blue-200 text-blue-700 hover:text-blue-800 hover:bg-blue-50"
                >
                  Log In
                </Button>
              </SignInButton>
              <SignInButton forceRedirectUrl="/dashboard" mode="modal">
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
                  Get Started
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 border-2 border-blue-100",
                  },
                }}
                afterSignOutUrl="/"
              />
            </SignedIn>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
