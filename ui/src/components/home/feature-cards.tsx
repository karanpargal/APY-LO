import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Landmark } from 'lucide-react';
import { motion } from 'framer-motion';

export const FeatureCards: React.FC = () => {
  const cardDetails = [
    {
      title: 'Card 1 Title',
      description: 'Card 1 Description',
      content: 'Card 1 Content',
      icon: <Landmark className="h-8 w-8" />,
    },
    {
      title: 'Card 2 Title',
      description: 'Card 2 Description',
      content: 'Card 2 Content',
      icon: <Landmark className="h-8 w-8" />,
    },
    {
      title: 'Card 3 Title',
      description: 'Card 3 Description',
      content: 'Card 3 Content',
      icon: <Landmark className="h-8 w-8" />,
    },
  ];

  // Variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // Delay between child animations
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // Initial state
    visible: { opacity: 1, y: 0, transition: { duration: 1 } }, // Animate in
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
                <CardContent className="p-3">
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
