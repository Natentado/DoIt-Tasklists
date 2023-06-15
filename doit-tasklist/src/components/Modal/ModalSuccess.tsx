import { Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, theme } from "@chakra-ui/react";
import { FaExclamation } from "react-icons/fa";
import { useHistory } from "react-router-dom";

interface ModalSuccessProps {
  isOpen: boolean;
  onClose: () => void;
};

const ModalSuccess = ({ isOpen, onClose }: ModalSuccessProps) => {

  const history = useHistory();
    
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display="flex">
            <Center w="30px" h="30px" borderRadius="6px" bg="purple.500">
              <FaExclamation color={theme.colors.white} />
            </Center>
            <Text ml="12px">Yeess...</Text>
        </ModalHeader>
        <ModalCloseButton bg="red.500" color="white" _hover={{bg: "red.600"}} />

        <ModalBody textAlign="center">
          <Text>Seu cadastro deu super certo, <b>vamos lá</b></Text>
        </ModalBody>

        <ModalFooter display="table-column">
          <Button w="100%" h="48px" bg="purple.500" color="white" _hover={{bg: "purple.600"}} onClick={() => history.push("/")}>
            Ir para o login agora
          </Button>
          <Text mt="18px" align="center">Você já pode começar criando <b>suas listas</b> de tarefas agora mesmo...</Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};

export default ModalSuccess;