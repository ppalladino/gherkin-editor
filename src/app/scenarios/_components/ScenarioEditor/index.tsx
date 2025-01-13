'use client'

import React, { useState } from "react";
import TokenSelectInput from "../../../../_components/TokenSelectInput";
import TokenTextInput from "../../../../_components/TokenTextInput";
import { Scenario, ScenarioStep, ScenarioStepTokenValue, StepTemplate, StepTokenOptions, DragTypes } from "@/_types";
import { findById } from "@/_lib/utils";
import { Heading, Flex, Box, Text } from "@chakra-ui/react";
import StepTemplateBank from "./StepTemplateBank";
import StepTemplateDropZone from "./StepDropZone";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { v4 as uuidv4 } from 'uuid';


const stepTokenOptions: StepTokenOptions[] = [
    {id: "stepTokenValues1", key: "roles", options: ["UNAUTHORIZED", "ADMIN", "EDITOR", "VIEWER"]},
    {id: "stepTokenValues2", key: "routes", options: ["HOME", "STANDARD_SEARCH", "CONTACT"]},
    {id: "stepTokenValues3", key: "step-conditions", options: ["GIVEN"]},
    {id: "stepTokenValues4", key: "step-actions", options: ["WHEN", "AND"]},
    {id: "stepTokenValues5", key: "step-outcomes", options: ["THEN", "AND"]},
    {id: "stepTokenValues6", key: "component-ids", options: [
        "STANDARD_SEARCH_VALUE",
        "STANDARD_SEARCH_SUBMIT",
        "STANDARD_SEARCH_RESULTS",
        "STANDARD_EDITOR_TITLE",
        "STANDARD_EDITOR_SUBTITLE"
      ]
    },
]

function findByKey<T extends { key: string }>(list: T[], key: string): T | undefined {
    return list.find(item => item.key === key);
}

function findScenarioStepTokenValue(stepTokenValues: ScenarioStepTokenValue[], stepId: string, tokenKey: string): string | undefined {
    return stepTokenValues.find(item => item.stepId === stepId && item.tokenKey === tokenKey)?.tokenValue;
}

interface ScenarioEditorProps {
  scenario: Scenario;
  stepTemplates: StepTemplate[];
}

export default function ScenarioEditor({scenario: _scenario, stepTemplates}: ScenarioEditorProps) {

    const [scenario, setScenario] = useState<Scenario>(_scenario);

    const handleDrop = (dropIndex: number, type: string, id: string) => {
        if (type === DragTypes.STEP_TEMPLATE) {
            const newSteps = [
                ...scenario.steps.slice(0, dropIndex),
                {id: uuidv4(), stepTemplateId: id},
                ...scenario.steps.slice(dropIndex)
            ];
            setScenario((prevScenario) => ({
                ...prevScenario,
                steps: newSteps,
            }));
        }
    }

    let dropIndex = 0;

    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <Flex direction={{ base: 'column', md: 'row' }} minHeight="100vh">
                    {/* Left Column */}
                    <Box flex="1" p={4}>
                        <Text fontSize="xl" fontWeight="bold">Step Templates</Text>
                        <StepTemplateBank stepTemplates={stepTemplates}/>
                    </Box>

                    {/* Right Column */}
                    <Box flex="2" p={4}>
                        <Text fontSize="xl" fontWeight="bold">Scenario</Text>
                        <StepTemplateDropZone 
                            dropIndex={dropIndex}
                            onDrop={handleDrop}
                        />
                        {
                            scenario.steps.map((step) => {
                                dropIndex++;
                                return (
                                    <React.Fragment key={step.id}>
                                        {step.stepTemplateId}<br />
                                        <StepTemplateDropZone 
                                            dropIndex={dropIndex}
                                            onDrop={handleDrop}
                                        />
                                    </React.Fragment>
                                )
                            })
                        }
                    </Box>   
                </Flex>
            </DndProvider>
        </div>
    )
}