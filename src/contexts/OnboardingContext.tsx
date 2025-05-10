
import { createContext, useContext, useReducer, ReactNode } from 'react';

export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  assignedTo?: string;
  category: string;
  points: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  points: number;
  unlocked: boolean;
}

export interface OnboardingTemplate {
  id: string;
  name: string;
  description: string;
  duration: number; // in days
  roleType: string;
  tasks: Task[];
}

export interface Manager {
  id: string;
  name: string;
  position: string;
  department: string;
  bio: string;
  welcomeMessage: string;
  avatarUrl?: string;
}

interface OnboardingState {
  tasks: Task[];
  achievements: Achievement[];
  templates: OnboardingTemplate[];
  selectedTemplate: OnboardingTemplate | null;
  managers: Manager[];
  assignedManager: Manager | null;
  progress: number;
  totalPoints: number;
  earnedPoints: number;
}

type OnboardingAction =
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: string }
  | { type: 'SET_TEMPLATE'; payload: OnboardingTemplate }
  | { type: 'SET_MANAGER'; payload: Manager }
  | { type: 'SET_PROGRESS'; payload: number }
  | { type: 'COMPLETE_TASK'; payload: string };

const initialState: OnboardingState = {
  tasks: [
    {
      id: '1',
      title: 'Completar perfil de usuario',
      description: 'Sube una foto de perfil y completa tu información personal',
      status: 'pending',
      priority: 'high',
      category: 'Setup',
      points: 10,
    },
    {
      id: '2',
      title: 'Revisar políticas de la empresa',
      description: 'Revisa y firma las políticas y procedimientos de la compañía',
      status: 'pending',
      priority: 'high',
      category: 'Administrativo',
      points: 15,
    },
    {
      id: '3',
      title: 'Configurar correo electrónico',
      description: 'Accede a tu correo electrónico corporativo y configura tu firma',
      status: 'pending',
      priority: 'high',
      category: 'IT',
      points: 10,
    },
    {
      id: '4',
      title: 'Unirse a canales de Slack',
      description: 'Únete a los canales de comunicación principales de tu equipo',
      status: 'pending',
      priority: 'medium',
      category: 'Comunicación',
      points: 5,
    },
    {
      id: '5',
      title: 'Reunión con equipo de trabajo',
      description: 'Conoce a tus compañeros de equipo en una reunión de bienvenida',
      status: 'pending',
      priority: 'medium',
      category: 'Equipo',
      points: 20,
    },
    {
      id: '6',
      title: 'Acceso a herramientas de proyecto',
      description: 'Solicita acceso a Jira, Confluence y otras herramientas de proyecto',
      status: 'pending',
      priority: 'medium',
      category: 'IT',
      points: 10,
    },
  ],
  achievements: [
    {
      id: 'a1',
      title: 'Primer día completado',
      description: 'Sobreviviste a tu primer día en la empresa',
      imageUrl: '🏆',
      points: 50,
      unlocked: false,
    },
    {
      id: 'a2',
      title: 'Experto en herramientas',
      description: 'Configuraste todas tus herramientas de trabajo',
      imageUrl: '🛠️',
      points: 75,
      unlocked: false,
    },
    {
      id: 'a3',
      title: 'Integración social',
      description: 'Te presentaste con todos los miembros de tu equipo',
      imageUrl: '🤝',
      points: 100,
      unlocked: false,
    },
  ],
  templates: [
    {
      id: 't1',
      name: 'Desarrollador Frontend',
      description: 'Onboarding para desarrolladores frontend',
      duration: 30,
      roleType: 'Developer',
      tasks: [],
    },
    {
      id: 't2',
      name: 'Product Manager',
      description: 'Onboarding para product managers',
      duration: 45,
      roleType: 'PM',
      tasks: [],
    },
  ],
  selectedTemplate: null,
  managers: [
    {
      id: 'm1',
      name: 'Carlos Sánchez',
      position: 'Tech Lead',
      department: 'Engineering',
      bio: 'Carlos tiene más de 10 años de experiencia en desarrollo web y ha liderado equipos técnicos en varias startups exitosas.',
      welcomeMessage: '¡Bienvenido/a al equipo! Estoy muy emocionado/a de tenerte con nosotros. Mi objetivo es ayudarte a integrarte rápidamente y comenzar a contribuir de manera significativa. No dudes en acercarte si tienes cualquier duda o necesitas apoyo.',
      avatarUrl: 'https://i.pravatar.cc/150?u=carlos',
    }
  ],
  assignedManager: {
    id: 'm1',
    name: 'Carlos Sánchez',
    position: 'Tech Lead',
    department: 'Engineering',
    bio: 'Carlos tiene más de 10 años de experiencia en desarrollo web y ha liderado equipos técnicos en varias startups exitosas.',
    welcomeMessage: '¡Bienvenido/a al equipo! Estoy muy emocionado/a de tenerte con nosotros. Mi objetivo es ayudarte a integrarte rápidamente y comenzar a contribuir de manera significativa. No dudes en acercarte si tienes cualquier duda o necesitas apoyo.',
    avatarUrl: 'https://i.pravatar.cc/150?u=carlos',
  },
  progress: 0,
  totalPoints: 0,
  earnedPoints: 0,
};

// Calculate initial points
initialState.totalPoints = initialState.tasks.reduce((sum, task) => sum + task.points, 0);

function onboardingReducer(state: OnboardingState, action: OnboardingAction): OnboardingState {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'COMPLETE_TASK': {
      const newTasks = state.tasks.map(task => 
        task.id === action.payload 
          ? { ...task, status: 'completed' as TaskStatus } 
          : task
      );
      
      // Calculate earned points
      const completedTask = state.tasks.find(t => t.id === action.payload);
      const newEarnedPoints = state.earnedPoints + (completedTask?.points || 0);
      
      // Calculate progress
      const completedCount = newTasks.filter(t => t.status === 'completed').length;
      const newProgress = (completedCount / newTasks.length) * 100;
      
      return {
        ...state,
        tasks: newTasks,
        earnedPoints: newEarnedPoints,
        progress: newProgress,
      };
    }
    case 'UNLOCK_ACHIEVEMENT':
      return {
        ...state,
        achievements: state.achievements.map(achievement => 
          achievement.id === action.payload 
            ? { ...achievement, unlocked: true } 
            : achievement
        ),
      };
    case 'SET_TEMPLATE':
      return { ...state, selectedTemplate: action.payload };
    case 'SET_MANAGER':
      return { ...state, assignedManager: action.payload };
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload };
    default:
      return state;
  }
}

interface OnboardingContextType {
  state: OnboardingState;
  dispatch: React.Dispatch<OnboardingAction>;
  completeTask: (taskId: string) => void;
  unlockAchievement: (achievementId: string) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  const completeTask = (taskId: string) => {
    dispatch({ type: 'COMPLETE_TASK', payload: taskId });
    
    // Check for achievements that could be unlocked
    if (state.tasks.filter(t => t.status === 'completed').length + 1 === state.tasks.length) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: 'a1' });
    }
    
    // IT tasks completed
    const itTasks = state.tasks.filter(t => t.category === 'IT');
    const completedItTasks = itTasks.filter(t => t.status === 'completed' || t.id === taskId);
    if (itTasks.length === completedItTasks.length) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: 'a2' });
    }
    
    // Team tasks completed
    const teamTasks = state.tasks.filter(t => t.category === 'Equipo');
    const completedTeamTasks = teamTasks.filter(t => t.status === 'completed' || t.id === taskId);
    if (teamTasks.length === completedTeamTasks.length) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: 'a3' });
    }
  };

  const unlockAchievement = (achievementId: string) => {
    dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: achievementId });
  };

  return (
    <OnboardingContext.Provider value={{ state, dispatch, completeTask, unlockAchievement }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
