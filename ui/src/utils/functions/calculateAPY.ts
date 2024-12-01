import { ComputedReserveData } from '../types/shared-types';

export function calculateBorrowAPR({
  variableRateSlope1,
  variableRateSlope2,
  optimalUsageRatio,
  baseVariableBorrowRate,
  utilizationRate,
}: ComputedReserveData): number {
  const formattedOptimalUtilizationRate = optimalUsageRatio;

  if (utilizationRate === 0) return 0;
  if (utilizationRate < formattedOptimalUtilizationRate) {
    const theoreticalVariableAPY =
      baseVariableBorrowRate +
      (variableRateSlope1 * utilizationRate) / optimalUsageRatio;
    return theoreticalVariableAPY / 10;
  } else {
    const excess = utilizationRate - optimalUsageRatio;
    const theoreticalVariableAPY =
      baseVariableBorrowRate + variableRateSlope1 + variableRateSlope2 * excess;
    return theoreticalVariableAPY / 10;
  }
}

export function getBorrowRates({
  variableRateSlope1,
  variableRateSlope2,
  optimalUsageRatio,
  baseVariableBorrowRate,
}: {
  variableRateSlope1: number;
  variableRateSlope2: number;
  optimalUsageRatio: number;
  baseVariableBorrowRate: number;
}) {
  const resolution = 200;
  const step = 100 / resolution;
  const rates = [];
  const formattedOptimalUtilizationRate = optimalUsageRatio;

  for (let i = 0; i <= resolution; i++) {
    const utilization = i * step;
    if (utilization === 0) {
      rates.push({
        variableRate: 0,
        utilization,
      });
    } else if (utilization < formattedOptimalUtilizationRate) {
      const theoreticalVariableAPY =
        baseVariableBorrowRate +
        (variableRateSlope1 * utilization) / optimalUsageRatio;
      rates.push({
        variableRate: theoreticalVariableAPY / 10,
        utilization,
      });
    } else {
      const excess = utilization - optimalUsageRatio;
      const theoreticalVariableAPY =
        baseVariableBorrowRate +
        variableRateSlope1 +
        variableRateSlope2 * excess;
      rates.push({
        variableRate: theoreticalVariableAPY / 10,
        utilization,
      });
    }
  }
  return rates;
}

export function getLendRates({
  variableRateSlope1,
  variableRateSlope2,
  optimalUsageRatio,
  baseVariableBorrowRate,
}: {
  variableRateSlope1: number;
  variableRateSlope2: number;
  optimalUsageRatio: number;
  baseVariableBorrowRate: number;
}) {
  const resolution = 200;
  const step = 100 / resolution;
  const rates = [];
  const formattedOptimalUtilizationRate = optimalUsageRatio;

  for (let i = 0; i <= resolution; i++) {
    const utilization = i * step;
    if (utilization === 0) {
      rates.push({
        variableRate: 0,
        utilization,
      });
    } else if (utilization < formattedOptimalUtilizationRate) {
      const theoreticalVariableAPY =
        baseVariableBorrowRate +
        (variableRateSlope1 * utilization) / optimalUsageRatio;
      rates.push({
        variableRate: theoreticalVariableAPY / 10,
        utilization,
      });
    } else {
      const excess = utilization - optimalUsageRatio;
      const theoreticalVariableAPY =
        baseVariableBorrowRate +
        variableRateSlope1 +
        (variableRateSlope2 * variableRateSlope1 * excess) / variableRateSlope1;
      rates.push({
        variableRate:
          theoreticalVariableAPY / 10 > 90 ? 90 : theoreticalVariableAPY / 10,
        utilization,
      });
    }
  }
  return rates;
}
