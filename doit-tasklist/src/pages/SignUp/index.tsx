import { Flex, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { SignUpInfo } from "./SignUpInfo";
import { SignUpForm } from "./SignUpForm";
import { GoBackButton } from "./GoBackButton";
import { api } from "../../services/api";
import ModalSuccess from "../../components/Modal/ModalSuccess";
import ModalError from "../../components/Modal/ModalError";

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

type ErrorMessages = {
    "Password is too short": string,
    "Email already exists": string
};

export const SignUp = () => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState("");

    const {
        formState: { errors },
        register,
        handleSubmit
    } = useForm({
        resolver: yupResolver(signUpSchema)
    });

    const errorMsgsTranslated: ErrorMessages = {
        "Password is too short": "senha muito curta",
        "Email already exists": "email já cadastrado"
    };
    
    const handleSignUp = ({ name, email, password }: SignUpData) => {
        setLoading(true);

        api.post("/register", { name, email, password })
        .then(res => {
            setLoading(false);
            onModalSuccessOpen();
            console.log(res)
        })
        .catch(err => {
            setLoading(false);
            onModalErrorOpen();
            setError(errorMsgsTranslated[err.response.data as keyof ErrorMessages]??err.response.data);
            console.log(err)
        });
    };

    const { isOpen: isModalSuccessOpen, onOpen: onModalSuccessOpen, onClose: onModalSuccessClose } = useDisclosure();
    const { isOpen: isModalErrorOpen, onOpen: onModalErrorOpen, onClose: onModalErrorClose } = useDisclosure();

    const isWideVersion = useBreakpointValue({
        base: false,
        md: true,
    });

    return(
        <>
            <ModalSuccess isOpen={isModalSuccessOpen} onClose={onModalSuccessClose} />
            <ModalError error={error} isOpen={isModalErrorOpen} onClose={onModalErrorClose} />
            <Flex 
                justifyContent="center" 
                alignItems="center"
                h={["auto", "auto", "100vh", "100vh"]} 
                p={["10px 15px", "10px 15px", "0px", "0px"]}
                bgGradient={[
                    "linear(to-b, purple.800 65%, white 35%)",
                    "linear(to-b, purple.800 65%, white 35%)",
                    "linear(to-l, purple.800 65%, white 35%)",
                    "linear(to-l, purple.800 65%, white 35%)"
                ]} 
                color="white" 
            >
                <Flex 
                    w={["100%", "100%", "90%", "65%"]}
                    h={["unset", "unset", "100%", "100%"]} 
                    maxH={["unset", "unset", "700px", "700px"]} 
                    justifyContent="center" 
                    flexDirection={["column", "column", "row", "row"]} alignItems="center"
                >
                    { isWideVersion ?
                        <>
                            <GoBackButton top="60px" left="24px" />
                            <SignUpForm errors={errors} handleSignUp={handleSubmit(handleSignUp as () => void)} loading={loading} register={register}/>
                            <SignUpInfo />
                        </>
                    :
                        <>
                            <GoBackButton top="10" left="75vw" />
                            <SignUpInfo />
                            <SignUpForm errors={errors} handleSignUp={handleSubmit(handleSignUp as () => void)} loading={loading} register={register}/>
                        </>
                    }
                </Flex>
            </Flex>
        </>
    )
};