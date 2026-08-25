import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Solutions from "./components/Solutions";
import Engagement from "./components/Engagement";
import Monthly from "./components/Monthly";
import Clients from "./components/Clients";
import Estimate from "./components/Estimate";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function Ambient() {
  return (
    <div aria-hidden className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,black_35%,transparent_100%)]" />
      <div className="glow-drift absolute -top-40 -left-40 w-[42rem] h-[42rem] rounded-full bg-mint-500/[0.07] blur-[130px]" />
      <div className="glow-drift-2 absolute top-1/3 -right-52 w-[36rem] h-[36rem] rounded-full bg-sun-400/[0.05] blur-[130px]" />
      <div className="glow-drift absolute bottom-[-12rem] left-1/4 w-[34rem] h-[34rem] rounded-full bg-steel-400/[0.05] blur-[130px]" />
    </div>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Ambient />
      <div className="noise-layer" />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <Services />
        <Solutions />
        <Engagement />
        <Monthly />
        <Clients />
        <Estimate />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
