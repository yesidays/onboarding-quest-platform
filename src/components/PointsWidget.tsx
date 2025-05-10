
import { CircleUser } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PointsWidgetProps {
  earnedPoints: number;
  totalPoints: number;
  className?: string;
}

export function PointsWidget({ earnedPoints, totalPoints, className }: PointsWidgetProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Puntos de misión</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <CircleUser className="h-5 w-5 mr-2 text-brand-purple" />
          <span className="text-2xl font-bold">{earnedPoints}</span>
          <span className="text-muted-foreground text-sm ml-1">/ {totalPoints}</span>
        </div>
      </CardContent>
    </Card>
  );
}
