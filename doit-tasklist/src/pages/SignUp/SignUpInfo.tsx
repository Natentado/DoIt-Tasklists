import { Grid, Heading, Text, Image, VStack, Flex, Box, Center } from "@chakra-ui/react";
import { FaForward } from "react-icons/fa";
import LogoSecondary from "../../assets/logo-secondary.svg";
import { theme } from "../../styles/theme";
import SimpleIcon from "../../assets/simple-icon.svg";

export const SignUpInfo = () => {

    return (
        <Grid w={["100%", "100%", "50%", "50%"]} maxWidth={["600px", "600px", "unset"]} h="100%" pl={[0, 0, "100px"]}>
            <Image src={LogoSecondary} alt="doit" boxSize={["120px", "120px", "150px", "150px"]} />
            <VStack spacing={["7", "7", "14"]} mt={["10px", 0]}>
                <Flex w="100%">
                    <Center borderRadius="5px" bg="white" w="50px" h="50px">
                        <FaForward color={theme.colors.purple[800]} size={25} />
                    </Center>
                    <Box ml="4">
                        <Heading size="lg">
                            Agilidade
                        </Heading>
                        <Text>
                            Agilize seus projetos com rapidez <br /> e muita performance
                        </Text>
                    </Box>
                </Flex>
                <Flex w="100%">
                    <Center borderRadius="5px" bg="white" w="50px" h="50px">
                        <Image src={SimpleIcon} w="25px" />
                    </Center>
                    <Box ml="4">
                        <Heading size="lg">
                            Simplicidade
                        </Heading>
                        <Text>
                            Armazene seus projetos em uma <br /> interface altamente usual
                        </Text>
                    </Box>
                </Flex>
            </VStack>
        </Grid>
    )
};