'use client'

import React from "react";
import { StepTemplate, ScenarioStep, DragTypes, StepTokenOption, Scenario, StepToken, ScenarioStepTokenValue } from "@/_types";
import { Text, Flex, Box } from "@chakra-ui/react";
import { useDrag } from 'react-dnd'
import { FaGripVertical, FaTrash } from 'react-icons/fa';
import StepEditor from "./StepEditor";

interface DraggableScenarioStepEditorProps {
    scenarioStepTokenValues: ScenarioStepTokenValue[];
    step: ScenarioStep;
    stepTemplate: StepTemplate | undefined;
    stepTokens: StepToken[];
    stepTokenOptions: StepTokenOption[];
    onDelete: (stepId: string) => void;
    onTokenValueChange: (scenarioStepId: string, tokenKey: string, tokenValue: string) => void;
}

export default function DraggableScenarioStepEditor({
    scenarioStepTokenValues,
    step,
    stepTemplate,
    stepTokens,
    stepTokenOptions,
    onDelete,
    onTokenValueChange,
}: DraggableScenarioStepEditorProps) {

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
            // @ts-ignore - We know 'ref' is passed to chakra <div> even if TS complains
            ref={drag}
            direction="row"
            justify="space-between"
            _hover={{ 
                backgroundColor: "brand.400"
            }}
        >
            <Flex direction="row" align="center">
                <Box cursor={"grab"}>
                    <FaGripVertical /> 
                </Box>
                <Box pl={4}>
                    
                    {step && scenarioStepTokenValues && stepTokens && stepTokenOptions && stepTemplate ? (
                        <StepEditor
                            step={step}
                            scenarioStepTokenValues={scenarioStepTokenValues}
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