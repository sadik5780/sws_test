import Hero from "@/components/sections/Hero";
import IntroStatement from "@/components/sections/IntroStatement";
import Storytelling from "@/components/sections/Storytelling";
import ImageReveal from "@/components/sections/ImageReveal";
import HorizontalGallery from "@/components/sections/HorizontalGallery";
import Portfolio from "@/components/sections/Portfolio";
import FooterCTA from "@/components/sections/FooterCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <IntroStatement />
      <Storytelling />
      <ImageReveal />
      <HorizontalGallery />
      <Portfolio />
      <FooterCTA />
    </main>
  );
}
