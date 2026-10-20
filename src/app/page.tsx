import { Faq } from "@/components/landing/Faq";
import { Features, FeatureStrip } from "@/components/landing/Features";
import { FinalCta } from "@/components/landing/FinalCta";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { Skills } from "@/components/landing/Skills";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeatureStrip />
      <Features />
      <Skills />
      <HowItWorks />
      <Pricing />
      <Faq />
      <FinalCta />
    </main>
  );
}
