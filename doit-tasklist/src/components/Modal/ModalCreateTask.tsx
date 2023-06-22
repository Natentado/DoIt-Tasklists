import { Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, theme, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaClipboard } from "react-icons/fa";
import { Input } from "../Form/Input";
import * as yup from "yup";
import { TextArea } from "../Form/TextArea";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";

interface ModalCreateTaskProps {
  isOpen: boolean;
  onClose: () => void;
};

interface TaskData {
  title: string;
  description: string
};

const createTaskSchema = yup.object().shape({
  title: yup.string().required("Campo obrigatório"),
  description: yup.string().required("Campo obrigatório").max(100, "Máximo de 100 caracteres")
});

const ModalCreateTask = ({ isOpen, onClose }: ModalCreateTaskProps) => {

  const { formState: {errors}, register, handleSubmit } = useForm({
    resolver: yupResolver(createTaskSchema)
  });

  const { user, accessToken } = useAuth();

  const { createTask } = useTasks();
  
  const handleCreateTask = (data: TaskData) => {
    const newData = {...data, userId: user.id, completed: false};

    createTask(newData, accessToken).then((_) => onClose());
  };
    
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(handleCreateTask as SubmitHandler<FieldValues>)} padding="2" bg="white" color="gray.800">
        <ModalHeader display="flex">
            <Center w="30px" h="30px" borderRadius="6px" bg="purple.500">
              <FaClipboard color={theme.colors.white} />
            </Center>
            <Text fontWeight="bold" ml="12px">Adicionar</Text>
        </ModalHeader>
        <ModalCloseButton bg="red.500" color="white" _hover={{bg: "red.600"}} />

        <ModalBody textAlign="center">
            <VStack spacing="5" mt="4">
                <Input label="Título" error={errors.title as {type: string}} {...register("title")} placeholder="Digite o título" />
            </VStack>
            <VStack spacing="5">
                <TextArea label="Descrição" error={errors.description as {type: string}} {...register("description")} placeholder="Digite sua descrição" />
            </VStack>
        </ModalBody>

        <ModalFooter display="table-column">
          <Button w="100%" h="48px" bg="purple.500" color="white" _hover={{bg: "purple.600"}} type="submit">
            Adicionar tarefa
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};

export default ModalCreateTask;