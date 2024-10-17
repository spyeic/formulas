import { Card } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect } from "react";


import Layout from "@/components/layout";
import { APIResponse, ShareResponse } from "@/lib/api";


function Index(): React.ReactElement {
    const router = useRouter();
    useEffect(() => {
        if (!router.query.id) {
            return;
        }
        fetch("/api/share", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                op: "get",
                id: router.query.id
            })
        }).then((response) => response.json()).then((data: APIResponse<ShareResponse>) => {
            if (data.status === 200) {
                document.querySelector("math-field")?.setAttribute("value", data.body!.formula!);
            }
        });
    }, [router.query.id]);
    return <Layout>
        <Head>
            <title>Calculator</title>
        </Head>
        <Script src="https://unpkg.com/mathlive"/>
        <div className={"py-5"}>
            <Card className={"md:mx-[10%] xl:mx-[18%] py-2 px-10 bg-opacity-30 text-3xl"}>
                <math-field readonly style={{
                    backgroundColor: "transparent"
                }}>
                </math-field>
            </Card>
        </div>
    </Layout>;
}

export default Index;
