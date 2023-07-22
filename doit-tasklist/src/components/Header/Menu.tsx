import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Flex, Center, Box, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { theme } from "../../styles/theme";
import { FiLogOut } from "react-icons/fi";

interface MenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Menu = ({isOpen, onClose}: MenuProps) => {

    const { user, signOut } = useAuth();

    return (
        <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay mt="90px" />
        <DrawerContent 
            top={"-24px !important"} 
            w={["90%", "90%","450px", "350px"]} 
            mt={["100px", "100px", "90px", "90px"]}
            ml="auto" 
            mr={["auto", "auto", "60px", "60px"]} 
            border="1px"
            borderRadius="6px" 
            borderColor="#F1F1F1"
        >
            <DrawerHeader borderBottomWidth='1px' borderColor="gray.200" color="gray.400">
                {user.name}
            </DrawerHeader>
            <DrawerBody>
                <Flex align="center" _hover={{cursor: "pointer"}} onClick={signOut}>
                    <Center 
                        w="48px" 
                        h="48px" 
                        bg="red.600" 
                        _hover={{bg: "red.700"}} 
                        _active={{bg: "red.800"}} 
                        fontSize="2xl" 
                        borderRadius="md"
                    >
                        <FiLogOut color={theme.colors.white} transform="scaleX(-1)" scale="-1"/>
                    </Center>
                    <Box ml="4" py="12px">
                        <Heading as="h2" fontSize="lg">
                            Sair da conta
                        </Heading>
                        <Text color="gray.300" fontSize="small">
                            Sair da minha conta agora
                        </Text>
                    </Box>
                </Flex>            
            </DrawerBody>
        </DrawerContent>
      </Drawer>
    )
};