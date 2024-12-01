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
          <DialogTitle className="flex flex-col justify-center items-center gap-y-6">
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
            <div className="flex items-center justify-center gap-x-2 py-6 my-6">
              {/* <img src={tokenData?.icon} alt="tokenCoin" className="h-7 w-7" /> */}
              <p className="text-app-purple text-2xl font-semibold">20</p>
            </div>

            <ul>
              {successData.map(({ label, data }) => (
                <li
                  className="flex justify-between items-center py-2 first:border-b first:border-b-app-violet"
                  key={label}
                >
                  <p className="text-sm text-app-violet">{label}</p>
                  <div
                    className="flex items-center gap-x-2 cursor-pointer"
                    // onClick={() => {
                    //   window.open(
                    //     `${blockExplorerUrl}/tx/${txnHash}`,
                    //     '_blank',
                    //   );
                    // }}
                  >
                    <p
                      className={
                        label === 'Transaction'
                          ? 'text-purple text-sm font-medium'
                          : 'text-white  text-sm font-medium'
                      }
                    >
                      {data}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <DialogClose className="mt-4 w-full">
              <Button
                className="py-5 w-full border border-app-slate text-app-purple hover:text-app-purple"
                variant={'secondary'}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Done
              </Button>
            </DialogClose>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
