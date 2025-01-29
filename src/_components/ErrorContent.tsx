"use client"

import { Flex } from "@chakra-ui/react";
import { FaFrown } from 'react-icons/fa';

export default function ErrorContent() {
    return (
        <Flex flex={1} justify="center" align="center">
            <FaFrown size={500} color="#DC2626"/>
        </Flex>
    );
}