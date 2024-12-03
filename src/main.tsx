import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  ChakraProvider,
  extendTheme,
  type ThemeConfig,
} from "@chakra-ui/react";
import App from "./App.tsx";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const themeConfig = extendTheme({
  config,
  styles: {
    global: {
      body: {
        bg: "#262626",
        color: "#cecece",
      },
      html: {
        bg: "#262626",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        color: "#000",
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={themeConfig}>
      <App />
    </ChakraProvider>
  </StrictMode>,
);
