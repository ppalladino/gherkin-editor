'use client'

import React, { useState } from "react";
import TokenSelectInput from "../../../../_components/TokenSelectInput";
import TokenTextInput from "../../../../_components/TokenTextInput";
import { Scenario, ScenarioStep, ScenarioStepTokenValue, StepTemplate, StepTokenOptions } from "@/_types";
import { findById } from "@/_lib/utils";
import { Heading, Flex, Box, Text } from "@chakra-ui/react";

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

    const handleTokenValueChange = (
        scenarioTemplateStepId: string,
        tokenId: string,
        tokenValue: string
      ) => {
        // Use a functional state update if you're storing `sampleFeature` in React state:
        setScenario((prevScenario) => {
          // Clone the array (for immutability)
          const updatedStepTokenValues = [...prevScenario.stepTokenValues];
      
          // Find index of existing entry
          const existingIndex = updatedStepTokenValues.findIndex(
            (item) =>
              item.stepId === scenarioTemplateStepId &&
              item.tokenKey === tokenId
          );
      
          if (existingIndex > -1) {
            // Update the existing entry
            updatedStepTokenValues[existingIndex] = {
              ...updatedStepTokenValues[existingIndex],
              tokenValue: tokenValue,
            };
          } else {
            // Add a new entry
            updatedStepTokenValues.push({
              stepId: scenarioTemplateStepId,
              tokenKey: tokenId,
              tokenValue: tokenValue,
            });
          }
      
          return {
            ...prevScenario,
            stepTokenValues: updatedStepTokenValues,
          };
        });
      };

    const renderStep = (
        step: ScenarioStep, 
        stepTokenOptions: StepTokenOptions[], 
        scenario: Scenario
    ) => {
        const stepTemplate = findById(stepTemplates, step.stepTemplateId);

        if (!stepTemplate) {
            return <span>Step template "{step.stepTemplateId}" not found</span>;
        }
        
        const tokenRegex = /\[([^\]]+)\]/g;

        const segments = stepTemplate.template.split(tokenRegex);

        const rendered = segments.map((segment, index) => {
            const isToken = index % 2 === 1; // odd index => token
        
            if (!isToken) {
                // Just return the raw text as-is
                return <span key={index}>{segment}</span>;
            } else {
                const [tokenKey, inputType, tokenConstraint] = segment.split(":");
                const tokenValue = findScenarioStepTokenValue(scenario.stepTokenValues, step.id, tokenKey) ?? undefined;

                switch (inputType) {
                    case "select":
                        const options = findByKey(stepTokenOptions, tokenConstraint)?.options ?? undefined;

                        if (!options) {
                            return <span key={index}>Token options with key"{tokenConstraint}" not found</span>;
                        }

                        return <TokenSelectInput 
                            key={index} 
                            tokenKey={tokenKey} 
                            tokenOptions={options} 
                            selectedTokenOption={tokenValue} 
                            scenarioStepId={step.id}
                            onSelectedOptionChange={handleTokenValueChange} 
                        />;
                    case "text":
                        return <TokenTextInput
                            key={index} 
                            tokenKey={tokenKey} 
                            tokenValueConstraint={tokenConstraint}
                            tokenValue={tokenValue}
                            scenarioStepId={step.id}
                            onTokenValueChange={handleTokenValueChange} 
                        />
                    default:
                        return <span key={index}>token key: {tokenKey}, input type: {inputType}, token constraint: {tokenConstraint}</span>;
                }
            }
          });
        
          return <div>{rendered}</div>;
    }

    const renderScenario = (scenario: Scenario ) => {
        return scenario.steps.reduce<JSX.Element[]>((acc, step) => {
          acc.push(
            <React.Fragment key={step.id}>
              {renderStep(step, stepTokenOptions, scenario)}<br />
            </React.Fragment>
          );
          return acc;
        }, []);
    };

    return (
        <div>
            <Flex direction={{ base: 'column', md: 'row' }} minHeight="100vh">
                {/* Left Column */}
                <Box flex="1" p={4}>
                    <Text fontSize="xl" fontWeight="bold">Step Templates</Text>
                    {/* Add your content here */}
                </Box>

                {/* Right Column */}
                <Box flex="2" p={4}>
                    <Text fontSize="xl" fontWeight="bold">Scenario</Text>
                    {renderScenario(scenario)} 
                </Box>
            </Flex>
            
        </div>
    )
}