import { Grid, Image, Heading, Text } from "@chakra-ui/react";
import LogoSecondary from "../../assets/logo-secondary.svg";

export const LoginInfo = () => {
    
    return (
        <Grid w={["100%", "100%", "50%", "50%"]} pr="100px">
            <Image src={LogoSecondary} alt="doit" boxSize={["120px", "120px", "100px", "100px"]} />
            <Heading as="h1" mt="4">O jeito fácil, gratis</Heading>
            <Text mt="24px">
                flexível e atrativo de gerenciar
                <b> seus <br/> projetos em uma única plataforma</b>
            </Text>
        </Grid>
    )
};