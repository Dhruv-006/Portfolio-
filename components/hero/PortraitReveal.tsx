import { forwardRef } from "react";
import { profile } from "@/data/profile";

interface PortraitRevealProps {
  className?: string;
}

export const PortraitReveal = forwardRef<HTMLDivElement, PortraitRevealProps>(
  ({ className = "" }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative overflow-hidden bg-[var(--color-paper)] border border-[var(--color-gold)]/20 flex items-center justify-center ${className}`}
        style={{
          // Use inline aspect ratio to maintain the portrait frame
          aspectRatio: "3/4",
        }}
      >
        {profile.portraitSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.portraitSrc}
            alt={`Portrait of ${profile.name}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center h-full w-full bg-[var(--color-ink)]/5">
            <span className="text-[var(--color-muted)] font-sans text-xs sm:text-sm tracking-widest uppercase">
              [PORTRAIT REQUIRED]
            </span>
          </div>
        )}
      </div>
    );
  }
);

PortraitReveal.displayName = "PortraitReveal";
