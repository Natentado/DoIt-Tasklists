import { 
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input as ChakraInput,
    InputProps as ChakraInputProps,
    InputLeftElement,
    InputGroup
} from "@chakra-ui/react";

// import {FaExclamation} from "react-icons/fa";

import { useState, useEffect, useCallback, ForwardRefRenderFunction, forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { IconType } from "react-icons/lib";

interface InputProps extends ChakraInputProps {
    name: string,
    label?: string,
    error?: FieldError | null,
    icon?: IconType,
};

type inputVariationOptions = {
    [key: string]: string
};

const inputVariation: inputVariationOptions = {
    error: "red.500",
    default: "gray.500",
    focus: "purple.800",
    filled: "green.500",
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, error = null, icon: Icon, label, ...rest}, ref) => {
    const [variation, setVariation] = useState("default");
    const [value, setValue] = useState("")

    useEffect(() => {
        if(error){
            return setVariation("error")
        }
    }, [error]);

    const handleInputFocus = useCallback(() => {
        if(!error) {
            setVariation("focus")
        }
    }, [error]);

    const handleInputBlur = useCallback(() => {
        if(value.length > 1 && !error){
            return setVariation("filled")
        }
    }, [error, value]);

    return(
        <FormControl isInvalid={!!error}>
            {label ? <FormLabel color={"gray.400"}>{label}</FormLabel> : null}

            <InputGroup flexDirection="column">
                {Icon ?
                <InputLeftElement color={inputVariation[variation]} mt="2.5">
                    <Icon />
                </InputLeftElement> : null}
                <ChakraInput
                    name={name}
                    variant="outline"
                    h="60px"
                    bg="gray.50"
                    borderColor={inputVariation[variation]}
                    color={inputVariation[variation]}
                    size="lg"
                    _placeholder={{color: "gray.300"}}
                    _hover={{ bgColor: "gray.100"}}
                    _focus={{bg: "gray.100"}}
                    onChangeCapture={e => setValue(e.currentTarget.value)}
                    onFocus={handleInputFocus}
                    onBlurCapture={handleInputBlur}
                    ref={ref}
                    {...rest}
                />

                {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
            </InputGroup>
        </FormControl>
    )
}

export const Input = forwardRef(InputBase)