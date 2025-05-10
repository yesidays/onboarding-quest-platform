
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Achievement } from "@/contexts/OnboardingContext";

interface AchievementCardProps {
  achievement: Achievement;
  className?: string;
}

export function AchievementCard({ achievement, className }: AchievementCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-md",
      achievement.unlocked ? "border-brand-purple" : "",
      className
    )}>
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle className="text-lg">{achievement.title}</CardTitle>
          <CardDescription>{achievement.description}</CardDescription>
        </div>
        <div className="text-4xl">
          {achievement.imageUrl || "🏆"}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between items-center">
          <Badge variant={achievement.unlocked ? "default" : "outline"} className="mt-2">
            {achievement.points} puntos
          </Badge>
          <span className={cn(
            "text-sm font-medium",
            achievement.unlocked 
              ? "text-brand-purple animate-celebrate" 
              : "text-muted-foreground"
          )}>
            {achievement.unlocked ? "¡Desbloqueado!" : "Bloqueado"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
