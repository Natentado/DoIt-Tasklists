import { Box, Center, Flex, Heading, HStack, Progress, Text, theme } from "@chakra-ui/react"
import { FaCheck, FaTrash } from "react-icons/fa";

const Card = () => {

    return (
        <Box 
            cursor="pointer"
            w={["330px", "auto"]}
            p="7"
            borderWidth="1px" 
            borderColor="gray.50" 
            boxShadow="base"
            transition="border 0.2s, ease 0s, transform 0.2s" 
            _hover={{transform: "translateY(-6px)", borderColor: "gray.100"}} 
        >
            <Flex justify="space-between">
                <Heading as="h1" size="md">
                    "lorem ipsum dolor met it at bum"
                </Heading>
                <HStack spacing="4" alignItems="flex-start">
                    <Center as="button" w="30px" h="30px" borderWidth="1px" borderRadius="5px" borderColor="gray.200" bg="white">
                        <FaTrash color={theme.colors.gray[400]} />
                    </Center>
                    <Center as="button" w="30px" h="30px" borderWidth="1px" borderRadius="5px" borderColor="gray.200" bg="white">
                        <FaCheck color={theme.colors.gray[400]} />
                    </Center>
                </HStack>
            </Flex>
            <Box w="100%" mt="4">
                <Text>
                    Start study kenzie app, for one 1 and a half
                </Text>
                <Progress colorScheme="purple" mt="2.5" value={10}>
                    <Text color="gray.200" mt="3">
                        07 march 2021
                    </Text>
                </Progress>
            </Box>
        </Box>
    )
};

export default Card;