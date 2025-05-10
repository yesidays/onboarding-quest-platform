
import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'hr' | 'manager' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // This is a mock login function that simulates the role assignment based on email
    // In a real implementation, this would fetch the user's role from the backend
    
    // For demo purposes, we'll determine the role based on the email domain
    let role: UserRole = 'employee'; // Default role
    
    if (email.includes('hr') || email.includes('rrhh')) {
      role = 'hr';
    } else if (email.includes('manager') || email.includes('lead')) {
      role = 'manager';
    }
    
    const mockUser = {
      id: '123',
      name: role === 'hr' ? 'Ana Rodríguez' : 
            role === 'manager' ? 'Carlos Sánchez' : 'María López',
      email,
      role,
      avatarUrl: `https://i.pravatar.cc/150?u=${email}`,
    };
    
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
