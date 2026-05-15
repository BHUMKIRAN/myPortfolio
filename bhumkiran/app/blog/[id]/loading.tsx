import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BlogDetailSkeleton from "@/components/skeletons/BlogDetailsSkeleton";

export default function Loading() {
  return (
    <main>
      <Navbar />
      <BlogDetailSkeleton />
      <Footer />
    </main>
  );
}
