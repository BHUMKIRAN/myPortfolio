import Features from "@/components/Features";
import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import MyPortfolio from "@/components/MyPortfolio";
import Navbar from "@/components/Navbar";
import Resume from "@/components/Resume";

const page = () => {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <Features/>
        <MyPortfolio/>
        <Resume/>
        <Footer/>
      </main>
    </>
  );
};

export default page
