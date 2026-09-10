import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import type { Report, ReportType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Download, FileText } from "lucide-react";

interface ReportCardProps {
  report: Report;
  onOpen?: (report: Report) => void;
  onDownload?: (report: Report) => void;
  className?: string;
}

const typeLabels: Record<ReportType, string> = {
  analysis: "Analysis",
  finance: "Finance",
  market: "Market",
  scheme: "Schemes",
  "what-if": "What-if",
};

export function ReportCard({
  report,
  onOpen,
  onDownload,
  className,
}: ReportCardProps) {
  return (
    <Card
      className={cn(
        "flex items-center gap-4 p-4 transition-smooth hover:shadow-elevated",
        className,
      )}
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground">
        <FileText className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-display text-sm font-semibold tracking-tight">
          {report.title}
        </h3>
        <p className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-muted px-2 py-0.5 font-medium">
            {typeLabels[report.type]}
          </span>
          <span className="truncate">{report.summary}</span>
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        {onDownload ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onDownload(report)}
            aria-label={`Download ${report.title}`}
            data-ocid="report_download_button"
          >
            <Download className="size-4" />
          </Button>
        ) : null}
        {onOpen ? (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => onOpen(report)}
            data-ocid="report_open_button"
          >
            Open
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
