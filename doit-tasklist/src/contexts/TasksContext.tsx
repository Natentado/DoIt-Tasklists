import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../services/api";

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
    searchTask: (taskTitle: string, accessToken: string) => Promise<void>;
    notFound: boolean;
    taskNotFound: string;
};

const TaskContext = createContext<TaskContextData>({} as TaskContextData);

const useTasks = () => {
    const context = useContext(TaskContext);

    if(!context){
        throw new Error("useTasks must be used within a TaskProvider")
    };

    return context;
};

const TaskProvider = ({children}: TaskProviderProps) => {
    const [ tasks, setTasks ] = useState<Task[]>([]);
    const [ notFound, setNotFound ] = useState(false);
    const [ taskNotFound, setTaskNotFound ] = useState("");

    const loadTasks = useCallback(async (userId: string, accessToken: string) => {
        try {
            const response = await api.get(`/tasks?userId=${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }})

            setTasks(response.data)
        } catch(err: any) {
            console.error("ERROR, " + err)

            if(err.response.data === "jwt expired"){
                localStorage.removeItem("@Doit:accessToken");
                localStorage.removeItem("@Doit:user");
                return window.location.replace("http://localhost:3000/")
            };
        }
    }, [tasks]);

    const createTask = useCallback(async (data: Omit<Task, "id">, accessToken: string) => {
        const res = await api.post("/tasks", data, { 
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }});

        if(res.status > 299){
            return console.error("Erro mano || Erro API")
        };

        setTasks(prevState => [...tasks, res.data, ]);
    }, [tasks]);

    const deleteTask = useCallback(async (taskId: string, accessToken: string) => {
        await api.delete(`/tasks/${taskId}`,{
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }}).then(_ => {
            const  filteredTasks = tasks.filter(task => task.id !== taskId);
            return setTasks(filteredTasks);
        }).catch(err => console.error("Erro, " + err));
    }, [tasks]);

    const updateTask = useCallback(async (taskId: string, userId: string, accessToken: string) => {
        await api.patch(`/tasks/${taskId}`, {completed: true, userId}, {headers: {
            Authorization: `Bearer ${accessToken}`,
        }}).then(res => {
            const filteredTasks = tasks.filter(task => task.id !== taskId);
            const task = tasks.find(task => task.id === taskId);

            if(task){
                task.completed = true;
                setTasks([...filteredTasks, task]);
            }
        }).catch(err => console.error("Erro, " + err));
    }, [tasks]);

    const searchTask = useCallback(async (taskTitle: string, accessToken: string) => {
        const res = await api.get(`/tasks?title_like=${taskTitle}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }});

        if(!res.data.length){
            setTaskNotFound(taskTitle);
            return setNotFound(true);
        };

        setNotFound(false);
        setTasks(res.data);
    }, []);

    return (
        <TaskContext.Provider 
            value={{ 
                createTask, 
                tasks, 
                loadTasks, 
                deleteTask, 
                updateTask, 
                searchTask, 
                notFound, 
                taskNotFound
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export { TaskProvider, useTasks };