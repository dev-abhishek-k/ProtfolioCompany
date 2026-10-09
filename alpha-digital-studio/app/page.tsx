import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollEffects } from "@/components/ScrollEffects";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <span key={copy}>
                IMAGINE <i>✦</i> DESIGN <i>✦</i> ENGINEER <i>✦</i> EVOLVE <i>✦</i>
              </span>
            ))}
          </div>
        </div>
        <Services />
        <Work />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
      <ScrollEffects />
    </>
  );
}
