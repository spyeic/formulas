import { useRouter } from "next/router";
import React, { useEffect } from "react";

import Layout from "@/components/layout";

function Index(): React.ReactElement {
    const router = useRouter();
    useEffect(() => {
        router.push("/math126");
    }, [router]);
    return <Layout>
        <div></div>
    </Layout>;
}

export default Index;
