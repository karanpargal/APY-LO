import { FC, useState } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Button } from '@/components/ui/button';
import {
  makeAgoricWalletConnection,
  suggestChain,
} from '@agoric/web-components';
import { makeAgoricChainStorageWatcher } from '@agoric/rpc';
import { minimizeAddress } from '@/utils/functions/minimizeAddress';

interface AppLayoutProps {
  children: React.ReactNode;
}

const ENDPOINTS = {
  RPC: 'https://devnet.rpc.agoric.net:443',
  API: 'https://devnet.api.agoric.net:443',
};

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
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

  return (
    <section className="font-iquost px-6 py-2">
      <div className="flex items-center justify-between">
        <h1>Logo</h1>
        <Navbar />
        <Button className="relative inline-block px-4 py-2 font-medium group">
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-pink-500 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white border-2 border-pink-500 group-hover:bg-pink-500"></span>
          <span
            className="relative text-black group-hover:text-white"
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

      <div className="py-20 px-10">{children}</div>
    </section>
  );
};

export default AppLayout;
