'use client'

import React, { useState } from "react";
import { StepTemplate } from "@/_types";
import { Flex, Text, Box, BoxProps } from "@chakra-ui/react";
import StepTemplateDraggableCard from "./StepTemplateDraggableCard";

interface StepTemplateBankProps extends BoxProps {
  stepTemplates: StepTemplate[];
  height?: string;
}

export default function StepTemplateBank({
    stepTemplates,
    height="calc(100vh - 20rem)",
    ...rest
}: StepTemplateBankProps) {
    return (
        <Box {...rest}
            maxH={height}
            overflowY="auto" // or "scroll"
            border="2px solid"
            borderColor="brand.300"
            p={4}
            rounded="md"
        >
            <Flex direction="column" p={4}>
                {stepTemplates.map((stepTemplate, index) => (
                    <StepTemplateDraggableCard
                        key={stepTemplate.id || index}
                        stepTemplate={stepTemplate}
                    />
                ))}
            </Flex>
            
        </Box>
    )
}