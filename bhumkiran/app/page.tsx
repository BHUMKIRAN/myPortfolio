import Features from "@/components/Features";
import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import MyPortfolio from "@/components/MyPortfolio";
import Navbar from "@/components/Navbar";
import Resume from "@/components/Resume";
import getData from "@/service/Contentful";
const page = async () => {
  const res = await getData();
  const hero = res?.fields?.hero?.heroSection;
  const portfolioSection = res?.fields?.projects?.portfolioSection;
  const features = res?.fields?.features?.featuresSection;
  const resume = res?.fields?.resume?.resumeSection;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection data={hero ?? null} />
        <Features data={features ?? null} />
        <MyPortfolio data={portfolioSection ?? null} />
        <Resume data={resume ?? null} />
        <Footer />
      </main>
    </>
  );
};

export default page;
