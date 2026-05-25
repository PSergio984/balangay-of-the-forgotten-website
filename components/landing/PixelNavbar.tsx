"use client";

import Link from "next/link";

export default function PixelNavbar() {
  return (
    <nav className="sticky top-0 z-40 w-full bg-black/80 backdrop-blur-sm border-b-4 border-zinc-800 font-pixel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-white text-lg hover:text-indigo-400 transition-colors tracking-tighter">
              BALANGAY
            </Link>
            
            <div className="hidden md:flex items-baseline space-x-6">
              <Link href="/explore" className="text-zinc-400 hover:text-white px-3 py-2 text-[10px] uppercase transition-colors">
                Explore
              </Link>
              <Link href="/logbook" className="text-zinc-400 hover:text-white px-3 py-2 text-[10px] uppercase transition-colors">
                Logbook
              </Link>
              <Link href="/wiki" className="text-zinc-400 hover:text-white px-3 py-2 text-[10px] uppercase transition-colors">
                Wiki
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 text-[10px] uppercase border-b-4 border-r-4 border-indigo-900 active:border-0 active:translate-y-1 active:translate-x-1 transition-all">
              Join Voyage
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
