
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Manager } from "@/contexts/OnboardingContext";

interface ManagerCardProps {
  manager: Manager;
  className?: string;
}

export function ManagerCard({ manager, className }: ManagerCardProps) {
  const initials = manager.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-brand-purple">
            <AvatarImage src={manager.avatarUrl} alt={manager.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{manager.name}</CardTitle>
            <CardDescription>{manager.position} - {manager.department}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-4">
        <div>
          <h4 className="font-medium text-sm mb-1">Sobre mí</h4>
          <p className="text-sm text-muted-foreground">{manager.bio}</p>
        </div>
        <div>
          <h4 className="font-medium text-sm mb-1">Mensaje de bienvenida</h4>
          <div className="bg-muted p-3 rounded-md text-sm italic">
            "{manager.welcomeMessage}"
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
