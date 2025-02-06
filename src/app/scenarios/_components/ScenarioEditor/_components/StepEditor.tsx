'use client'

import React from "react";
import { StepTemplate, ScenarioStep, DragTypes, StepTokenOption, Scenario, StepToken } from "@/_types";
import { Text, Flex, Box } from "@chakra-ui/react";
import { useDrag } from 'react-dnd'
import { FaGripVertical, FaTrash } from 'react-icons/fa';
import StepInput from "./StepInput";

interface StepEditorProps {
    scenario: Scenario;
    step: ScenarioStep;
    stepTemplate: StepTemplate | undefined;
    stepTokens: StepToken[];
    stepTokenOptions: StepTokenOption[];
    onDelete: (stepId: string) => void;
    onTokenValueChange: (scenarioStepId: string, tokenKey: string, tokenValue: string) => void;
}

export default function StepEditor({
    scenario,
    step,
    stepTemplate,
    stepTokens,
    stepTokenOptions,
    onDelete,
    onTokenValueChange,
}: StepEditorProps) {

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
                    
                    {step && scenario && stepTokens && stepTokenOptions && stepTemplate ? (
                        <StepInput
                            step={step}
                            scenarioStepTokenValues={scenario.stepTokenValues}
                            stepTemplate={stepTemplate}
                            stepTokens={stepTokens}
                            stepTokenOptions={stepTokenOptions}
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