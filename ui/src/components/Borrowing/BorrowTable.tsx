import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { BorrowTableProps } from '@/utils/types/shared-types';
import { useEffect, useState } from 'react';

export const BorrowTable: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [wallet, setWallet] = useState<any>();
  const TableDetails: BorrowTableProps[] = [
    {
      asset: 'BLD',
      price: 0.1,
      interest: 6.8,
      totalBorrowed: 210,
    },
    {
      asset: 'IST',
      price: 1.0,
      interest: 6.8,
      totalBorrowed: 1201,
    },
  ];

  const tableHeaders =
    wallet !== ''
      ? [
          'Asset',
          'Price',
          'Interest',
          'Total Borrowed',
          'Borrowed by You',
          'Action',
        ]
      : ['Asset', 'Price', 'Interest', 'Total Borrowed', 'Action'];

  useEffect(() => {
    if (localStorage.getItem('wallet')) {
      setWallet(JSON.parse(localStorage.getItem('wallet') || ''));
    }
  }, [localStorage.getItem('wallet')]);

  return (
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
            <TableCell>${detail.price.toFixed(2)}</TableCell>
            <TableCell>{detail.interest}%</TableCell>
            <TableCell>
              {detail.totalBorrowed +
                ' ' +
                detail.asset +
                ' | $' +
                detail.price * detail.totalBorrowed}{' '}
            </TableCell>
            {wallet !== '' && <TableCell>0</TableCell>}
            <TableCell>
              <Button className="relative inline-block px-4 py-2 font-medium group w-48">
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-app-slate group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-app-slate group-hover:bg-app-slate"></span>
                <span className="relative text-black group-hover:text-white">
                  Borrow
                </span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
