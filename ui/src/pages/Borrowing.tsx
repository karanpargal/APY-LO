import { BorrowTable } from '@/components/Borrowing/BorrowTable';

export const Borrowing: React.FC = () => {
  return (
    <section className="flex flex-col text-left py-20 px-28">
      <div className="flex flex-col gap-y-2 border border-app-violet p-6 bg-gray-50 shadow-lg">
        <h1 className="text-5xl font-bold text-app-purple">Borrow</h1>
        <p className="text-xl font-medium text-app-violet">
          Borrow assets from the protocol and pay interest on the borrowed
          assets. Provide collateral to borrow more assets.
        </p>
      </div>

      <div className="py-10">
        <BorrowTable />
      </div>
    </section>
  );
};
