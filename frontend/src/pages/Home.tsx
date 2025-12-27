import Footer from "@/components/features/common/Footer";
import Navbar from "@/components/features/common/Navbar";
import { CreatePollModal } from "@/components/features/home/CreatePollModal";
import Features from "@/components/features/home/Features";
import Hero from "@/components/features/home/Hero";

function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero>
          <CreatePollModal />
        </Hero>
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
