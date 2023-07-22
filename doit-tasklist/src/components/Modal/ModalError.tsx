import { Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, theme } from "@chakra-ui/react";
import { FaExclamation } from "react-icons/fa";

interface ModalErrorProps {
  isOpen: boolean;
  onClose: () => void;
  error: string
};

const ModalError = ({ isOpen, onClose, error }: ModalErrorProps) => {
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color="gray.800" mr={["18px", "18px", "unset", "unset"]} ml={["18px", "18px", "unset", "unset"]}>
          <ModalHeader display="flex">
            <Center w="30px" h="30px" borderRadius="6px" bg="red.600">
              <FaExclamation color={theme.colors.white} />
            </Center>
            <Text ml="12px">Oops!</Text>
          </ModalHeader>
          <ModalCloseButton bg="red.600" color="white" _hover={{bg: "red.700"}} />

          <ModalBody>
            <Text color="gray.400" textAlign="center">Ocorreu algum erro! <b>{error}</b></Text>
          </ModalBody>

          <ModalFooter display="table-column">
            <Button w="100%" h="48px" bg="red.600" color="white" _hover={{bg: "red.700"}} onClick={onClose}>
              Tentar novamente
            </Button>
            <Text mt="18px" textAlign="center">Você já pode tentar novamente, <b>clicando</b> no botão acima ou aguarde alguns minutos...</Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
};

export default ModalError;