import { Card } from "@nextui-org/card";
import { Button } from "@nextui-org/react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Layout from "@/components/layout";


type Formula = {
    title: string,
    description?: string,
    formulas: (Formula | string)[]
}

type FormulaResponse = (Formula & {
    format?: {
        xs?: number,
        sm?: number,
        md?: number,
        lg?: number,
        xl?: number,
        xxl?: number
    }
})[];

type SizeMap = {
    [key: number]: string
}

const xsMap: SizeMap = {
    1: "col-span-12",
    2: "col-span-6",
    3: "col-span-4",
    4: "col-span-3"
};

const smMap: SizeMap = {
    1: "sm:col-span-12",
    2: "sm:col-span-6",
    3: "sm:col-span-4",
    4: "sm:col-span-3"
};

const mdMap: SizeMap = {
    1: "md:col-span-12",
    2: "md:col-span-6",
    3: "md:col-span-4",
    4: "md:col-span-3"
};

const lgMap: SizeMap = {
    1: "lg:col-span-12",
    2: "lg:col-span-6",
    3: "lg:col-span-4",
    4: "lg:col-span-3"
};

const xlMap: SizeMap = {
    1: "xl:col-span-12",
    2: "xl:col-span-6",
    3: "xl:col-span-4",
    4: "xl:col-span-3"
};

const xxlMap: SizeMap = {
    1: "2xl:col-span-12",
    2: "2xl:col-span-6",
    3: "2xl:col-span-4",
    4: "2xl:col-span-3"
};


function Index(): React.ReactElement {
    const router = useRouter();
    const [hidden, setHidden] = useState<boolean>(true);
    const [formulaObj, setFormulaObj] = useState<FormulaResponse>([] as unknown as FormulaResponse);

    function toFormulaList(formulaObj: FormulaResponse): React.ReactElement[] {
        return formulaObj.map((formula) => {
            const f = {
                xs: 1,
                sm: 1,
                md: 1,
                lg: 1,
                xl: 1,
                xxl: 1,
                ...formula.format
            };
            function getDesc(formula: Formula): (React.ReactElement | string) | undefined {
                return formula.description && <span>
                    {formula.description.split("`").map((value, i) => {
                        if (i % 2 === 1) {
                            return <MathJax inline={true} key={value}>{`\\(\\displaystyle ${value}\\)`}</MathJax>;
                        }
                        return value;
                    })}
                </span>;
            }
            function getFormula(formula: Formula | string): React.ReactElement {
                if (typeof formula === "string") {
                    return <div className={`${xsMap[f.xs]} ${smMap[f.sm]} ${mdMap[f.md]} ${lgMap[f.lg]} ${xlMap[f.xl]} ${xxlMap[f.xxl]}`} key={formula}>
                        <MathJax className={"m-[10px]"} onContextMenu={(event) => {
                            navigator.clipboard.writeText(formula);
                            event.preventDefault();
                        }}>{`\\(\\displaystyle ${formula}\\)`}</MathJax>
                    </div>;
                }
                return <div className={"pl-2 pt-2 col-span-12"}>
                    <div className={"text-2xl"}>{formula.title}</div>
                    <div className={"text-base pt-1 pl-1 opacity-60"}>
                        {getDesc(formula)}
                    </div>
                    {formula.formulas.map(formula => getFormula(formula))}
                </div>;
            }
            return <div key={formula.title}>
                <div className={"text-3xl py-2"}>{formula.title}</div>
                <div className={"text-base pt-1 pl-1 opacity-60"}>
                    {getDesc(formula)}
                </div>
                <div className={"grid grid-cols-12"}>
                    {formula.formulas.map(formula => getFormula(formula))}
                </div>
            </div>;
        });
    }
    const formulaList = toFormulaList(formulaObj);
    useEffect(() => {
        if (router.query.name) {
            fetch(`/${router.query.name}.json`)
                .then(response => response.json())
                .then(setFormulaObj)
                .catch(() => {
                    router.push("/math125");
                });
        }
    }, [router]);
    const config = {
        options: {
            enableMenu: false
        },
        startup: {
            pageReady: () => setHidden(false)
        }
    };
    return <Layout>
        <Head>
            <title>Formulas: {router.query.name}</title>
        </Head>
        <div className={"py-5"} hidden={hidden}>
            <Card className={"md:mx-[10%] xl:mx-[18%] py-2 px-10 bg-opacity-30"}>
                <MathJaxContext config={config}>
                    <div className={"to-print"}>
                        {formulaList}
                    </div>
                    <div className={"flex justify-center items-center py-3"}>
                        <Button className={"w-[50%]"} variant={"light"} onClick={() => window.print()}>Print</Button>
                    </div>
                </MathJaxContext>
            </Card>
        </div>
    </Layout>;
}

export default Index;
