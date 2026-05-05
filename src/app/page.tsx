import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Showcase from "@/components/Showcase";
import DownloadSection from "@/components/Download";
import Docs from "@/components/Docs";
import Feedback from "@/components/Feedback";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <Showcase />
      <DownloadSection />
      <Docs />
      <Feedback />
      <Footer />
    </main>
  );
}