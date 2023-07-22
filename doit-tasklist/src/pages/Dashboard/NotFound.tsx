import { Center, Heading, Stack, Skeleton, Box, Text } from "@chakra-ui/react";
import SearchBox from "../../components/Form/SearchBox";
import { Header } from "../../components/Header";
import ModalTaskDetail from "../../components/Modal/ModalTaskDetail";

type Task = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
};

interface NotFoundProps {
    isTaskDetailOpen: boolean;
    onTaskDetailClose: () => void;
    selectedTask: Task;
    taskNotFound: string;
};

const NotFound = ({isTaskDetailOpen, onTaskDetailClose, selectedTask, taskNotFound}: NotFoundProps) => {
    
    return (
        <>
            <ModalTaskDetail isOpen={isTaskDetailOpen} onClose={onTaskDetailClose} task={selectedTask} />
            <Box>
                <Header />
                <SearchBox />
                <Center 
                    display="flex" 
                    flexDir="column" 
                    gap="18px"
                    mr={["18px", "18px", 0, 0]}
                    ml={["18px", "18px", 0, 0]} 
                    mt="12" 
                    textAlign="center"
                >
                    <Heading size="lg">Não encotramos resultados para:</Heading>
                    <Text color="gray.300" fontSize="xl" fontWeight="bold">{taskNotFound}</Text>
                    <Box w={["100%", "100%", "80%", "40%"]} p="6" boxShadow="base" bg="white">
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

export default NotFound;