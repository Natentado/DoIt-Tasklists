import { Center, theme } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { useHistory } from "react-router-dom";

interface Props {
    top: string,
    left: string
};

export const GoBackButton = ({top, left}: Props) => {

    const history = useHistory();

    return (
        <Center 
            as="button" 
            position="absolute" 
            top={top} 
            left={left} 
            w={["60px", "80px"]} 
            h="60px" 
            borderRadius="md" 
            bg="purple.500" 
            fontSize="2xl" 
            _hover={{
                bg: "purple.600"
            }}
            onClick={() => history.push("/")}
        >
            <FaArrowLeft color={theme.colors.white} />
        </Center>
    )
};