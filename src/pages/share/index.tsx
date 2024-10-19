import { Card } from "@nextui-org/card";
import { Button } from "@nextui-org/react";
import Head from "next/head";
import Script from "next/script";
import React from "react";
import { toast, Toaster } from "react-hot-toast";

import Layout from "@/components/layout";
import { APIResponse, ShareResponse } from "@/lib/api";

interface MathFieldHTMLAttributes extends React.HTMLAttributes<HTMLElement> {
    readonly?: boolean;
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            "math-field": React.DetailedHTMLProps<MathFieldHTMLAttributes, HTMLElement>;
        }
    }
}

interface MathField extends Element {
    getValue(): string;
}

function Index(): React.ReactElement {
    return <Layout>
        <Head>
            <title>Calculator</title>
        </Head>
        <Script src="https://unpkg.com/mathlive"/>
        <Toaster />
        <div className={"py-5"}>
            <Card className={"md:mx-[10%] xl:mx-[18%] py-2 px-10 bg-opacity-30 dark:bg-opacity-100 text-3xl"}>
                <math-field style={{
                    backgroundColor: "transparent"
                }}>
                </math-field>
                <Button className={"mt-5"} variant={"light"} onClick={() => {
                    const mathField: MathField | null = document.querySelector("math-field");
                    if (mathField) {
                        const value = mathField.getValue();
                        fetch("/api/share", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                op: "add",
                                formula: value
                            })
                        }).then((response) => response.json()).then((data: APIResponse<ShareResponse>) => {
                            if (data.status === 200) {
                                navigator.clipboard.writeText(`${window.location.origin}/share/${data.body!.id}`)
                                    .then(() => {
                                        toast.success("Link copied to clipboard");
                                    });
                            }
                        });
                    }
                }}>Share</Button>
            </Card>
        </div>
    </Layout>;
}

export default Index;
