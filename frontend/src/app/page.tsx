import Hero from "@/components/sections/Hero";
import AboutStack from "@/components/sections/AboutStack";
import PortfolioGallery from "@/components/sections/PortfolioGallery";
import ProjectsShowcase from "@/components/sections/ProjectsShowcase";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:pt-16">
        <Hero />
        <div className="mt-14 sm:mt-20">
          <AboutStack />
        </div>
        <div className="mt-14 sm:mt-20">
          <PortfolioGallery />
        </div>
        <div className="mt-14 sm:mt-20">
          <ProjectsShowcase />
        </div>
      </div>
      <Footer />
    </main>
  );
}


