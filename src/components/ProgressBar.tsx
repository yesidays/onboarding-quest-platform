
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({ value, showLabel = true, className = "" }: ProgressBarProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Progress value={value} className="h-2" />
      {showLabel && (
        <p className="text-xs text-muted-foreground text-right">
          {Math.round(value)}% completado
        </p>
      )}
    </div>
  );
}
