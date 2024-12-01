import { FeatureCards } from '@/components/home/feature-cards';
import { Footer } from '@/components/home/footer';
import { Landing } from '@/components/home/landing';
import { Timeline } from '@/components/home/Timeline';

export const Home: React.FC = () => {
  return (
    <section>
      <Landing />
      <FeatureCards />
      <Timeline />
      <Footer />
    </section>
  );
};
