import type { RepaymentRow } from "@/lib/types";
import { cn } from "@/lib/utils";

interface RepaymentScheduleTableProps {
  schedule: RepaymentRow[];
  className?: string;
}

function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Repayment schedule table showing month, opening balance, principal,
 * interest, EMI, and closing balance for each repayment period.
 */
export function RepaymentScheduleTable({
  schedule,
  className,
}: RepaymentScheduleTableProps) {
  return (
    <div
      className={cn(
        "overflow-x-auto rounded-2xl border border-border",
        className,
      )}
      data-ocid="repayment_schedule_table"
    >
      <table className="repay-table min-w-full">
        <thead>
          <tr>
            <th>Month</th>
            <th className="text-right">Opening</th>
            <th className="text-right">Principal</th>
            <th className="text-right">Interest</th>
            <th className="text-right">EMI</th>
            <th className="text-right">Closing</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((row) => (
            <tr
              key={`repay-row-${row.month}`}
              data-ocid={`repay_row.${row.month}`}
            >
              <td className="font-medium text-foreground">{row.month}</td>
              <td className="num text-muted-foreground">
                {formatINR(row.openingBalance)}
              </td>
              <td className="num fin-loan">{formatINR(row.principal)}</td>
              <td className="num fin-interest">{formatINR(row.interest)}</td>
              <td className="num font-semibold text-foreground">
                {formatINR(row.emi)}
              </td>
              <td className="num text-muted-foreground">
                {formatINR(row.closingBalance)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
