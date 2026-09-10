import type { PrincipalInterest, RepaymentRow } from "@/lib/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface PrincipalInterestChartProps {
  schedule: RepaymentRow[];
  principalInterest: PrincipalInterest;
}

function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Stacked bar chart showing how each month's EMI splits into principal
 * (indigo) and interest (amber) over the repayment schedule.
 */
export function PrincipalInterestChart({
  schedule,
  principalInterest,
}: PrincipalInterestChartProps) {
  const data = schedule.map((row) => ({
    month: row.month,
    principal: row.principal,
    interest: row.interest,
  }));

  return (
    <div className="w-full" data-ocid="principal_interest_chart">
      <div className="mb-4 flex flex-wrap items-center gap-4 text-xs">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-full fin-loan bg-current" />
          Principal — {formatINR(principalInterest.totalPrincipal)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-full fin-interest bg-current" />
          Interest — {formatINR(principalInterest.totalInterest)}
        </span>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            barCategoryGap="20%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              dy={6}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              tickFormatter={(v: number) => `₹${Math.round(v / 1000)}k`}
              width={44}
            />
            <Tooltip
              formatter={(value: number | string, name: string) => [
                formatINR(Number(value)),
                name === "principal" ? "Principal" : "Interest",
              ]}
              labelFormatter={(label) => `Month ${label}`}
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "0.75rem",
                color: "var(--foreground)",
              }}
            />
            <Bar
              dataKey="principal"
              stackId="emi"
              fill="var(--fin-loan)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="interest"
              stackId="emi"
              fill="var(--fin-interest)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
