import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Progress
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface LayoutProps {
    children: React.ReactNode;
    customNavbar?: React.ReactNode;
    showOnHover?: boolean;
}

export default function Layout({ children, customNavbar, showOnHover }: LayoutProps): React.ReactElement {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    function startLoading(): void {
        setLoading(true);
    }
    function stopLoading(): void {
        setLoading(false);
    }
    useEffect(() => {
        router.events.on("routeChangeStart", startLoading);
        router.events.on("routeChangeComplete", stopLoading);
        return () => {
            router.events.off("routeChangeStart", startLoading);
            router.events.off("routeChangeComplete", stopLoading);
        };
    }, [router.events]);
    return (
        <>
            <Navbar isBordered className={showOnHover ? "opacity-0 hover:opacity-100 duration-500": ""}>
                <NavbarBrand>
                    <p className="font-bold text-inherit">Formulas</p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-20" justify="center">
                    <NavbarItem>
                        <Link href="/math125">
                            Math125
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link href="/math126">
                            Math126
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link href="/phys121">
                            Phys121
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    {customNavbar}
                </NavbarContent>
            </Navbar>
            <Progress
                size="sm"
                isIndeterminate
                aria-label="Loading..."
                className={"max-w-full rounded-none" + (loading ? "" : " invisible")}
            />
            {children}
        </>
    );
}
