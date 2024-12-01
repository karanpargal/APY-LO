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

export interface ComputedReserveData {
  baseVariableBorrowRate: number;
  optimalUsageRatio: number;
  utilizationRate: number;
  variableRateSlope1: number;
  variableRateSlope2: number;
  totalLiquidityUSD: number;
  totalDebtUSD: number;
}
