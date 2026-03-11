import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import PortfolioSection from '@/components/PortfolioSection';
import SkillsSection from '@/components/SkillsSection';
import SocialSection from '@/components/SocialSection';
import YouTubeSection from '@/components/YouTubeSection';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <YouTubeSection />
      <PortfolioSection />
      <SkillsSection />
      <SocialSection />
      <Footer />
    </main>
  );
}
