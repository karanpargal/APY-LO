import { Button } from '@/components/ui/button';
import hero from '../../../public/assets/icons/hero.png';
import Marquee from 'react-easy-marquee';
import { ChevronsUpDown } from 'lucide-react';

export const Landing: React.FC = () => {
  const data = ['Lend It', 'Borrow It', 'Stake It', 'Farm It', 'Trade It'];
  return (
    <div>
      <div className="flex justify-between items-center py-20 px-20">
        <div className="flex flex-col gap-y-4 text-left">
          <h1 className="text-7xl font-bold text-app-purple">
            Something coming up
          </h1>
          <p className="text-xl font-medium text-app-violet">
            Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit. Sed
            do eiusmod tempor incididunt ut
          </p>
          <Button className="w-72 py-6 rounded-full bg-app-slate mt-10">
            Connect Wallet
          </Button>
        </div>
        <img src={hero} alt="Hero" />
      </div>

      <div className="pt-20">
        <div className="relative w-screen rotate-6 bg-app-charteuse overflow">
          <Marquee
            className="text-app-purple font-bold text-xl py-6"
            duration={10000}
            height="60px"
            background=""
          >
            {data.map((item, index) => (
              <span key={index} className="mx-8">
                {item}
              </span>
            ))}
          </Marquee>
        </div>

        <div className="relative w-screen -rotate-6 bg-app-slate overflow">
          <Marquee
            className="text-app-purple font-bold text-xl py-4"
            duration={10000}
            height="60px"
            background=""
            reverse
          >
            {data.map((item, index) => (
              <span key={index} className="mx-8">
                {item}
              </span>
            ))}
          </Marquee>
        </div>

        <p className="flex justify-center mt-10 items-center  animate-scrollDown">
          scroll <ChevronsUpDown className="h-10 w-10 text-black mx-2" />
          down
        </p>
      </div>
    </div>
  );
};
