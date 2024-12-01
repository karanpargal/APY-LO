import { FC } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Button } from '@/components/ui/button';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <section className="font-iquost px-6 py-2">
      <div className="flex items-center justify-between">
        <h1>Logo</h1>
        <Navbar />
        <Button className="relative inline-block px-4 py-2 font-medium group">
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-pink-500 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white border-2 border-pink-500 group-hover:bg-pink-500"></span>
          <span className="relative text-black group-hover:text-white">
            Connect Wallet
          </span>
        </Button>
      </div>
      <div className="py-20 px-10">{children}</div>
    </section>
  );
};

export default AppLayout;
