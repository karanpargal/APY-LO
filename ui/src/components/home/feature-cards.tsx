import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link, ChartLine, SquarePercent } from 'lucide-react';
import { motion } from 'framer-motion';

export const FeatureCards: React.FC = () => {
  const cardDetails = [
    {
      title: 'Cross-Chain Flexibility',
      description: '',
      content:
        'Lend assets on Chain X and borrow on Chains Y, Z, and A with up to 80% liquidity.',
      icon: <Link className="h-8 w-8" />,
    },
    {
      title: 'Dynamic APY Optimization',
      description: '',
      content:
        'Experience interest rates that adjust based on pool liquidity for maximum returns.',
      icon: <SquarePercent className="h-8 w-8" />,
    },
    {
      title: 'Interactive APY Estimator',
      description: '',
      content:
        'Visualize and play with APY trends using our "Estimate APY" graphs for smarter decisions.',
      icon: <ChartLine className="h-8 w-8" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <motion.section
      className="flex flex-col items-center justify-center gap-y-32 px-10 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <p className="text-5xl font-semibold border-b-2 border-dashed border-app-slate p-2 text-app-purple">
        Key Features
      </p>
      <motion.div
        className="flex items-center justify-center gap-x-20 flex-wrap"
        variants={containerVariants}
      >
        {cardDetails.map((card, index) => (
          <motion.div
            key={index}
            className="relative"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Animate when 20% of the card is in view
          >
            <Card className="relative w-96 h-80 rounded-xl border-app-violet shadow-md border-r-4 border-b-4">
              <CardHeader>
                <span className="-mt-12 absolute bg-white">{card.icon}</span>
                <CardTitle className="text-lg font-medium text-app-purple">
                  {card.title}
                </CardTitle>
                <CardDescription className="mt-10 text-base text-app-violet">
                  {card.description}
                </CardDescription>
              </CardHeader>
              <div className="mx-6 bg-app-charteuse h-48 rounded-xl">
                <CardContent className="p-3 text-center flex flex-col justify-center py-6">
                  <p>{card.content}</p>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};
