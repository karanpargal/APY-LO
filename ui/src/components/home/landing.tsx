import { Button } from '@/components/ui/button';
import hero from '../../../public/assets/icons/hero.png';
import Marquee from 'react-easy-marquee';
import { ChevronsUpDown } from 'lucide-react';
import {
  makeAgoricWalletConnection,
  suggestChain,
} from '@agoric/web-components';
import { makeAgoricChainStorageWatcher } from '@agoric/rpc';
import { minimizeAddress } from '@/utils/functions/minimizeAddress';
import { useState } from 'react';

const ENDPOINTS = {
  RPC: 'https://devnet.rpc.agoric.net:443',
  API: 'https://devnet.api.agoric.net:443',
};

export const Landing: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const watcher = makeAgoricChainStorageWatcher(ENDPOINTS.API, 'agoricdev-23');

  const connectWallet = async () => {
    setLoading(true);
    try {
      await suggestChain('https://devnet.agoric.net/network-config');
      const wallet = await makeAgoricWalletConnection(watcher, ENDPOINTS.RPC);
      setAddress(wallet.address);
      localStorage.setItem('wallet', JSON.stringify(wallet));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAddress('');
    localStorage.removeItem('wallet');
  };
  const data = ['Lend It', 'Borrow It', 'Stake It', 'Farm It', 'Trade It'];
  return (
    <div className="bg-gray-50 h-screen">
      <div className="flex justify-between items-center py-20 px-20 ">
        <div className="flex flex-col gap-y-4 text-left">
          <h1 className="text-6xl font-bold text-app-purple">
            Cross-Chain Lending & Borrowing Simplified
          </h1>
          <p className="text-xl font-medium text-app-violet">
            Maximize Earnings, Borrow Seamlessly Across Chains, Explore Dynamic
            APY
          </p>
          <Button className="relative inline-flex items-center justify-center w-96 h-14 px-4 py-3 align-middle font-medium group mt-6">
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-app-mauve group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-app-mauve group-hover:bg-app-mauve"></span>
            <span
              className="relative text-black group-hover:text-white text-center font-semibold text-lg"
              onClick={() => {
                address ? disconnectWallet() : connectWallet();
              }}
            >
              {loading
                ? 'Connecting...'
                : address
                  ? minimizeAddress(address)
                  : 'Connect Wallet'}
            </span>
          </Button>
        </div>
        <img src={hero} alt="Hero" />
      </div>

      <div className="pt-16">
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

        <p className="flex justify-center mt-20 items-center  animate-scrollDown">
          scroll <ChevronsUpDown className="h-10 w-10 text-black mx-2" />
          down
        </p>
      </div>
    </div>
  );
};
