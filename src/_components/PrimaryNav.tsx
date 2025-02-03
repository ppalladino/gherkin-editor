"use client";

import { Text, Flex, Heading, HStack, Spacer, Box } from "@chakra-ui/react";
import Link from "next/link";
import Image from 'next/image';
import { usePathname } from "next/navigation";
import React from "react";

export default function PrimaryNav() {

    const currentPath = usePathname();

    return (
        <Flex as="nav" p="10px" alignItems="center" borderBottom="1px solid">
            <Box mr="10px">
                <Image 
                    src="/pickle-white.png" // Ensure this path is correct
                    alt="Gherkin Shmerkin Logo"
                    width="75"
                    height="75"
                />
            </Box>
            <Heading as="h1" size="2xl" color="brand.100">Gherkin Shmerkin</Heading>
            <Spacer />
            <HStack>
                <Link href="/" className={currentPath == "/" ? "active" : ""}>
                    <Text p="5px" fontSize="sm">Home</Text>
                </Link>
                <Link href="/organizations" className={currentPath.includes("/organizations") ? "active" : ""}>
                    <Text p="5px" fontSize="sm">Organizations</Text>
                </Link>
                <Link href="/step-templates" className={currentPath == "/step-templates" ? "active" : ""}>
                    <Text p="5px" fontSize="sm">Step Templates</Text>
                </Link>
                <Link href="/step-token-options" className={currentPath == "/step-token-options" ? "active" : ""}>
                    <Text p="5px" fontSize="sm">Step Token Options</Text>
                </Link>
                <Link href="/scenarios" className={currentPath == "/scenarios" ? "active" : ""}>
                    <Text p="5px" fontSize="sm">Scenarios</Text>
                </Link>
                <Link className={currentPath == "/features" ? "active" : ""} href="/features">
                    <Text p="5px" fontSize="sm">Features</Text>
                </Link>
            </HStack>
        </Flex>
    );
}