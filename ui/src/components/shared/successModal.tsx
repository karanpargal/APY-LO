import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SuccessData } from '@/utils/types/shared-types';
import { SetStateAction, useMemo } from 'react';
import { Button } from '../ui/button';

export const SuccessModal: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  action: 'Supply' | 'Borrow';
  txnHash: string;
  amount: number;
}> = ({ isOpen, setIsOpen, action, txnHash, amount }) => {
  const successData: SuccessData[] = useMemo(
    () => [
      { label: 'Total Amount', data: `240` },
      { label: 'Transaction', data: 'txnHash' },
    ],
    [amount, txnHash],
  );
  return (
    <Dialog open={isOpen}>
      <DialogContent className="p-4 max-w-sm w-full tracking-wide bg-white">
        <DialogHeader>
          <DialogTitle className="flex flex-col justify-center items-center gap-y-6 border-dashed border-b p-4 border-app-slate">
            {/* <img src={success} alt="success" className="h-20 w-20" /> */}
            <div className="flex flex-col justify-center items-center gap-y-3">
              <p className="font-semibold text-2xl text-app-purple">
                {action === 'Supply' ? 'Deposit' : action} Completed
              </p>
              <p className="text-sm text-center text-app-violet w-72">
                Congratulations on your{' '}
                {action === 'Supply' ? 'deposit' : action.toLowerCase()}
              </p>
            </div>
          </DialogTitle>
          <DialogDescription>
            <div className="flex items-center justify-center gap-x-2 py-6 my-2">
              {/* <img src={tokenData?.icon} alt="tokenCoin" className="h-7 w-7" /> */}
              <p className="text-app-purple text-2xl font-semibold">20</p>
            </div>

            <ul className="bg-app-slate p-2 rounded-lg">
              {successData.map(({ label, data }) => (
                <li
                  className="flex justify-between items-center py-2 "
                  key={label}
                >
                  <p className="text-sm text-app-charteuse">{label}</p>
                  <div
                    className="flex items-center gap-x-2 cursor-pointer"
                    // onClick={() => {
                    //   window.open(
                    //     `${blockExplorerUrl}/tx/${txnHash}`,
                    //     '_blank',
                    //   );
                    // }}
                  >
                    <p className="text-app-purple">{data}</p>
                  </div>
                </li>
              ))}
            </ul>

            <DialogClose className="w-full">
              <Button
                className="relative inline-flex items-center justify-center w-full h-12 px-4 py-3 align-middle font-medium group mt-6 rounded-lg"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform rounded-lg translate-x-1 translate-y-1 bg-app-mauve group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-app-mauve rounded-lg group-hover:bg-app-mauve"></span>
                <span className="relative text-black group-hover:text-white text-center rounded-lg font-semibold text-lg">
                  Done
                </span>
              </Button>
            </DialogClose>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
