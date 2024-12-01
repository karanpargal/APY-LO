import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { LendTableProps } from '@/utils/types/shared-types';
import { useEffect, useState } from 'react';
import { SuccessModal } from '../shared/successModal';
import { StargateClient } from '@cosmjs/stargate';

export const LendTable: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [wallet, setWallet] = useState<any>();
  const [balances, setBalances] = useState<
    {
      amount: number;
      denom: string;
    }[]
  >([]);

  const TableDetails: LendTableProps[] = [
    {
      asset: 'BLD',
      price: 0.1,
      vAPY: 4.8,
      totalSupplied: 520,
    },
    {
      asset: 'IST',
      price: 1.0,
      vAPY: 4.8,
      totalSupplied: 2450,
    },
  ];

  const tableHeaders =
    wallet && wallet?.address
      ? [
          'Asset',
          'Price',
          'vAPY',
          'Total Supplied',
          'Your wallet',
          'Your Supply',
          'Action',
        ]
      : ['Asset', 'Price', 'vAPY', 'Total Supplied', 'Action'];

  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);

  const txnHash = '0x12345abcdef';
  const amount = 100;

  const fetchBalanceFromRpc = async (address: string, rpcEndpoint: string) => {
    const client = await StargateClient.connect(rpcEndpoint);
    const balances = await client.getAllBalances(address);
    setBalances(
      balances.map(coin => {
        return {
          amount: Number(coin.amount),
          denom: coin.denom,
        };
      }),
    );
  };

  useEffect(() => {
    if (localStorage.getItem('wallet')) {
      setWallet(JSON.parse(localStorage.getItem('wallet') || ''));
    }
  }, [localStorage.getItem('wallet')]);

  useEffect(() => {
    if (wallet) {
      fetchBalanceFromRpc(wallet.address, 'https://devnet.rpc.agoric.net:443');
    }
  }, [wallet]);

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
              <TableCell>${detail.price.toFixed(2)}</TableCell>
              <TableCell>{detail.vAPY}%</TableCell>
              <TableCell>
                {detail.totalSupplied +
                  ' ' +
                  detail.asset +
                  ' | $' +
                  detail.price * detail.totalSupplied}{' '}
              </TableCell>
              {wallet && balances && (
                <TableCell>
                  {(balances.find(
                    coin => 'u' + detail.asset.toLowerCase() === coin.denom,
                  )?.amount ?? 0) / Math.pow(10, 6)}
                </TableCell>
              )}
              {wallet && <TableCell>0</TableCell>}
              <TableCell>
                <Button
                  className="relative inline-block px-4 py-2 font-medium group w-48"
                  onClick={() => setOpenSuccessModal(true)}
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
