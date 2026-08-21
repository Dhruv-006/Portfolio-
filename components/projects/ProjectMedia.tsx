import Image from "next/image";

interface ProjectMediaProps {
  src: string | null;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function ProjectMedia({ src, alt, className = "", priority = false }: ProjectMediaProps) {
  return (
    <div className={`relative bg-[var(--color-ink)]/5 border border-[var(--color-gold)]/10 overflow-hidden flex items-center justify-center ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-[var(--color-muted)]">
          <span className="font-sans text-xs md:text-sm tracking-widest uppercase">
            [PROJECT SCREENSHOT REQUIRED]
          </span>
        </div>
      )}
    </div>
  );
}
