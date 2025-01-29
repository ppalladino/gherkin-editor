"use client"

import { Flex, Spinner as ChakraSpinner} from "@chakra-ui/react";

export default function Spinner() {
    return (
        <Flex flex={1} justify="center" align="center">
            <ChakraSpinner
                size="xl"
                color="brand.100"
            />
        </Flex>
    );
}