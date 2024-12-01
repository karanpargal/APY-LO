import React, { useState } from 'react';
import { ParentSize } from '@visx/responsive';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ComputedReserveData } from '@/utils/types/shared-types';
import { LendAPYGraph } from './LendAPYGraph';

export const LendAPYContainer = (): JSX.Element => {
  const [inputs, setInputs] = useState<ComputedReserveData>({
    baseVariableBorrowRate: 0,
    optimalUsageRatio: 0,
    variableRateSlope1: 0,
    variableRateSlope2: 0,
    totalLiquidityUSD: 0,
    totalDebtUSD: 0,
    utilizationRate: 0,
  });

  const handleInputChange =
    (field: keyof ComputedReserveData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      setInputs({
        ...inputs,
        [field]: value,
      });
    };

  const inputFields = [
    {
      label:
        'Base Variable Lend Rate - Your base interest earned on your assets',
      value: inputs.baseVariableBorrowRate,
      onChange: handleInputChange('baseVariableBorrowRate'),
    },
    {
      label: 'Optimal Usage Ratio - Ideal threshold for optimal interest',
      value: inputs.optimalUsageRatio,
      onChange: handleInputChange('optimalUsageRatio'),
    },
    {
      label: 'Variable Slope 1 - Slope for interest before optimal usage ratio',
      value: inputs.variableRateSlope1,
      onChange: handleInputChange('variableRateSlope1'),
    },
    {
      label: 'Variable Slope 2 - Slope for interest after optimal usage ratio',
      value: inputs.variableRateSlope2,
      onChange: handleInputChange('variableRateSlope2'),
    },
  ];

  return (
    <div className="z-30 relative">
      <h2 className="text-2xl font-bold text-black">Lend APY</h2>
      <div className="my-10 p-6 rounded-lg flex items-center justify-between shadow-lg bg-gray">
        <div className="flex flex-col w-1/2">
          {inputFields.map((field, index) => (
            <div key={index} className="flex flex-col gap-2 mt-2">
              <Label className="text-black">{field.label}</Label>
              <Input
                className="bg-white border-strokeGray border placeholder:text-highlight mt-2 text-left"
                type="number"
                value={field.value}
                onChange={field.onChange}
              />
            </div>
          ))}
        </div>

        <div className="text-white flex flex-col gap-y-2">
          <ParentSize>{() => <LendAPYGraph reserve={inputs} />}</ParentSize>
        </div>
      </div>
    </div>
  );
};
