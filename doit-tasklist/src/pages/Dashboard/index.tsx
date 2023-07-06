import { Box, Center, Grid, Heading, Skeleton, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import SearchBox from "../../components/Form/SearchBox";
import { Header } from "../../components/Header";
import ModalTaskDetail from "../../components/Modal/ModalTaskDetail";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";

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
            <>
                <ModalTaskDetail isOpen={isTaskDetailOpen} onClose={onTaskDetailClose} task={selectedTask} />
                <Box>
                    <Header />
                    <SearchBox />
                    <Center display="flex" flexDir="column" mt="4" textAlign="center">
                        <Heading size="lg">Não encotramos resultados para:</Heading>
                        <Text color="gray.300" fontSize="xl" fontWeight="bold">{taskNotFound}</Text>
                        <Box w={["80%", "40%"]} mt="6" p="6" boxShadow="base" bg="white">
                            <Stack>
                                <Skeleton startColor="gray.100" endColor="gray.200" w="75%" h="20px" borderRadius="24px" />
                                <Skeleton startColor="gray.100" endColor="gray.200" w="50%" h="20px" borderRadius="24px" />
                            </Stack>
                            <Stack mt="8">
                                <Skeleton startColor="gray.100" endColor="gray.200" h="18px" borderRadius="24px" />
                                <Skeleton startColor="gray.100" endColor="gray.200" h="18px" borderRadius="24px" />
                            </Stack>
                        </Box>
                    </Center>
                </Box>
            </>
        );
    };

    return (
        <>
            <ModalTaskDetail isOpen={isTaskDetailOpen} onClose={onTaskDetailClose} task={selectedTask} />
            <Box>
                <Header />
                <SearchBox />
                <Grid w="100%" templateColumns="repeat(auto-fill, minmax(420px, 1fr))" gap={10} mt="8" px="8">
                    {tasks.map((task, i) => <Card onClick={handleClick} task={task} key={i} />)}
                </Grid>
            </Box>
        </>
    )
};