'use client'

import React from "react";
import { StepTemplate, DragTypes } from "@/_types";
import { Flex, Text, FlexProps } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { FaGripVertical, FaPlus } from 'react-icons/fa';
import { useDrag } from 'react-dnd'

interface StepTemplateDraggableCardProps extends FlexProps {
    stepTemplate: StepTemplate;
    onAddStepTemplate: (stepTemplate: StepTemplate) => void;
}

export default function StepTemplateDraggableCard({ 
    stepTemplate,
    onAddStepTemplate,
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
            // backgroundColor={isDragging ? "brand.700" : "brand.500"}
            backgroundColor={isDragging ? "brand.700" : "brand.500"}
            _hover={{
                backgroundColor: "brand.400"
            }}
        >
            <Flex 
                pl={2}
                pr={2}
                h="55px"
                // backgroundColor={isDragging ? "brand.700" : "brand.500"}
                borderLeftRadius="md"
                cursor="grab"
                justify={"center"}
                direction={"column"}
                _hover={{
                    color: "brand.highlight",
                }}
            >
                <FaGripVertical />
            </Flex>
            <Text 
                fontSize="sm"
                p={4}
                flex={1}
                h="55px"
                // backgroundColor={isDragging ? "brand.700" : "brand.500"}
                color={"brand.100"}
            >
                {stepTemplate.title}
            </Text>
            <Flex 
                pl={2}
                pr={2}
                h="55px"
                // backgroundColor={isDragging ? "brand.700" : "brand.500"}
                borderRightRadius="md"
                cursor="grab"
                justify={"center"}
                direction={"column"}
                _hover={{
                    color: "brand.mutedHighlight"
                }}
            >
                <Button 
                    m={0}
                    p={0}
                    size={"sm"}
                    variant={"link"} 
                    color="brand.200"
                    _hover={{
                        color: "brand.highlight"
                    }}
                    onClick={() => onAddStepTemplate(stepTemplate)}
                >
                        <FaPlus />
                </Button>
            </Flex>
        </Flex>
    ) 
};
