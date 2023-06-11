import { Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { SignUpInfo } from "./SignUpInfo";
import { SignUpForm } from "./SignUpForm";

const signUpSchema = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    email: yup.string().required("Email obrigatório").email("Email inválido"),
    password: yup.string().required("Senha obrigatória"),
    confirm_password: yup.string().required("Confirmação de senha obrigatória").oneOf([yup.ref("password")], "Senhas diferentes"),
});

interface SignUpData {
    name: string,
    email: string,
    password: string
};

export const SignUp = () => {
    const [ loading, setLoading ] = useState(false);

    const {
        formState: { errors },
        register,
        handleSubmit
    } = useForm({
        resolver: yupResolver(signUpSchema)
    });
    
    const handleSignIn = (data: SignUpData) => {
        console.log(data)
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
                <SignUpForm errors={errors} handleSignUp={handleSubmit(handleSignIn as () => void)} loading={loading} register={register}/>
                <SignUpInfo />
            </Flex>
        </Flex>
    )
};