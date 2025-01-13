"use client";

import { Text, Flex, Heading, HStack, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function PrimaryNav() {

  const currentPath = usePathname();

  return (
    <React.Fragment>
      <Flex as="nav" p="10px" alignItems="center" borderBottom="1px solid">
        <Heading as="h1" size="2xl" color="brand.100">Gherkin Editor</Heading>
        <Spacer />
        <HStack>
            <Link className={currentPath == "/" ? "active" : ""} href="/">
              <Text p="5px" fontSize="sm">Home</Text>
            </Link>
            <Link href="/scenarios" className={currentPath == "/scenarios" ? "active" : ""}>
              <Text p="5px" fontSize="sm">Scenarios</Text>
            </Link>
            <Link className={currentPath == "/features" ? "active" : ""} href="/features">
              <Text p="5px" fontSize="sm">Features</Text>
            </Link>
        </HStack>
      </Flex>
    </React.Fragment>
  );
}