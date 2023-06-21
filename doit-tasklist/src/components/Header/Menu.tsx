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
        <DrawerContent w={["450px", "350px"]} mt="90px" ml="auto" mr="60px" border="1px" borderColor="#F1F1F1">
            <DrawerHeader borderBottomWidth='1px' borderColor="gray.50" color="gray.400">
                {user.name}
            </DrawerHeader>
            <DrawerBody>
                <Flex align="center" _hover={{cursor: "pointer"}} onClick={signOut}>
                    <Center w="60px" h="60px" bg="red.600" fontSize="2xl" borderRadius="md">
                        <FiLogOut color={theme.colors.white} transform="scaleX(-1)" scale="-1"/>
                    </Center>
                    <Box ml="4">
                        <Heading as="h2" fontSize="lg">
                            Sair da minha conta
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