'use client'

import React, { useState } from "react";
import { DragTypes } from "@/_types";
import { Box, BoxProps } from "@chakra-ui/react";
import { useDrop } from 'react-dnd'

interface StepDropZoneProps extends BoxProps {
    dropIndex: number;
    onDrop: (dropIndex: number, type: string, id: string) => void;
    keepOpen?: boolean;
}

export default function StepDropZone({
    dropIndex, 
    onDrop,
    keepOpen = false,
    height = "50px",
    ...rest
}: StepDropZoneProps) {

    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
          accept: [DragTypes.STEP_TEMPLATE, DragTypes.SCENARIO_STEP],
          drop: (item, monitor) => { onDrop(dropIndex, item.type, item.id) },
          canDrop: () => (true),
          collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
          })
        }),
        [dropIndex, onDrop]
    )

    const showZone = keepOpen || (isOver && canDrop)
    
    const getBorderColor = () => {
        if(keepOpen && !isOver) {
            return "brand.300"
        } else if (keepOpen && isOver) {
            return "brand.200"
        } else if (canDrop && !isOver) {
            return "brand.300"
        } else if (canDrop && isOver) {
            return "brand.200"
        } else {
            return "transparent"
        }
    }

    return (
        <Box
            {...rest}
            ref={drop}
            border={showZone ? "2px dashed" : "none"}
            borderColor={getBorderColor()}
            backgroundColor={"transparent"}
            h={showZone ? height : "10px"}
            transition="height 0.3s ease"
            borderRadius={"md"}
         >
        </Box>
    )
}