import { Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { LoginInfo } from "./LoginInfo";
import { LoginForm } from "./LoginForm";

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
    const [ credentialsError, setCredentialsError ] = useState(false);

    const { signIn } = useAuth();

    const {
        formState: { errors },
        register,
        handleSubmit
    } = useForm({
        resolver: yupResolver(signInSchema)
    });
    
    const handleSignIn = (data: SignInData) => {
        setCredentialsError(false);
        setLoading(true);
        signIn(data)
        .then((res: any) => {
            if(res.response === "Email ou senha incorretos!"){
                setCredentialsError(true);
            };

            return setLoading(false);
        })
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
            <Flex 
                w={["100%", "100%", "90%", "65%"]} 
                justifyContent="center" 
                flexDirection={["column", "column", "row", "row"]} 
                alignItems="center"
            >
                <LoginInfo />
                <LoginForm invalidCredentials={credentialsError} errors={errors} handleSignIn={handleSubmit(handleSignIn as () => void)} loading={loading} register={register} />
            </Flex>
        </Flex>
    )
};