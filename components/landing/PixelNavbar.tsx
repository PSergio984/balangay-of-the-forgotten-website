"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import WikiSearch from "@/components/wiki/WikiSearch";

export default function PixelNavbar() {
  const pathname = usePathname();

  const handleJoinVoyage = () => {
    // Placeholder for actual join flow
    window.location.href = '/join';
  };

  const navLinks = [
    { name: "Explore", href: "/explore" },
    { name: "Logbook", href: "/logbook" },
    { name: "Wiki", href: "/wiki" },
    { name: "Timeline", href: "/wiki/timeline" },
    { name: "Search", href: "/wiki/search" },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full bg-black/80 backdrop-blur-sm border-b-4 border-zinc-800 font-pixel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          <div className="flex items-center gap-8 shrink-0">
            <Link href="/" className="text-white text-lg hover:text-indigo-400 transition-colors tracking-tighter">
              BALANGAY
            </Link>
            
            <div className="hidden md:flex items-baseline space-x-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link 
                    key={link.name}
                    href={link.href} 
                    className={`${isActive ? 'text-white' : 'text-zinc-400'} hover:text-white px-3 py-2 text-[10px] uppercase transition-colors`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex-1 max-w-md hidden lg:block">
            <WikiSearch />
          </div>
          
          <div className="flex items-center shrink-0">
            <button 
              onClick={handleJoinVoyage}
              aria-label="Join the voyage"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 text-[10px] uppercase border-b-4 border-r-4 border-indigo-900 active:border-0 active:translate-y-1 active:translate-x-1 transition-all"
            >
              Join Voyage
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
