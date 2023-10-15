import { Grid, Heading, VStack, Button, Box, Text } from "@chakra-ui/react";
import { DeepMap, FieldError, FieldValues, UseFormRegister } from "react-hook-form/dist/types";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Input } from "../../components/Form/Input";

interface LoginFormProps {
    handleSignIn: () => void;
    errors: DeepMap<FieldValues, FieldError>;
    register: UseFormRegister<FieldValues>;
    loading: boolean;
    invalidCredentials: boolean;
};

export const LoginForm = ({handleSignIn, errors, register, loading, invalidCredentials}: LoginFormProps) => {
    const history = useHistory();
        
    return (
        <Grid
            onSubmit={handleSignIn}
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
                    <Input 
                        icon={FaEnvelope} 
                        placeholder="Digite seu login" 
                        label="Login" 
                        type="email" 
                        error={errors.email as {type: string}} {...register("email")} 
                    />
                    {!errors.email && <Text ml="1" mt="1" color="gray.300">Ex: nome@email.com</Text>}
                </Box>
                <Box w="100%">
                    <Input
                        icon={FaLock} 
                        label="Senha" 
                        placeholder="Digite sua senha" 
                        type="password" 
                        error={errors.password as {type: string}} {...register("password")} 
                        />
                    {!!invalidCredentials ? <Text pt="6px" fontWeight="600" color="red.500">Email ou senha incorretos!</Text> : null}
                </Box>
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
                    onClick={() => history.push("/signup")} 
                >
                    Cadastrar
                </Button>
            </VStack>
        </Grid>
    )
};