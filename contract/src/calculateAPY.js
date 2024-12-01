/**
 * @import {ComputedReserveData} from './types.js';
 */

/**
 * @param {ComputedReserveData} reserve data
 * @returns  {number}
 */
export function calculateBorrowAPR({
  variableRateSlope1,
  variableRateSlope2,
  optimalUsageRatio,
  baseVariableBorrowRate,
  utilizationRate,
}) {
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
