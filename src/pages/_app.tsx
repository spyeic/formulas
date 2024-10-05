import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";

import type { AppProps } from "next/app";


export default function App({ Component, pageProps }: AppProps): React.ReactElement {
    return (
        <NextUIProvider>
            <NextThemesProvider
                defaultTheme={"system"}
                attribute={"class"}
            >
                <Component {...pageProps} />
            </NextThemesProvider>
        </NextUIProvider>
    );
}
