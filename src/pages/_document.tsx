import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default function Document(): React.ReactElement {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
            </Head>
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    );
}
