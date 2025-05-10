
import { DashboardHeader } from "@/components/DashboardHeader";

export default function HRDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardHeader />
      
      <main className="flex-1">
        <div className="container p-4 md:p-6 space-y-6">
          <h1 className="text-2xl font-bold">Panel de Recursos Humanos</h1>
          <p className="text-muted-foreground">
            En futuras versiones, podrás configurar y monitorear el proceso de onboarding desde este panel.
          </p>
        </div>
      </main>
    </div>
  );
}
