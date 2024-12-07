import App from "@/App.tsx";
import {
  ChakraProvider,
  extendTheme,
  type ThemeConfig,
} from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

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
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={themeConfig}>
      <App />
    </ChakraProvider>
  </StrictMode>,
);
