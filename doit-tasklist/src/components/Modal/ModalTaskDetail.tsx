import { Box, Center, Flex, Heading, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Text, theme } from "@chakra-ui/react";
import { FaCheck, FaCube, FaExclamation, FaTimes, FaTrash } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";

type Task = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
};

interface ModalTaskDetailProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
};

const ModalTaskDetail = ({ isOpen, onClose, task }: ModalTaskDetailProps) => {

  const { accessToken, user } = useAuth();
  const { deleteTask, updateTask } = useTasks();

  const handleDelete = () => {
    deleteTask(task.id, accessToken);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mr={["18px", "18px", "unset", "unset"]} ml={["18px", "18px", "unset", "unset"]}>
        <ModalHeader display="flex" justifyContent="space-between">
            <Flex>
                <Center w="30px" h="30px" borderRadius="6px" bg="purple.500">
                    <FaCube color={theme.colors.white} />
                </Center>
                <Text ml="12px">Visualizar</Text>
            </Flex>
            <HStack spacing="2">
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
                    onClick={handleDelete}
                >
                    <FaTrash color={theme.colors.gray[400]} className="trashIcon" />
                </Center>
                <Center 
                    as="button" 
                    w="30px" 
                    h="30px" 
                    borderWidth="1px" 
                    borderRadius="5px" 
                    borderColor={!task.completed ? "gray.200" : "transparent"} 
                    bg={!task.completed ? "white" : "purple.600"}
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
                    : {}
                    }
                    onClick={() => updateTask(task.id, user.id, accessToken)}
                >
                    <FaCheck color={!task.completed ? theme.colors.gray[400] : theme.colors.white} className='checkIcon' />
                </Center>
                <Center 
                    as="button" 
                    w="30px" 
                    h="30px" 
                    borderWidth="1px" 
                    borderRadius="5px" 
                    borderColor="gray.200" 
                    bg="red.500"
                    _hover={{bg: "red.600"}}
                    onClick={() => onClose()}
                >
                    <FaTimes color={theme.colors.white} className='checkIcon' />
                </Center>
            </HStack>
        </ModalHeader>

        <ModalBody>
            <Heading as="h1" fontSize="2xl">
                {task.title}
            </Heading>
            <Text color="gray.400">{task.description}</Text>     
        </ModalBody>

        <Box p="6">
            <Progress colorScheme="purple" value={task.completed ? 100 : 10} />
            <Text color="gray.200" mt="3">
                07 march 2021
            </Text>
        </Box>
      </ModalContent>
    </Modal>
  )
};

export default ModalTaskDetail;