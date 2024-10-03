// pages/_app.tsx
import { QuizProvider } from "../context/QuizContext";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <QuizProvider>
        <Component {...pageProps} />
      </QuizProvider>
    </ChakraProvider>
  );
}

export default MyApp;