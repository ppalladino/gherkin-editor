"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/router';
import { Flex, HStack, Heading, Text, Spacer, Button } from "@chakra-ui/react";

export default function FeaturesNav() {
  const router = useRouter()

  return (
    <React.Fragment>
      <Flex as="nav" p="10px" alignItems="center">
        <Heading as="h4">Scenario List</Heading>
        <Spacer />
        <HStack>
            <Button onClick={() => router.push('/scenarios/create')}>
              Create Scenario
            </Button>
        </HStack>
      </Flex>
  </React.Fragment>
  );
}