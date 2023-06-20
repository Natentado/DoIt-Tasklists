import { Flex, Heading, Image, useDisclosure, Center } from "@chakra-ui/react";
import { FaTh } from "react-icons/fa";
import Logo from "../../assets/Icon.svg";
import { theme } from "../../styles/theme";
import { Menu } from "./Menu";

export const Header = () => {
    
    const { isOpen, onClose, onToggle } = useDisclosure();

    return (
        <Flex borderBottom="1px" borderBottomColor="#F5F5F5" px="8" py="2">
            <Flex align="center">
                <Image src={Logo} />
                <Heading ml="4" size="lg">Dashboard</Heading>
            </Flex>
            <Center as="button" ml="auto" onClick={onToggle} fontSize="2em" >
                <FaTh color={theme.colors.gray[300]} />
            </Center>
            <Menu isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
};