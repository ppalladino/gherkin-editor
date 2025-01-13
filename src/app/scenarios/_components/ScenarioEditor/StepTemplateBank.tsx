'use client'

import React, { useState } from "react";
import { Scenario, ScenarioStep, ScenarioStepTokenValue, StepTemplate, DragTypes } from "@/_types";
import { Heading, Flex, Box, Text } from "@chakra-ui/react";
import { FaGripVertical } from 'react-icons/fa';
import { useDrag } from 'react-dnd'

const StepTemplateCard: React.FC<{ stepTemplate: StepTemplate }> = ({ stepTemplate }) => {
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
        <div 
            ref={drag}>
           
            <Text 
                fontSize="sm"
                p={4}
                m={2}
                borderRadius="md"
                boxShadow="sm"
                backgroundColor={isDragging ? "brand.300" : "brand.400"}
            >
                {stepTemplate.title}
            </Text>
        </div>
    )
    
};

interface StepTemplateBankProps {
  stepTemplates: StepTemplate[];
}

export default function StepTemplateBank({stepTemplates}: StepTemplateBankProps) {
    return (
        <div>
            <Flex direction="column" minHeight="100vh" p={4}>
            {stepTemplates.map((stepTemplate, index) => (
                <StepTemplateCard
                    key={stepTemplate.id || index}
                    stepTemplate={stepTemplate}
                />
            ))}
            </Flex>
            
        </div>
    )
}