import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { LendTableProps } from '@/utils/types/shared-types';
import { useState } from 'react';
import { SuccessModal } from '../shared/successModal';

export const LendTable: React.FC = () => {
  // Table data
  const TableDetails: LendTableProps[] = [
    {
      asset: 'USDT',
      price: 24.66,
      vAPY: 9.6,
      totalSupplied: 520,
    },
    {
      asset: 'ETH',
      price: 1632.55,
      vAPY: 5.4,
      totalSupplied: 2450,
    },
  ];

  // Table headers
  const tableHeaders = ['Asset', 'Price', 'vAPY', 'Total Supplied', 'Action'];

  // State for the success modal
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);

  // Dummy values for SuccessModal props
  const txnHash = '0x12345abcdef';
  const amount = 100;

  return (
    <div>
      <Table className="rounded-2xl border border-app-violet bg-slate-50">
        <TableHeader className="text-center text-base tracking-wide bg-app-mauve">
          <TableRow className="border border-app-violet text-app-purple">
            {tableHeaders.map(header => (
              <TableCell
                key={header}
                className={header === 'Asset' ? 'text-left' : 'text-center'}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {TableDetails.map((detail, index) => (
            <TableRow key={index} className="text-center">
              <TableCell className="text-left">{detail.asset}</TableCell>
              <TableCell>{detail.price.toFixed(2)}</TableCell>
              <TableCell>{detail.vAPY}%</TableCell>
              <TableCell>{detail.totalSupplied}</TableCell>
              <TableCell>
                <Button
                  className="relative inline-block px-4 py-2 font-medium group w-48"
                  onClick={() => setOpenSuccessModal(true)} // Open modal on button click
                >
                  <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-app-slate group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                  <span className="absolute inset-0 w-full h-full bg-white border-2 border-app-slate group-hover:bg-app-slate"></span>
                  <span className="relative text-black group-hover:text-white">
                    Lend
                  </span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Success Modal */}
      <SuccessModal
        isOpen={openSuccessModal}
        setIsOpen={setOpenSuccessModal}
        txnHash={txnHash}
        action="Supply"
        amount={amount}
      />
    </div>
  );
};
