'use client'

import React, { useState } from "react";
import TokenSelect from "./token-select";
import TokenText from "./token-text";

export interface StepTokenOptions {
    id: string;
    key: string;
    options: string[];
}

export interface StepTemplate {
    id: string;
    template: string;
}

export interface FeatureStep {
    id: string;
    stepTemplateId: string;
}

export interface FeatureStepTokenValue {
    stepId: string;
    tokenKey: string;
    tokenValue: string;
}

export interface Feature {
    id: string;
    title: string;
    steps: FeatureStep[];
    stepTokenValues: FeatureStepTokenValue[];
}

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

// Note: token key must be unique per set template, example the there can be only one "name" (as in [name:free-text:string]) token per step template
const stepTemplates: StepTemplate[] = [
    {id: "stepTemplate1", template: "GIVEN I am a [role:select:roles]"},
    {id: "stepTemplate2", template: "[action:select:step-actions] I navigate to [route:select:routes]"},
    {id: "stepTemplate3", template: "[action:select:step-actions] I input [name:text:string] into the [ui-id:select:component-ids] field"},
    {id: "stepTemplate4", template: "[action:select:step-actions] I click [ui-id:select:component-ids] button"},
    {id: "stepTemplate5", template: "[action:select:step-actions] I wait [wait-time:text:number] seconds"},
    {id: "stepTemplate6", template: "[action:select:step-outcomes] I see [ui-id:select:component-ids] component"},
]

function findById<T extends { id: string }>(list: T[], id: string): T | undefined {
    return list.find(item => item.id === id);
}

function findByKey<T extends { key: string }>(list: T[], key: string): T | undefined {
    return list.find(item => item.key === key);
}

function findFeatureStepTokenValue(stepTokenValues: FeatureStepTokenValue[], stepId: string, tokenKey: string): string | undefined {
    return stepTokenValues.find(item => item.stepId === stepId && item.tokenKey === tokenKey)?.tokenValue;
}

let sampleFeature: Feature = {
    id: "sampleFeature1",
    title: "Sample Feature 1",
    stepTokenValues: [
        {stepId: "step1", tokenKey: "role", tokenValue: "EDITOR"}
    ],
    steps: [
        {id: "step1", stepTemplateId: "stepTemplate1"},
        {id: "step2", stepTemplateId: "stepTemplate2"},
        {id: "step3", stepTemplateId: "stepTemplate3"},
        {id: "step4", stepTemplateId: "stepTemplate4"},
        {id: "step5", stepTemplateId: "stepTemplate5"},
        {id: "step6", stepTemplateId: "stepTemplate6"},
    ]
}

export default function FeatureEditor() {

    const [feature, setFeature] = useState<Feature>(sampleFeature);

    const handleTokenValueChange = (
        featureTemplateStepId: string,
        tokenId: string,
        tokenValue: string
      ) => {
        // Use a functional state update if you're storing `sampleFeature` in React state:
        setFeature((prevFeature) => {
          // Clone the array (for immutability)
          const updatedStepTokenValues = [...prevFeature.stepTokenValues];
      
          // Find index of existing entry
          const existingIndex = updatedStepTokenValues.findIndex(
            (item) =>
              item.stepId === featureTemplateStepId &&
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
              stepId: featureTemplateStepId,
              tokenKey: tokenId,
              tokenValue: tokenValue,
            });
          }
      
          return {
            ...prevFeature,
            stepTokenValues: updatedStepTokenValues,
          };
        });
      };

    const renderStep = (
        step: FeatureStep, 
        stepTokenOptions: StepTokenOptions[], 
        feature: Feature
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
                const tokenValue = findFeatureStepTokenValue(feature.stepTokenValues, step.id, tokenKey) ?? undefined;

                switch (inputType) {
                    case "select":
                        const options = findByKey(stepTokenOptions, tokenConstraint)?.options ?? undefined;

                        if (!options) {
                            return <span key={index}>Token options with key"{tokenConstraint}" not found</span>;
                        }

                        return <TokenSelect 
                            key={index} 
                            tokenKey={tokenKey} 
                            tokenOptions={options} 
                            selectedTokenOption={tokenValue} 
                            featureStepId={step.id}
                            onSelectedOptionChange={handleTokenValueChange} 
                        />;
                    case "text":
                        return <TokenText
                            key={index} 
                            tokenKey={tokenKey} 
                            tokenValueConstraint={tokenConstraint}
                            tokenValue={tokenValue}
                            featureStepId={step.id}
                            onTokenValueChange={handleTokenValueChange} 
                        />
                    default:
                        return <span key={index}>token key: {tokenKey}, input type: {inputType}, token constraint: {tokenConstraint}</span>;
                }
            }
          });
        
          return <div>{rendered}</div>;
    }

    const renderFeature = (feature: Feature ) => {
        return feature.steps.reduce<JSX.Element[]>((acc, step) => {
          acc.push(
            <React.Fragment key={step.id}>
              {renderStep(step, stepTokenOptions, feature)}<br />
            </React.Fragment>
          );
          return acc;
        }, []);
    };

    return (
        <div>
            <h2>Feature Editor</h2>
            {renderFeature(feature)} 
        </div>
    )
}