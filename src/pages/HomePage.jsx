import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import ProductCategories from '../components/home/ProductCategories';
import MicrogreensGallery from '../components/home/MicrogreensGallery';

import Benefits from '../components/home/Benefits';
import Sustainability from '../components/home/Sustainability';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutSection />

      <ProductCategories />
      <MicrogreensGallery />
      <Benefits />
      <Sustainability />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </main>
  );
}
