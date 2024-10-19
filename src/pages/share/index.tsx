import { Card } from "@nextui-org/card";
import { Button } from "@nextui-org/react";
import { Base64 } from "js-base64";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

import Layout from "@/components/layout";

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
    setValue(value: string): void;
}

function Index(): React.ReactElement {
    const params = useSearchParams();
    const router = useRouter();
    const [loaded, setLoad] = React.useState(false);
    const shared = params.has("f");
    useEffect(() => {
        if (loaded) {
            if (params.has("f")) {
                const b64 = params.get("f")!;
                const formula = Base64.decode(b64);
                const mathField: MathField | null = document.querySelector("math-field");
                if (mathField) {
                    try {
                        mathField.setValue(formula);
                    } catch (e) {
                        toast.error("Invalid formula");
                    }
                }
            } else {
                const mathField: MathField | null = document.querySelector("math-field");
                if (mathField) {
                    mathField.setValue("");
                }
            }
        }
    }, [loaded, params]);
    return <Layout>
        <Head>
            <title>Share Formulas</title>
        </Head>
        <Script src="https://unpkg.com/mathlive" onReady={() => {
            setLoad(true);
        }}/>
        <Toaster />
        <div className={"py-5"}>
            <Card className={"md:mx-[10%] xl:mx-[18%] py-2 px-10 bg-opacity-30 dark:bg-opacity-100 text-3xl"}>
                {
                    shared ? <math-field readonly style={{
                        backgroundColor: "transparent"
                    }}>
                    </math-field> : <math-field style={{
                        backgroundColor: "transparent"
                    }}>
                    </math-field>
                }
                <Button className={"mt-5"} variant={"light"} onClick={() => {
                    if (shared) {
                        router.push("/share");
                    } else {
                        const mathField: MathField | null = document.querySelector("math-field");
                        if (mathField) {
                            const value = mathField.getValue();
                            const b64 = Base64.encodeURI(value);
                            navigator.clipboard.writeText(`${window.location.origin}/share?f=${b64}`)
                                .then(() => {
                                    toast.success("Link copied to clipboard");
                                });
                        }
                    }
                }}>{shared ? "Back" : "Share"}</Button>
            </Card>
        </div>
    </Layout>;
}

export default Index;
