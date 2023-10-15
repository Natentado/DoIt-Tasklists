interface AuthProviderProps {
    children: ReactNode
};

interface User {
    id: string,
    name: string,
    email: string,
};

interface AuthState {
    accessToken: string,
    user: User,
};

interface SignInCrendentials {
    email: string,
    password: string,
};

interface AuthContextData {
    user: User,
    accessToken: string,
    signIn: (credentials: SignInCrendentials) => Promise<void | { response: string }>,
    signOut: () => void,
};

interface TaskProviderProps {
    children: ReactNode;
};

interface Task{
    id: string,
    title: string,
    description: string,
    userId: string,
    completed: boolean,
};

interface TaskContextData {
    tasks: Task[],
    createTask: (data: Omit<Task, "id">, accesToken: string) => Promise<void>,
    loadTasks: (userId: string, accessToken: string) => Promise<void>,
    deleteTask: (taskId: string, accessToken: string) => Promise<void>;
    updateTask: (taskId: string, userId: string, accessToken: string) => Promise<void>;
    searchTask: (taskTitle: string, accessToken: string, userId: string) => Promise<void>;
    notFound: boolean;
    taskNotFound: string;
};