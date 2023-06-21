import { Button, Center, Flex, theme } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { Input } from "./Input";

interface SearchBoxProps {

}

const SearchBox = ({}: SearchBoxProps) => {
    return (
        <Flex w="100%" mt="6" px={["4", "8"]} py="2" paddingBottom="6" borderBottomWidth="1px" borderColor="gray.50">
            <Flex as="form" gap="6px">
                <Input name="title" placeholder="Pesquisar por tarefa" w="35vw" />
                <Center as="button" borderRadius="8px" w="72px" h="60px" bg="purple.600" fontSize="2xl">
                    <FaSearch color={theme.colors.white} />
                </Center>
            </Flex>
            <Button h="60px" ml="4" px="16" borderRadius="6px" bg="purple.500" color="white" _hover={{bg: "purple.600"}}>Adicionar nova tarefa</Button>
        </Flex>
    )  
};

export default SearchBox;