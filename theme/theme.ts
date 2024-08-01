import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  styles: {
    global: {
      "html, body": {
        background: "linear-gradient(135deg, #6e8efb, #a777e3)",
        color: "gray.700",
        height: "100vh",
        margin: 0,
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "lg",
      },
      variants: {
        solid: {
          bg: "purple.500",
          color: "gray.700",
          _hover: {
            bg: "purple.400",
          },
        },
      },
    },
  },
});

export default customTheme;
