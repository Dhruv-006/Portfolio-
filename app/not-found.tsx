import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-night-soft)] text-[var(--color-night-text)]">
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center pointer-events-auto">
        <Link 
          href="/" 
          className="font-display text-xl sm:text-2xl hover:text-[var(--color-gold)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
        >
          श्री
        </Link>
      </nav>
      
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center z-10 relative">
        <h1 className="font-display text-8xl md:text-[150px] text-[var(--color-gold)]/20 select-none mb-4">
          404
        </h1>
        <h2 className="font-sans text-2xl md:text-3xl font-medium mb-6">
          Path Not Found
        </h2>
        <p className="font-sans text-base md:text-lg text-[var(--color-night-text)]/70 max-w-md mx-auto mb-12">
          The requested page could not be found. Let&apos;s return to the beginning of the journey.
        </p>
        <Link 
          href="/"
          className="font-sans text-sm tracking-widest uppercase border border-[var(--color-gold)]/50 text-[var(--color-gold)] px-8 py-4 hover:bg-[var(--color-gold)] hover:text-[var(--color-night-soft)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
        >
          Return Home
        </Link>
      </main>
    </div>
  );
}
