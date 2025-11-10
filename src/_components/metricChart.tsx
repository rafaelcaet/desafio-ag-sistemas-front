import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricChartProps {
  title: string;
  value: number | string;
  subtitle?: string;
}

export default function MetricChart({ title, value, subtitle }: MetricChartProps) {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-base font-semibold text-[#13679F]">
          {title}
        </CardTitle>
        {subtitle ? (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
      </CardHeader>
      <CardContent>
        <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          {value}
        </span>
      </CardContent>
    </Card>
  );
}