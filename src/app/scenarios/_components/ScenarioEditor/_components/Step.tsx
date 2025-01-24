'use client'

import React from "react";
import { StepTemplate, ScenarioStep, DragTypes, StepTokenOptions, Scenario } from "@/_types";
import { Text, Flex, Box } from "@chakra-ui/react";
import { useDrag } from 'react-dnd'
import { FaGripVertical, FaTrash } from 'react-icons/fa';
import StepInput from "./StepInput";

interface StepProps {
    scenario: Scenario;
    step: ScenarioStep;
    stepTemplate: StepTemplate | undefined;
    stepTokenOptions: StepTokenOptions[] | undefined
    onDelete: (stepId: string) => void;
    onTokenValueChange: (scenarioStepId: string, tokenKey: string, tokenValue: string) => void;
    // isNew?: boolean;
}

export default function Step({
    scenario,
    step,
    stepTemplate,
    stepTokenOptions,
    onDelete,
    onTokenValueChange,
    // isNew
}: StepProps) {

    const [{isDragging}, drag] = useDrag(() => ({
        type: DragTypes.SCENARIO_STEP,
        item: { 
            type: DragTypes.SCENARIO_STEP,
            id: step.id || ""
        },
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
    }))
    
    return (
        <Flex
            ref={drag}
            direction="row"
            justify="space-between"
            _hover={{ 
                backgroundColor: "brand.400"
            }}
            // animation={isNew ? `${highlightAnimation} 1s` : undefined}
        >
            <Flex direction="row" align="center">
                <Box cursor={"grab"}>
                    <FaGripVertical /> 
                </Box>
                <Box pl={4}>
                    
                    {step && scenario && stepTokenOptions && stepTemplate ? (
                        <StepInput
                            step={step}
                            scenario={scenario}
                            stepTokenOptions={stepTokenOptions}
                            stepTemplate={stepTemplate}
                            onTokenValueChange={onTokenValueChange}
                        />
                    ) : (
                        <Text>Loading...</Text>
                    )}
                    </Box>
            </Flex>
            
            <Box
                cursor={"pointer"}
                onClick={() => onDelete(step.id)}
            >
                <FaTrash /> 
            </Box>
            
        </Flex>
    )
}