import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalTaskDetail from "../../components/Modal/ModalTaskDetail";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";
import FirstTask from "./FirstTask";
import NotFound from "./NotFound";
import TasksList from "./TasksList";

type Task = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
};

export const Dashboard = () => {

    const [ isLoading, setIsLoading ] = useState(true);
    const [ selectedTask, setSelectedTask ] = useState<Task>({} as Task);

    const { user, accessToken } = useAuth();
    const { tasks, loadTasks, notFound, taskNotFound } = useTasks();

    const { isOpen: isTaskDetailOpen, onOpen: onTaskDetailOpen, onClose: onTaskDetailClose } = useDisclosure();

    const handleClick = (task: Task) => {
        setSelectedTask(task);
        onTaskDetailOpen();
    };

    useEffect(() => {
        loadTasks(user.id, accessToken)
        .then((_) => setIsLoading(false));
    }, []);

    if(notFound){
        return (
            <NotFound 
                isTaskDetailOpen={isTaskDetailOpen} 
                onTaskDetailClose={onTaskDetailClose} 
                selectedTask={selectedTask} 
                taskNotFound={taskNotFound} 
            />
        );
    };

    return (
        <>
            <ModalTaskDetail isOpen={isTaskDetailOpen} onClose={onTaskDetailClose} task={selectedTask} />
            {(!isLoading && !tasks.length) ?
                <FirstTask />
            :
                <TasksList handleClick={handleClick} isLoading={isLoading} tasks={tasks} />
            } 
        </>
    );
};