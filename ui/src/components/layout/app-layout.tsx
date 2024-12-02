import { FC } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Button } from '@/components/ui/button';
import { minimizeAddress } from '@/utils/functions/minimizeAddress';
import { NetworkDropdown, useAgoric } from '@agoric/react-components';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const { connect, address } = useAgoric();

  return (
    <section className="font-iquost">
      <div className="flex items-center justify-between  p-6 bg-gray-50">
        <h1
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 tracking-wide animate-pulse cursor-pointer"
          onClick={() => {
            window.location.href = '/';
          }}
        >
          APY-LO
        </h1>
        <Navbar />

        <Button className="relative inline-block px-4 py-2 font-medium group">
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-app-mauve group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white border-2 border-app-mauve group-hover:bg-app-mauve"></span>
          <span
            className="relative text-black group-hover:text-white"
            onClick={connect}
          >
            {address ? minimizeAddress(address) : 'Connect Wallet'}
          </span>
        </Button>
      </div>
      <div className="absolute flex justify-end w-full py-2 px-6 bg-gray-50">
        {address && (
          <NetworkDropdown
            appearance="minimal"
            size="sm"
            label="Switch your network"
          />
        )}
      </div>
      <div className="">{children}</div>
    </section>
  );
};

export default AppLayout;
