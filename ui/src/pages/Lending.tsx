import { LendTable } from '@/components/lending/lend-table';

export const Lending: React.FC = () => {
  return (
    <section className="flex flex-col text-left py-20 px-28">
      <div className="flex flex-col gap-y-2 border border-app-violet p-6 bg-gray-50 shadow-lg">
        <h1 className="text-5xl font-bold text-app-purple">Lend</h1>
        <p className="text-xl font-medium text-app-violet">
          Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit. Sed do
          eiusmod tempor incididunt ut
        </p>
      </div>

      <div className="py-10">
        <LendTable />
      </div>
    </section>
  );
};
