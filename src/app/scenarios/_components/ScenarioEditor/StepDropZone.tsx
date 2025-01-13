'use client'

import React, { useState } from "react";
import { Scenario, ScenarioStep, ScenarioStepTokenValue, StepTemplate, DragTypes } from "@/_types";
import { Heading, Flex, Box, Text } from "@chakra-ui/react";
import { useDrop } from 'react-dnd'

interface StepDropZoneProps {
    dropIndex: number;
    onDrop: (dropIndex: number, type: string, id: string) => void;
}

export default function StepDropZone({
    dropIndex, onDrop
}: StepDropZoneProps) {

    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
          accept: DragTypes.STEP_TEMPLATE,
          drop: (item, monitor) => { onDrop(dropIndex, item.type, item.id) },
          canDrop: () => (true),
          collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
          })
        }),
        [dropIndex, onDrop]
    )

    const height = "7px"

    if (isOver) {
        return (
            <Box
            ref={drop}
            backgroundColor="brand.300"
            h={height}
        >
        </Box>)
    } else if (canDrop) {
        return (
            <Box
            ref={drop}
            backgroundColor="transparent"
            border="1px dashed"
            borderColor="brand.200"
            h={height}
        >
        </Box>)
    } else {
        return (
            <Box
            ref={drop}
            backgroundColor="transparent"
            h={height}
        >
        </Box>)
    }
}