import { BorrowAPYContainer } from '@/components/ApyGraph/BorrowAPYContainer';
import { LendAPYContainer } from '@/components/ApyGraph/LendAPYContainer';

export const CalculateAPY: React.FC = () => {
  return (
    <section className="flex flex-col text-left">
      <BorrowAPYContainer />
      <LendAPYContainer />
    </section>
  );
};
