import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BlogSkeleton from "@/components/skeletons/blog";

export default function Loading() {
  return (
    <main>
      <Navbar />
      <BlogSkeleton />
      <Footer />
    </main>
  );
}
