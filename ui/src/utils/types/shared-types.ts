export interface LendTableProps {
  asset: string;
  price: number;
  vAPY: number;
  totalSupplied: number;
}

export interface SuccessData {
  label: string;
  data: string | JSX.Element;
  iconUrl?: string;
}
