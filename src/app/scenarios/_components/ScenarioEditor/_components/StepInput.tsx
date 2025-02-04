'use client'

import React, { useState } from "react";
import { ScenarioStep, StepTokenOptions, StepTemplate, Scenario, StepTokenAggregate } from "@/_types";
import { Text, Flex } from "@chakra-ui/react";
import { findById, findByKey, findScenarioStepTokenValue } from "@/_lib/utils";
import TokenSelectInput from "./TokenSelectInput";
import TokenTextInput from "./TokenTextInput";
import { getTemplateSegments } from "@/_lib/stepTemplate";

const renderStep = (
    step: ScenarioStep, 
    stepTokenAggregate: StepTokenAggregate[], 
    scenario: Scenario,
    stepTemplate: StepTemplate,
    handleTokenValueChange: (scenarioStepId: string, tokenKey: string, tokenValue: string) => void
) => {

    const segments = getTemplateSegments(stepTemplate);

    // console.log("!!! Rendering Step Input renderStep()", {stepTemplate, segments})

    const rendered = segments.map((segment, index) => {
        
        if(!segment.isToken) {
            return <span key={index}>{segment.string}</span>;
        } else {
            if(!segment.token) {
                throw new Error("Token is undefined");
            }

            const {tokenKey, inputType, tokenConstraint} = segment.token;

            const tokenValue = findScenarioStepTokenValue(scenario.stepTokenValues, step.id, tokenKey) ?? undefined;


            // console.log("!!! Rendering select -  inputType: ", inputType)

            switch (inputType) {
                case "select":

                    const stepTokenAggregateItem = findByKey(stepTokenAggregate, tokenConstraint) ?? undefined;

                    if (!stepTokenAggregateItem) {
                        return <span key={index}>Token options with key"{tokenConstraint}" not found</span>;
                    }

                    return <TokenSelectInput 
                        key={index} 
                        tokenKey={tokenKey} 
                        tokenOptions={stepTokenAggregateItem.stepTokenOptions} 
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
    })

    return (<Flex direction={"row"} gap="8px">{rendered}</Flex>);
}

interface StepInputProps {
    step: ScenarioStep;
    stepTokenAggregate: StepTokenAggregate[], 
    scenario: Scenario;
    stepTemplate: StepTemplate;
    onTokenValueChange: (scenarioStepId: string, tokenKey: string, tokenValue: string) => void
}

export default function StepInput({
    step,
    stepTokenAggregate,
    scenario,
    stepTemplate,
    onTokenValueChange
}: StepInputProps) {
    
    return (renderStep(step, stepTokenAggregate, scenario, stepTemplate, onTokenValueChange));
}