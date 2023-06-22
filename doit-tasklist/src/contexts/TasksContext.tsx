import { AxiosResponse } from "axios";
import { createContext, ReactNode, useCallback, useContext, useState } from "react";
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
}

interface TaskContextData {
    tasks: Task[],
    createTask: (data: Omit<Task, "id">, accesToken: string) => Promise<void>,
    loadTasks: (userId: string, accessToken: string) => Promise<void>,
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

    const loadTasks = useCallback(async (userId: string, accessToken: string) => {
        try {
            const response = await api.get(`/tasks?userId=${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }})

            setTasks(response.data)
        } catch(err) {
            console.error("Erro, " + err)
        }
    }, []);

    const createTask = useCallback(async (data: Omit<Task, "id">, accessToken: string) => {
        const res = await api.post("/tasks", data, { headers: {
            Authorization: `Bearer ${accessToken}`,
        }});

        if(res.status > 299){
            return console.error("Erro mano || Erro API")
        };

        console.log("VE ESSA MERDA PRA VALIDAR OS ERROS", res)

        setTasks(prevState => [...tasks, res.data]);
    }, []);

    return (
        <TaskContext.Provider value={{ createTask, tasks, loadTasks}}>
            {children}
        </TaskContext.Provider>
    );
};

export { TaskProvider, useTasks };