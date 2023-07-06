import { Button, Center, Flex, theme, useDisclosure } from "@chakra-ui/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";
import ModalCreateTask from "../Modal/ModalCreateTask";
import { Input } from "./Input";

interface SearchData {
    title: string;
};

const SearchBox = ({}) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { searchTask } = useTasks();
    const { accessToken } = useAuth();

    const handleSearch = ({title}: SearchData) => {
        searchTask(title, accessToken);
    };

    const { register, handleSubmit } = useForm();

    return (
        <>
            <ModalCreateTask isOpen={isOpen} onClose={onClose} />
            <Flex 
                w="100%" 
                mt="6" 
                px={["4", "8"]} 
                py="2" 
                paddingBottom="6" 
                borderBottomWidth="1px" 
                borderColor="gray.50" 
                flexDir={["column", "column", "row", "row"]}
            >
                <Flex as="form" gap="6px" onSubmit={handleSubmit(handleSearch as SubmitHandler<FieldValues>)}>
                    <Input placeholder="Pesquisar por tarefa" w={["100%", "100%", "35vw"]} {...register('title')} />
                    <Center as="button" borderRadius="8px" w="72px" h="60px" bg="purple.600" fontSize="2xl">
                        <FaSearch color={theme.colors.white} />
                    </Center>
                </Flex>
                <Button 
                    h="60px"
                    mt={["4", "4", 0]}
                    ml={[0, 0, "4"]} 
                    px="16" 
                    borderRadius="6px" 
                    bg="purple.500" 
                    color="white" 
                    _hover={{bg: "purple.600"}} 
                    onClick={onOpen}
                >
                    Adicionar nova tarefa
                </Button>
            </Flex>
        </>
    )  
};

export default SearchBox;