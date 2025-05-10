
import { CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Task } from "@/contexts/OnboardingContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TaskItemProps {
  task: Task;
  onComplete: (taskId: string) => void;
  className?: string;
}

export function TaskItem({ task, onComplete, className }: TaskItemProps) {
  const isCompleted = task.status === "completed";

  const handleComplete = () => {
    if (!isCompleted) {
      onComplete(task.id);
    }
  };

  return (
    <div
      className={cn(
        "task-item",
        isCompleted && "task-item-completed",
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 p-0 text-muted-foreground"
        onClick={handleComplete}
      >
        {isCompleted ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <Circle className="h-5 w-5" />
        )}
        <span className="sr-only">
          {isCompleted ? "Tarea completada" : "Marcar como completada"}
        </span>
      </Button>
      <div className="flex-1">
        <p className={cn("font-medium", isCompleted && "line-through text-muted-foreground")}>
          {task.title}
        </p>
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Badge variant={isCompleted ? "outline" : getPriorityVariant(task.priority)}>
          {getPriorityLabel(task.priority)}
        </Badge>
        <span className="text-xs text-muted-foreground">{task.points} pts</span>
      </div>
    </div>
  );
}

function getPriorityLabel(priority: string): string {
  switch (priority) {
    case "high":
      return "Alta";
    case "medium":
      return "Media";
    case "low":
      return "Baja";
    default:
      return priority;
  }
}

function getPriorityVariant(priority: string): "default" | "secondary" | "destructive" {
  switch (priority) {
    case "high":
      return "destructive";
    case "medium":
      return "default";
    case "low":
      return "secondary";
    default:
      return "default";
  }
}
