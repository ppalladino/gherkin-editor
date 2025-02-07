'use client'

import React, { useState } from "react";
import { ScenarioStep, StepTemplate, ScenarioStepTokenValue, StepToken, StepTokenOption } from "@/_types";
import { Flex } from "@chakra-ui/react";
import { findByKey, findScenarioStepTokenValue } from "@/_lib/utils";
import TokenSelectInput from "./TokenSelectInput";
import TokenTextInput from "./TokenTextInput";
import { getTemplateSegments } from "@/_lib/stepTemplate";

interface StepEditorProps {
    step: ScenarioStep;
    stepTokens: StepToken[], 
    stepTokenOptions: StepTokenOption[], 
    scenarioStepTokenValues: ScenarioStepTokenValue[];
    stepTemplate: StepTemplate;
    onTokenValueChange: (scenarioStepId: string, tokenKey: string, tokenValue: string) => void
}

export default function StepEditor({
    step,
    scenarioStepTokenValues,
    stepTemplate,
    stepTokens,
    stepTokenOptions,
    onTokenValueChange
}: StepEditorProps) {
    const templateSegments = getTemplateSegments(stepTemplate);

    const rendered = templateSegments.map((templateSegment, index) => {
        
        if(!templateSegment.isTokenPlaceholder) {
            return <span key={index}>{templateSegment.segmentValue}</span>;
        } else {
            if(!templateSegment.tokenPlaceholder) {
                throw new Error("Token is undefined");
            }

            // const {id, inputType, tokenConstraint} = segment.token;

            const tokenValue = findScenarioStepTokenValue(scenarioStepTokenValues, step.id, templateSegment.tokenPlaceholder.id) ?? undefined;

            switch (templateSegment.tokenPlaceholder.inputType) {
                case "select":

                    const thisStepToken = findByKey(stepTokens, templateSegment.tokenPlaceholder.tokenConstraint) ?? undefined;

                    if (!thisStepToken) {
                        return <span key={index}>Token options with key"{templateSegment.tokenPlaceholder.tokenConstraint}" not found</span>;
                    }

                    const thisStepTokenOptions = stepTokenOptions.filter((o) => (o.stepTokenId === thisStepToken.id))

                    return <TokenSelectInput 
                        key={index} 
                        tokenKey={templateSegment.tokenPlaceholder.id} 
                        tokenOptions={thisStepTokenOptions} 
                        selectedTokenOption={tokenValue} 
                        scenarioStepId={step.id}
                        onSelectedOptionChange={onTokenValueChange} 
                    />;
                case "text":
                    return <TokenTextInput
                        key={index} 
                        tokenKey={templateSegment.tokenPlaceholder.id} 
                        tokenValueConstraint={templateSegment.tokenPlaceholder.tokenConstraint}
                        tokenValue={tokenValue}
                        scenarioStepId={step.id}
                        onTokenValueChange={onTokenValueChange} 
                    />
                default:
                    return <span key={index}>token key: {templateSegment.tokenPlaceholder.id}, input type: {templateSegment.tokenPlaceholder.inputType}, token constraint: {templateSegment.tokenPlaceholder.tokenConstraint}</span>;
            }
        }
    })

    return (<Flex direction={"row"} gap="8px">{rendered}</Flex>);
}