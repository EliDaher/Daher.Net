import { Loader2, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getStoredUser } from "@/lib/auth";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  onClick?: () => void;
  onlyAdmin?: boolean;
  loading?: boolean;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  onClick,
  onlyAdmin,
  loading = false,
}: StatsCardProps) {
  const currentUser = getStoredUser();

  if (onlyAdmin && currentUser?.role !== "admin") {
    return null;
  }

  return (
    <Card
      onClick={onClick}
      className={cn(
        "stat-card transition-colors",
        onClick && "cursor-pointer hover:border-primary/40 hover:bg-accent/5",
        loading && "pointer-events-none opacity-70",
        className,
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        ) : (
          <Icon className="h-5 w-5 text-muted-foreground" />
        )}
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="space-y-2 animate-pulse">
            <div className="h-7 w-24 rounded bg-muted" />
            <div className="h-3 w-32 rounded bg-muted" />
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            {(description || trend) && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {trend && (
                  <span
                    className={cn(
                      "inline-flex items-center font-medium",
                      trend.isPositive ? "text-emerald-600" : "text-destructive",
                    )}
                  >
                    {trend.isPositive ? "+" : ""}
                    {trend.value}
                  </span>
                )}
                {description && <span>{description}</span>}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
