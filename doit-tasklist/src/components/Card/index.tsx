import { Box, Center, Flex, Heading, HStack, Progress, Text, theme } from "@chakra-ui/react"
import { FaCheck, FaTrash } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";

interface Task {
    id: string,
    title: string,
    description: string,
    completed: boolean,
}

interface CardProps {
    task: Task;
    onClick: (task: Task) => void;
};

const Card = ({ task, onClick }: CardProps) => {
    const { deleteTask, updateTask } = useTasks();
    const { accessToken, user } = useAuth();

    return (
        <Box 
            cursor="pointer"
            w={["330px", "auto"]}
            p="7"
            borderWidth="1px" 
            borderColor="gray.50" 
            boxShadow="base"
            transition="border 0.2s, ease 0s, transform 0.2s" 
            _hover={{transform: "translateY(-6px)", borderColor: "gray.100"}} 
        >
            <Flex title={task.title} justify="space-between" gap="18px">
                <Heading as="h1" size="md">
                    {task.title}
                </Heading>
                <HStack spacing="4" alignItems="flex-start">
                    <Center 
                        as="button" 
                        w="30px" 
                        h="30px" 
                        borderWidth="1px" 
                        borderRadius="5px" 
                        borderColor="gray.200" 
                        bg="white"
                        _hover={{
                            borderColor: "red.700"
                        }}
                        sx={{
                            '&:hover .trashIcon': {
                              fill: "red.600",
                            },
                          }}
                        onClick={() => deleteTask(task.id, accessToken)}
                    >
                    <FaTrash color={theme.colors.gray[400]} className="trashIcon" />
                    </Center>
                    <Center 
                        as="button" 
                        w="30px" 
                        h="30px" 
                        borderWidth="1px" 
                        borderRadius="5px" 
                        borderColor="gray.200" 
                        bg={task.completed ?
                            "purple.600"
                        :
                            "white"
                        }
                        _hover={!task.completed ?
                            {
                                borderColor: "green.600"
                            }
                        : {}
                        }
                        sx={!task.completed ? 
                            {
                                '&:hover .checkIcon': {
                                    fill: "green.500",
                                },
                            } 
                        : {}}
                        onClick={() => updateTask(task.id, user.id, accessToken)}
                    >
                        <FaCheck color={task.completed ? 
                            theme.colors.white
                        :
                            theme.colors.gray[400]} className='checkIcon' />
                    </Center>
                </HStack>
            </Flex>
            <Box w="100%" mt="4" onClick={() => onClick(task)}>
                <Text>
                    {task.description}
                </Text>
                <Progress colorScheme="purple" mt="2.5" value={task.completed ? 100 : 10}>
                    <Text color="gray.200" mt="3">
                        07 march 2021
                    </Text>
                </Progress>
            </Box>
        </Box>
    )
};

export default Card;