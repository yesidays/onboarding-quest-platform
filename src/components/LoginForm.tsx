
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        login(email, password);
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido/a a la plataforma de onboarding",
        });
      } catch (error) {
        toast({
          title: "Error de inicio de sesión",
          description: "Verifica tus credenciales e intenta nuevamente",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para acceder a la plataforma de onboarding
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Tu rol y accesos han sido previamente configurados por el equipo de Recursos Humanos.
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-brand-purple to-brand-dark-purple" 
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Iniciar Sesión"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
