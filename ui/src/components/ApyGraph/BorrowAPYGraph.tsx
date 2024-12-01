import { CartesianGrid, XAxis, LineChart, Line } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';
import { ComputedReserveData } from '@/utils/types/shared-types';
import { getBorrowRates } from '@/utils/functions/calculateAPY';

const chartConfig = {
  variableRate: {
    label: 'Variable Interest Rate ',
    color: '#000',
  },
} satisfies ChartConfig;

export const BorrowAPYGraph = ({
  reserve,
}: {
  reserve: ComputedReserveData;
}) => {
  const variableBorrowRateData = getBorrowRates(reserve);

  return (
    <ChartContainer config={chartConfig} className="h-80">
      <LineChart
        className="h-full w-full"
        accessibilityLayer
        data={variableBorrowRateData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="utilization"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="variableRate"
          type="linear"
          stroke="#945AF4"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};
