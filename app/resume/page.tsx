import { profile } from "@/data/profile";
import { journey } from "@/data/journey";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { PrintButton } from "@/components/resume/PrintButton";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: `Resume - ${profile.name}`,
  description: `Professional Resume of ${profile.name}`,
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] selection:bg-[var(--color-saffron)] selection:text-[var(--color-paper)] print:bg-white print:text-black py-20 md:py-12">
      <PrintButton />
      
      <Link 
        href="/"
        className="fixed top-6 left-6 md:top-8 md:left-12 z-50 flex items-center gap-2 font-sans text-xs md:text-sm uppercase tracking-widest text-[var(--color-ink)] hover:text-[var(--color-saffron)] transition-colors duration-300 print:hidden group bg-[var(--color-ivory)]/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[var(--color-gold)]/20"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
        <span>Portfolio</span>
      </Link>
      
      <main className="max-w-[210mm] mx-auto bg-[var(--color-ivory)] p-8 md:p-16 lg:p-24 shadow-2xl print:shadow-none print:my-0 print:p-0 print:max-w-none print:bg-white paper-texture print:paper-texture-none">
        
        {/* Header */}
        <header className="border-b-2 border-[var(--color-ink)] pb-8 mb-8 print:border-black print:pt-4">
          <h1 className="font-display text-5xl md:text-7xl mb-4 text-[var(--color-ink)] print:text-black leading-tight tracking-tight pt-2">
            {profile.name}
          </h1>
          <p className="font-sans text-xl uppercase tracking-widest text-[var(--color-saffron)] print:text-gray-600 mb-6">
            {profile.role}
          </p>
          
          <div className="flex flex-wrap gap-4 font-sans text-sm tracking-widest uppercase">
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="hover:text-[var(--color-saffron)] print:text-black">
                {profile.email}
              </a>
            )}
            {profile.linkedinUrl && (
              <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-saffron)] print:text-black">
                LinkedIn
              </a>
            )}
            {profile.githubUrl && (
              <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-saffron)] print:text-black">
                GitHub
              </a>
            )}
          </div>
        </header>

        {/* Summary */}
        <section className="mb-12">
          <h2 className="font-display text-2xl uppercase tracking-wider mb-4 border-b border-[var(--color-ink)]/20 print:border-black/20 pb-2">
            Profile
          </h2>
          <p className="font-sans text-lg font-light leading-relaxed opacity-90 print:opacity-100 print:text-sm">
            {profile.shortBio}
          </p>
        </section>

        {/* Experience & Education */}
        <section className="mb-12">
          <h2 className="font-display text-2xl uppercase tracking-wider mb-6 border-b border-[var(--color-ink)]/20 print:border-black/20 pb-2">
            Experience & Education
          </h2>
          <div className="space-y-8">
            {journey
              .sort((a, b) => a.order - b.order)
              .map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2">
                <div className="flex-1">
                  <h3 className="font-sans text-xl font-medium">{item.title}</h3>
                  <p className="font-sans text-base font-light opacity-80 print:opacity-100 print:text-sm mt-2 max-w-2xl">
                    {item.description}
                  </p>
                </div>
                <div className="font-sans text-sm uppercase tracking-widest text-[var(--color-saffron)] print:text-gray-600 md:text-right shrink-0">
                  {item.period}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Projects */}
        <section className="mb-12">
          <h2 className="font-display text-2xl uppercase tracking-wider mb-6 border-b border-[var(--color-ink)]/20 print:border-black/20 pb-2">
            Selected Projects
          </h2>
          <div className="space-y-8">
            {projects
              .filter(p => p.featured)
              .sort((a, b) => a.order - b.order)
              .map((project) => (
              <div key={project.id}>
                <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-2">
                  <h3 className="font-sans text-xl font-medium flex items-center gap-4">
                    {project.title}
                    <span className="text-sm font-light uppercase tracking-widest opacity-60 print:opacity-100">
                      {project.role}
                    </span>
                  </h3>
                </div>
                <p className="font-sans text-base font-light opacity-80 print:opacity-100 print:text-sm mb-3">
                  {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 8).map((tech, idx) => (
                    <span key={idx} className="font-sans text-[10px] uppercase tracking-wider border border-[var(--color-ink)]/20 print:border-black/20 px-2 py-1 opacity-70 print:opacity-100">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 8 && (
                    <span className="font-sans text-[10px] uppercase tracking-wider border border-[var(--color-ink)]/20 print:border-black/20 px-2 py-1 opacity-70 print:opacity-100">
                      +{project.technologies.length - 8} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="font-display text-2xl uppercase tracking-wider mb-6 border-b border-[var(--color-ink)]/20 print:border-black/20 pb-2">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:grid-cols-3">
            {skills
              .sort((a, b) => a.order - b.order)
              .map((group) => (
              <div key={group.id}>
                <h3 className="font-sans text-sm uppercase tracking-widest opacity-60 print:opacity-100 mb-3">
                  {group.englishLabel}
                </h3>
                <ul className="flex flex-col space-y-2">
                  {group.skills.map((skill, idx) => (
                    <li key={idx} className="font-sans text-base font-light print:text-sm">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
