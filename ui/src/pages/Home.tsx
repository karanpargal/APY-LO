import { FeatureCards } from '@/components/home/feature-cards';
import { Landing } from '@/components/home/landing';

export const Home: React.FC = () => {
  return (
    <section>
      <Landing />
      <FeatureCards />
    </section>
  );
};
