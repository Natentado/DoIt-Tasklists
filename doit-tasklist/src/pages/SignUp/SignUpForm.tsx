import { Grid, Heading, VStack, Button, Box, Text } from "@chakra-ui/react";
import { DeepMap, FieldError, FieldValues, UseFormRegister } from "react-hook-form/dist/types";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Input } from "../../components/Form/Input";

interface SignUpFormProps {
    handleSignUp: () => void;
    errors: DeepMap<FieldValues, FieldError>;
    register: UseFormRegister<FieldValues>;
    loading: boolean;
};

export const SignUpForm = ({handleSignUp, errors, register, loading}: SignUpFormProps) => {
    
    return (
        <Grid
            onSubmit={handleSignUp}
            as="form"  
            w={["100%", "100%", "40%", "40%"]}
            maxWidth={["unset", "600px", "600px"]}
            p="40px 25px" 
            mt={["4", "4", "0"]}
            border="3px solid" 
            borderColor="gray.100" 
            bg="white" 
            color="gray.900"
        >
            <Heading size="lg">Crie sua conta</Heading>
            <VStack spacing="5" mt="6">
                <Input icon={FaUser} placeholder="Digite seu nome" label="Nome" error={errors.name as {type: string}} {...register("name")} />
                <Box w="100%">
                    <Input icon={FaEnvelope} placeholder="Digite seu login" label="Login" type="email" error={errors.email as {type: string}} {...register("email")} />
                    {!errors.email && <Text ml="1" mt="1" color="gray.300">Ex: nome@email.com</Text>}
                </Box>
                <Input icon={FaLock} label="Senha" placeholder="Digite sua senha" type="password" error={errors.password as {type: string}} {...register("password")} />
                <Input icon={FaLock} label="Confirmação de senha" placeholder="Confirme sua senha" type="password" error={errors.confirm_password as {type: string}} {...register("confirm_password")} />
            </VStack>
            <Button
                isLoading={loading}
                bg="purple.800" 
                w="100%" 
                h="60px"
                mt="8" 
                borderRadius="8px" 
                color="white" 
                _hover={{background:"purple.900"}} 
                type="submit"
            >
                Finalizar cadastro
            </Button>
        </Grid>
    )
};