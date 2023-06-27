import { extendTheme, theme as ChakraTheme} from "@chakra-ui/react"

export const theme = extendTheme({
    colors: {
        purple: {
            500: "#8615DF",
            600: "#570E91",
            800: "#38085C",
            900: "#190429"
        },
        gray: {
            50: "#F6F6F7", 
            100: "#EEE",
            200: "#D4D4D4",
            300: "#9E9EA7",
            400: "#666665",
            900: "#111"
        },
        red: {
            600: "#DF1545",
            700: "#ba1139"
        },
        green: {
            500: "#20bd2f",
            600: "#168821"
        },
        fonts: {
            heading: "Inter",
            body: "Inter"
        },
        fontSizes: {
            xs: "0.75rem",
            sm: "0.875rem",
            md: "1rem",
            lg: "1.125rem",
            xl: "1.25",
            '2xl': "1.5rem",
            '3xl': "1.875rem",
            '4xl': "2.25rem",
            '5xl': "3rem",
            '6xl': "3.75rem",
            '7xl': "4.5rem",
            '8xl': "6rem",
            '9xl': "8rem"
        },
        styles: {
            global: {
                body: {
                    bg: "white",
                    color: "gray.900"
                }
            }
        }
    },
})