'use client'

import React, { useState, useEffect} from "react";
import { StepTemplate, ScenarioStep, DragTypes, StepTokenOption, Scenario, StepToken, ScenarioStepTokenValue } from "@/_types";
import { Text, Flex, Box } from "@chakra-ui/react";
import { useDrag } from 'react-dnd'
import { FaGripVertical, FaTrash } from 'react-icons/fa';
import StepEditor from "./StepEditor";

interface DraggableStepEditorProps {
    scenarioStepTokenValues: ScenarioStepTokenValue[];
    step: ScenarioStep;
    stepTemplate: StepTemplate | undefined;
    stepTokens: StepToken[];
    stepTokenOptions: StepTokenOption[];
    onTokenValueChange: (scenarioStepId: string, tokenKey: string, tokenValue: string) => void;
    onStepDropped: () => void
}

export default function DraggableStepEditor({
    scenarioStepTokenValues,
    step,
    stepTemplate,
    stepTokens,
    stepTokenOptions,
    onTokenValueChange,
    onStepDropped,
}: DraggableStepEditorProps) {

    const [updatedScenarioStepTokenValues, setUpdatedScenarioStepTokenValues] = useState<ScenarioStepTokenValue[]>(scenarioStepTokenValues)
    const [updatedStep, setUpdatedStep] = useState<ScenarioStep>(step)

    useEffect(() => {
        setUpdatedScenarioStepTokenValues(scenarioStepTokenValues)
    }, [scenarioStepTokenValues]);

    useEffect(() => {
        setUpdatedStep(step)
    }, [step]);

    const [{isDragging}, drag] = useDrag(() => ({
        type: DragTypes.STEP_EDITOR,
        item: { 
            type: DragTypes.STEP_EDITOR,
            step: updatedStep,
            scenarioStepTokenValues: updatedScenarioStepTokenValues
        },
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
        end: (item, monitor) => {
            if (monitor.didDrop()) {
                onStepDropped()
            } 
          },
    }), [updatedStep, updatedScenarioStepTokenValues])
    
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
                            step={updatedStep}
                            scenarioStepTokenValues={updatedScenarioStepTokenValues}
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
        </Flex>
    )
}