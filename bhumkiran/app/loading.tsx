import HeroSkeleton from "@/components/skeletons/hero";
import FeaturesSkeleton from "@/components/skeletons/features";
import PortfolioSkeleton from "@/components/skeletons/myportfolio";
import ResumeSkeleton from "@/components/skeletons/resume";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Loading() {
  return (
    <main>
      <Navbar />
      <HeroSkeleton />
      <FeaturesSkeleton />
      <PortfolioSkeleton />
      <ResumeSkeleton />
      <Footer />
    </main>
  );
}
