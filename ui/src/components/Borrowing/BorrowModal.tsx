import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SetStateAction, useState } from 'react';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { SuccessModal } from '../shared/successModal';

export const BorrowModal: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;

  txnHash: string;
  amount: number;
}> = ({ isOpen, setIsOpen, txnHash, amount }) => {
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);

  const handleSupplyClick = () => {
    // Close the SupplyModal
    setIsOpen(false);
    // Open the SuccessModal
    setOpenSuccessModal(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-8 w-2/3 tracking-wide bg-slate-100 h-80">
          <DialogHeader>
            <DialogTitle className="">
              <p className="font-semibold text-2xl text-app-pruple border-b border-app-purple p-2">
                Borrow Assets
              </p>
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-10 py-3 rounded-lg mt-4 bg-app-slate px-4">
                <Select>
                  <SelectTrigger className="w-64 border-app-purple text-app-charteuse">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent className="mt-4 w-64 bg-app-purple text-app-mauve hover:bg-app-purple hover:text-slate-100">
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="0"
                  className="text-right placeholder:text-app-charteuse text-app-charteuse ml-6 focus:ring-0 focus:border-none"
                />
              </div>
              <div className="flex justify-between items-center text-lg">
                <p className="text-app-violet">Your Balance</p>
                <p className="text-app-purple">230</p>
              </div>

              <DialogClose className="w-full">
                <Button
                  className="relative inline-flex items-center justify-center w-full h-12 px-4 py-3 align-middle font-medium group mt-6 rounded-lg"
                  onClick={handleSupplyClick} // Handle the click here
                >
                  <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform rounded-lg translate-x-1 translate-y-1 bg-app-mauve group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                  <span className="absolute inset-0 w-full h-full bg-white border-2 border-app-mauve rounded-lg group-hover:bg-app-mauve"></span>
                  <span className="relative text-black group-hover:text-white text-center rounded-lg font-semibold text-lg">
                    Borrow
                  </span>
                </Button>
              </DialogClose>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <SuccessModal
        isOpen={openSuccessModal} // Use openSuccessModal state to control visibility
        setIsOpen={setOpenSuccessModal}
        action={'Borrow'}
        txnHash={txnHash}
        amount={amount}
      />
    </>
  );
};
