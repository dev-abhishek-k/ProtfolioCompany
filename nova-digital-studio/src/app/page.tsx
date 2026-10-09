import ThreeScene from "@/components/ThreeScene";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import ScrollExperience from "@/components/ScrollExperience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return <><ThreeScene /><div className="site-content"><main><Hero /><div className="ticker" aria-hidden="true"><div>DESIGN ✳ TECHNOLOGY ✳ IMAGINATION ✳ DESIGN ✳ TECHNOLOGY ✳ IMAGINATION ✳ </div></div><About /><Services /><Portfolio /><ScrollExperience /><Contact /></main><Footer /></div></>;
}
