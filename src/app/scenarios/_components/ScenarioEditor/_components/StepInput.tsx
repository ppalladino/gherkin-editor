'use client'

import React, { useState } from "react";
import { ScenarioStep, StepTemplate, ScenarioStepTokenValue, StepToken, StepTokenOption } from "@/_types";
import { Flex } from "@chakra-ui/react";
import { findByKey, findScenarioStepTokenValue } from "@/_lib/utils";
import TokenSelectInput from "./TokenSelectInput";
import TokenTextInput from "./TokenTextInput";
import { getTemplateSegments } from "@/_lib/stepTemplate";

interface StepInputProps {
    step: ScenarioStep;
    stepTokens: StepToken[], 
    stepTokenOptions: StepTokenOption[], 
    scenarioStepTokenValues: ScenarioStepTokenValue[];
    stepTemplate: StepTemplate;
    onTokenValueChange: (scenarioStepId: string, tokenKey: string, tokenValue: string) => void
}

export default function StepInput({
    step,
    scenarioStepTokenValues,
    stepTemplate,
    stepTokens,
    stepTokenOptions,
    onTokenValueChange
}: StepInputProps) {
    // return (renderStep(scenario, step, stepTemplate, stepTokens, stepTokenOptions, onTokenValueChange));
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

            const tokenValue = findScenarioStepTokenValue(scenarioStepTokenValues, step.id, tokenKey) ?? undefined;


            // console.log("!!! Rendering select -  inputType: ", inputType)

            switch (inputType) {
                case "select":

                    const thisStepToken = findByKey(stepTokens, tokenConstraint) ?? undefined;

                    if (!thisStepToken) {
                        return <span key={index}>Token options with key"{tokenConstraint}" not found</span>;
                    }

                    const thisStepTokenOptions = stepTokenOptions.filter((o) => (o.stepTokenId === thisStepToken.id))

                    return <TokenSelectInput 
                        key={index} 
                        tokenKey={tokenKey} 
                        tokenOptions={thisStepTokenOptions} 
                        selectedTokenOption={tokenValue} 
                        scenarioStepId={step.id}
                        onSelectedOptionChange={onTokenValueChange} 
                    />;
                case "text":
                    return <TokenTextInput
                        key={index} 
                        tokenKey={tokenKey} 
                        tokenValueConstraint={tokenConstraint}
                        tokenValue={tokenValue}
                        scenarioStepId={step.id}
                        onTokenValueChange={onTokenValueChange} 
                    />
                default:
                    return <span key={index}>token key: {tokenKey}, input type: {inputType}, token constraint: {tokenConstraint}</span>;
            }
        }
    })

    return (<Flex direction={"row"} gap="8px">{rendered}</Flex>);
}