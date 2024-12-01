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
      { label: 'APY', data: '4.5%' },
      { label: 'Transaction', data: 'txnHash' },
    ],
    [amount, txnHash],
  );
  return (
    <Dialog open={isOpen}>
      <DialogContent className="p-4 max-w-sm w-full">
        <DialogHeader>
          <DialogTitle className="flex flex-col justify-center items-center gap-y-6">
            {/* <img src={success} alt="success" className="h-20 w-20" /> */}
            <div className="flex flex-col justify-center items-center gap-y-3">
              <p className="text-base font-semibold">
                {action === 'Supply' ? 'Deposit' : action} Completed
              </p>
              <p className="text-sm text-center text-secondaryText w-72">
                Congratulations on your{' '}
                {action === 'Supply' ? 'deposit' : action.toLowerCase()} with
                Positions Finance
              </p>
            </div>
          </DialogTitle>
          <DialogDescription>
            <div className="flex items-center justify-center gap-x-2 border-t border-b py-6 my-6">
              {/* <img src={tokenData?.icon} alt="tokenCoin" className="h-7 w-7" /> */}
              <p className="text-2xl font-semibold text-white">
                {/* {amount} {tokenData?.type} */}
              </p>
            </div>

            <ul>
              {successData.map(({ label, data }) => (
                <li
                  className="flex justify-between items-center py-2"
                  key={label}
                >
                  <p className="text-sm">{label}</p>
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
                          ? 'text-citrine text-sm font-medium'
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
                className="py-3 w-full"
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
