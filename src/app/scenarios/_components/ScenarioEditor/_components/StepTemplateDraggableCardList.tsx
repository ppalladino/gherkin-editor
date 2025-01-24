'use client'

import React from "react";
import { StepTemplate } from "@/_types";
import { Flex, FlexProps } from "@chakra-ui/react";

interface StepTemplateDraggableCardListProps extends FlexProps {
  height?: string;
}

export default function StepTemplateDraggableCardList({
    children,
    height="calc(100vh - 20rem)",
    ...rest
}: StepTemplateDraggableCardListProps) {
    return (
        <Flex 
            // {...rest}
            direction="column" 
            maxH={height}
            height="100%"
            p={4}
            overflowY="scroll" // or "scroll"
            border="2px solid"
            borderColor="brand.400"
            rounded="md"
        >
            {children}
        </Flex>
    )
}