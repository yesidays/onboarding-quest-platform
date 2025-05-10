
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/LoginForm";

export default function Login() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-brand-purple/5 to-brand-light-purple/10 p-4">
      <div className="mb-8 text-center animate-fade-in">
        <div className="inline-flex items-center justify-center p-2 bg-brand-purple text-white rounded-lg mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M20 9V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2" />
            <rect width="20" height="12" x="2" y="9" rx="2" />
            <path d="M9.5 15v.1" />
            <path d="M14.5 15v.1" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold">OnboardMaster</h1>
        <p className="text-muted-foreground">
          Plataforma de onboarding gamificada para nuevos colaboradores
        </p>
      </div>
      <LoginForm />
      <p className="text-xs text-muted-foreground mt-8">
        Selecciona cualquier rol para iniciar sesión - Las credenciales no son validadas en esta versión de demo
      </p>
    </div>
  );
}
