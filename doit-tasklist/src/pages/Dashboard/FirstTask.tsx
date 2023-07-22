import { Center, Heading, Button, Box, Text, useDisclosure } from "@chakra-ui/react";
import { FaClipboard } from "react-icons/fa";
import { Header } from "../../components/Header";
import ModalCreateTask from "../../components/Modal/ModalCreateTask";

const FirstTask = () => {

    const { isOpen: isCreateTaskOpen, onOpen: onCreateTaskOpen, onClose: onCreateTaskClose } = useDisclosure();

    return (
        <>
            <ModalCreateTask isOpen={isCreateTaskOpen} onClose={onCreateTaskClose} />
            <Header />
            <Box 
                justifyContent="center" 
                w="90vw"
                mt="12" 
                ml={["auto", "auto", "5vh", "5vh"]}
                mr={["auto", "auto", "unset", "unset"]}
                py="16"
                px={["6", "0"]}
                borderWidth="2px" 
                borderColor="gray.200" 
                borderStyle="dashed"
                textAlign="center" 
            >
                <Center fontSize="5xl">
                    <FaClipboard color="#bdbdbd" />
                </Center>
                <Heading as="h1" fontSize={["2xl", "2xl" , "4xl", "4xl"]} mt="4">
                    Vamos criar sua primeira tarefa
                </Heading>
                <Text color="gray.400" mt="6">
                    Insira sua meta e mostre a você mesmo <br /> 
                    sua capacidade em cumprir <Text display="inline" fontWeight="bold" color="gray.900">suas atividades</Text>.
                </Text>

                <Button 
                    mt="6" 
                    p="6" 
                    bg="purple.700" 
                    color="white" 
                    _hover={{bg: "purple.800"}} 
                    onClick={onCreateTaskOpen}
                >
                    Criar sua primeira tarefa
                </Button>
            </Box>
        </>
    );
};

export default FirstTask;