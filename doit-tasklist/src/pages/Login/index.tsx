import { Box, Button, Flex, Grid, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import LogoSecondary from "../../assets/logo-secondary.svg";
import { Input } from "../../components/Form/input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const signInSchema = yup.object().shape({
    email: yup.string().required("Email obrigatório").email("Email inválido"),
    password: yup.string().required("Senha obrigatória")
});

interface SignInData {
    email: string,
    password: string
};

export const Login = () => {
    const [ loading, setLoading ] = useState(false);

    const { signIn } = useAuth();

    const {
        formState: { errors },
        register,
        handleSubmit
    } = useForm({
        resolver: yupResolver(signInSchema)
    });
    
    const handleSignIn = (data: SignInData) => {
        setLoading(true);
        signIn(data)
        .then(_ => setLoading(false))
        .catch(err => setLoading(false));
    };

    return(
        <Flex 
            justifyContent="center" 
            alignItems="center"
            h={["auto", "auto", "100vh", "100vh"]} 
            p={["10px 15px", "10px 15px", "0px", "0px"]}
            bgGradient={[
                "linear(to-b, purple.800 65%, white 35%)",
                "linear(to-b, purple.800 65%, white 35%)",
                "linear(to-r, purple.800 65%, white 35%)",
                "linear(to-r, purple.800 65%, white 35%)"
            ]} 
            color="white" 
        >
            <Flex w={["100%", "100%", "90%", "65%"]} justifyContent="center" flexDirection={["column", "column", "row", "row"]} alignItems="center">
                <Grid w={["100%", "100%", "50%", "50%"]} pr="100px">
                    <Image src={LogoSecondary} alt="doit" boxSize={["120px", "120px", "150px", "150px"]} />
                    <Heading as="h1" mt="4">O jeito fácil, gratis</Heading>
                    <Text mt="24px">
                        flexível e atrativo de gerenciar
                        <b> seus <br/> projetos em uma única plataforma</b>
                    </Text>
                </Grid>
                <Grid
                    onSubmit={handleSubmit(handleSignIn as () => void)}
                    as="form"  
                    w={["100%", "100%", "40%", "40%"]} 
                    p="30px 15px" 
                    mt={["4", "4", "0"]}
                    border="3px solid" 
                    borderColor="gray.100" 
                    bg="white" 
                    color="gray.900"
                >
                    <Heading size="lg">Bem vindo de volta!</Heading>
                    <VStack spacing="5" mt="6">
                        <Box w="100%">
                            <Input icon={FaEnvelope} placeholder="Digite seu login" label="Login" type="email" error={errors.email as {type: string}} {...register("email")} />
                            {!errors.email && <Text ml="1" mt="1" color="gray.300">Ex: nome@email.com</Text>}
                        </Box>
                        <Input icon={FaLock} placeholder="Digite sua senha" type="password" error={errors.password as {type: string}} {...register("password")} />
                    </VStack>
                    <VStack mt="4" spacing="5">
                        <Button
                            isLoading={loading}
                            bg="purple.800" 
                            w="100%" 
                            h="60px" 
                            borderRadius="8px" 
                            color="white" 
                            _hover={{background:"purple.900"}} 
                            type="submit"
                        >
                            Entrar
                        </Button>
                        <Text color="gray.400">Ainda não possui uma conta?</Text>
                        <Button
                            bg="gray.100" 
                            w="100%" 
                            h="60px" 
                            borderRadius="8px" 
                            color="gray.300" 
                            _hover={{background:"gray.200"}} 
                        >
                            Cadastrar
                        </Button>
                    </VStack>
                </Grid>
            </Flex>
        </Flex>
    )
};