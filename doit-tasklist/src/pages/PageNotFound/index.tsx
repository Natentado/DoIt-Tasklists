import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import NotFoundImg from "../../assets/notFound.svg";

const PageNotFound = () => {
    const history = useHistory();

    return (
        <Flex
            flexDirection={["column-reverse", "column-reverse", "row", "row"]}
            justifyContent={["center", "center", "space-evenly","space-evenly"]}
            alignItems="center"
            gap="18px"
            h="100vh" 
            p={["10px 15px", "10px 15px", "0px", "0px"]}
        >
            <Box>
                <Heading>Oooops?</Heading>
                <Text mt="4" color="gray.400">
                    Não encontramos a página que você procurou, <br />
                    <b>vamos tentar novamente.</b>
                </Text>
                <Button 
                    w="100%" 
                    h="60px" 
                    mt="4" 
                    bg="red.600" 
                    color="white" 
                    fontSize="18px" 
                    _hover={{bg: "red.700"}} 
                    onClick={() => history.push("/")}
                >
                    Ir para as minhas tarefas
                </Button>
            </Box>
            <Image src={NotFoundImg} />
        </Flex>
    )
} ;

export default PageNotFound;