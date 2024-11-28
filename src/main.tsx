import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, createSystem, defineConfig, defaultConfig } from "@chakra-ui/react"
import App from "./App.tsx";

const themeConfig = defineConfig({
  globalCss: {
    "html, body": {
      background: "#262626",
      color: "#cecece"
    }
  }
})

const system = createSystem(defaultConfig, themeConfig)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <App />
    </ChakraProvider>
  </StrictMode>,
);
