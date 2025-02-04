'use client'

import React from "react";
import { StepTemplate, DragTypes } from "@/_types";
import { Flex, Text, FlexProps } from "@chakra-ui/react";
import { FaGripVertical } from 'react-icons/fa';
import { useDrag } from 'react-dnd'

interface StepTemplateDraggableCardProps extends FlexProps {
    stepTemplate: StepTemplate;
}

export default function StepTemplateDraggableCard({ 
    stepTemplate,
    ...rest 
}: StepTemplateDraggableCardProps ){
    const [{isDragging}, drag] = useDrag(() => ({
        type: DragTypes.STEP_TEMPLATE,
        item: { 
            type: DragTypes.STEP_TEMPLATE,
            id: stepTemplate.id
        },
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
    }))

    return (
        
        <Flex 
            {...rest}
            ref={drag}
            direction="row"
            borderRadius="md"
            boxShadow="sm"
            mb={4}
            align={"center"}
        >
            <Flex 
                pl={2}
                pr={2}
                h="55px"
                backgroundColor={isDragging ? "brand.700" : "brand.500"}
                borderLeftRadius="md"
                cursor="grab"
                justify={"center"}
                direction={"column"}
                _hover={{
                    color: "brand.mutedHighlight"
                }}
            >
                <FaGripVertical />
            </Flex>
            <Text 
                fontSize="sm"
                p={4}
                flex={1}
                h="55px"
                borderRightRadius="md"
                backgroundColor={isDragging ? "brand.700" : "brand.500"}
                color={"brand.100"}
            >
                {stepTemplate.title}
            </Text>
        </Flex>
    ) 
};
