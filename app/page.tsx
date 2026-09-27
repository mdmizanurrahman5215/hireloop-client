import Image from "next/image";
import HeroSection from "../app/components/pages/HeroSection";
import StatsSection from "../app/components/pages/StatsSection";
import FeaturesSection from "../app/components/pages/FeaturesSection";
import JobDiscoverySection from "../app/components/pages/JobDiscoverySection";
import PricingSection from "../app/components/pages/PricingSection";
import CtaSection from "../app/components/pages/CtaSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection/>
      <StatsSection/>
      <FeaturesSection/>
      <JobDiscoverySection/>
      <PricingSection/>
      <CtaSection/>

    </div>
  );
}
