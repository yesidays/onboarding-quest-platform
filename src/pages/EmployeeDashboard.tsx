
import { useOnboarding } from "@/contexts/OnboardingContext";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ProgressBar } from "@/components/ProgressBar";
import { TaskItem } from "@/components/TaskItem";
import { AchievementCard } from "@/components/AchievementCard";
import { ManagerCard } from "@/components/ManagerCard";
import { PointsWidget } from "@/components/PointsWidget";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Award, Briefcase, CheckCircle } from "lucide-react";
import { useEffect } from "react";

export default function EmployeeDashboard() {
  const { state, completeTask } = useOnboarding();
  const { tasks, achievements, progress, assignedManager, earnedPoints, totalPoints } = state;

  // Group tasks by category
  const tasksByCategory = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, typeof tasks>);

  const handleCompleteTask = (taskId: string) => {
    completeTask(taskId);
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      toast({
        title: "¡Tarea completada!",
        description: `Has completado "${task.title}" y ganado ${task.points} puntos.`,
      });
    }
    
    // Check if unlocked achievements
    const unlockedAchievements = achievements.filter(a => a.unlocked);
    const previouslyUnlockedCount = unlockedAchievements.length;
    
    // We'll check in 500ms to allow the state to update
    setTimeout(() => {
      const newUnlockedAchievements = state.achievements.filter(a => a.unlocked);
      
      if (newUnlockedAchievements.length > previouslyUnlockedCount) {
        const newAchievement = newUnlockedAchievements[newUnlockedAchievements.length - 1];
        toast({
          title: "¡Logro desbloqueado!",
          description: `Has desbloqueado "${newAchievement.title}" y ganado ${newAchievement.points} puntos adicionales.`,
          variant: "default",
        });
      }
    }, 500);
  };
  
  useEffect(() => {
    // Display welcome toast on first load
    toast({
      title: "¡Bienvenido a tu onboarding!",
      description: "Completa las tareas para avanzar en tu proceso de integración.",
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardHeader />
      
      <main className="flex-1">
        <div className="container p-4 md:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="space-y-2 mb-6">
                <h1 className="text-2xl font-bold">Tu onboarding</h1>
                <div className="flex items-center gap-2">
                  <ProgressBar value={progress} className="flex-1" />
                  <PointsWidget
                    earnedPoints={earnedPoints}
                    totalPoints={totalPoints}
                    className="hidden sm:block w-[140px]"
                  />
                </div>
              </div>
              
              <Tabs defaultValue="tasks" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="tasks" className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Tareas</span>
                  </TabsTrigger>
                  <TabsTrigger value="achievements" className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    <span>Logros</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="tasks" className="space-y-6">
                  {Object.entries(tasksByCategory).map(([category, categoryTasks]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-lg font-medium">{category}</h3>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {categoryTasks.map((task) => (
                          <TaskItem
                            key={task.id}
                            task={task}
                            onComplete={handleCompleteTask}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="achievements" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Logros disponibles</h3>
                    <Badge variant="outline">
                      {achievements.filter(a => a.unlocked).length}/{achievements.length} desbloqueados
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {achievements.map((achievement) => (
                      <AchievementCard key={achievement.id} achievement={achievement} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-4">Tu manager asignado</h2>
              {assignedManager ? (
                <ManagerCard manager={assignedManager} />
              ) : (
                <p className="text-muted-foreground">No hay manager asignado todavía.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
