import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default function Document(): React.ReactElement {
    return (
        <Html lang="en">
            <Head/>
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    );
}
