import CTASection  from "@/components/CTASection";
import HeroSection from "@/components/Hero/HeroSection";
import ServicesPreview from "@/components/ServicesPreview";
import StatsSection from "@/components/Stats/StatSection";
import TestimonialSection  from "@/components/Testimonial/TestimonialSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <StatsSection />
      <TestimonialSection />
      <CTASection />
    </>
  );
}
