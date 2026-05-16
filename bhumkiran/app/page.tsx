import Features from "@/components/Features";
import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import MyPortfolio from "@/components/MyPortfolio";
import Navbar from "@/components/Navbar";
import Resume from "@/components/Resume";
import getData from "@/service/Contentful";
import type { ComponentProps, ComponentType } from "react";
import type { PortfolioContentfulEntry } from "@/types/contentful";

type HeroData = ComponentProps<typeof HeroSection>["data"];
type ResumeData = NonNullable<
  NonNullable<PortfolioContentfulEntry["fields"]>["resume"]
>["resumeSection"];

const TypedResume = Resume as ComponentType<{ data: ResumeData | null }>;

const page = async () => {
  const res = await getData();
  const entry = res as unknown as PortfolioContentfulEntry | null | undefined;
  const hero = entry?.fields?.hero?.heroSection as HeroData;
  const portfolioSection = entry?.fields?.projects?.portfolioSection;
  const features = entry?.fields?.features?.featuresSection;
  const resume = entry?.fields?.resume?.resumeSection;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection data={hero ?? null} />
        <Features data={features ?? null} />
        <MyPortfolio data={portfolioSection ?? null} />
        <TypedResume data={resume ?? null} />
        <Footer />
      </main>
    </>
  );
};

export default page;
