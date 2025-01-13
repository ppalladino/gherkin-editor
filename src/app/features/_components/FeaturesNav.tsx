"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flex, HStack, Heading, Text, Spacer } from "@chakra-ui/react";

export default function FeaturesNav() {
  const currentPath = usePathname();

  return (
    <React.Fragment>
      <Flex as="nav" p="10px" alignItems="center">
        <Heading as="h4">Features List</Heading>
        <Spacer />
        <HStack>
          <Link href="/">New Feature</Link>
        </HStack>
      </Flex>
  </React.Fragment>
  );
}