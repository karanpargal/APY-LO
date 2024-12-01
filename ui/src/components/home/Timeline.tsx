import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export const Timeline: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const controls = useAnimation();

  const stages = [
    {
      id: 1,
      title: 'Connect Wallet',
      description: 'Securely connect your wallet to begin.',
    },
    { id: 2, title: 'Lend', description: 'Lend assets to earn rewards.' },
    {
      id: 3,
      title: 'Borrow',
      description: 'Borrow using your collateral safely.',
    },
    {
      id: 4,
      title: 'Analyze',
      description: 'Track and optimize your financial journey.',
    },
    {
      id: 5,
      title: 'Provide Feedback',
      description: 'Track and optimize your financial journey.',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const maxHeight = window.innerHeight; // Limit to viewport height
      setScrollY(Math.min(window.scrollY, maxHeight));
    };

    window.addEventListener('scroll', handleScroll);

    controls.start({
      height: `${scrollY}px`, // Limit height to the viewport height
      transition: { duration: 0.6, ease: 'easeOut' },
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY, controls]);

  return (
    <div className="relative bg-gray-50 min-h-screen py-16">
      <p className="text-5xl font-semibold p-2 text-app-purple">
        <span className=" border-b-2 border-dashed border-app-slate p-2">
          Flow Map
        </span>
      </p>
      <div className="container mx-auto px-4 mt-20">
        <div className="relative flex justify-center">
          {/* Background Line */}
          <div className="relative w-2 bg-gray-300 rounded h-screen">
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bg-app-mauve rounded w-2"
              initial={{ height: 0 }}
              animate={controls}
            />
          </div>

          <div className="absolute top-0 w-full">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.id}
                className={`relative flex ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="w-96 shadow-md p-4 mx-4 bg-white">
                  <CardHeader>
                    <CardTitle className="text-2xl font-medium text-app-slate">
                      {stage.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-lg text-gray-600">
                      {stage.description}
                    </CardDescription>
                  </CardContent>
                </Card>

                {/* Connecting Dots */}
                <div className="absolute flex flex-col items-center justify-center top-0 left-[50%] transform -translate-x-[50%]">
                  <div className="w-3 h-3 bg-app-purple rounded-full"></div>
                  {index < stages.length - 1 && (
                    <div className="w-1 h-24 bg-app-mauve"></div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;