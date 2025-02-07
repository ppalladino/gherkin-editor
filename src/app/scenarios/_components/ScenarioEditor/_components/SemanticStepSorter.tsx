"use client"
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FlexProps, Flex, Text, Box } from "@chakra-ui/react";
import { PiTargetBold } from "react-icons/pi";
import { StepTemplate, StepToken, StepTokenOption, ScenarioStepTokenValue, ScenarioStep } from "@/_types";
import ClearableSearchInput from "@/_components/ClearableSearchInput";
import DraggableStepEditor from './DraggableStepEditor'
import StepTemplateDraggableCard from "./StepTemplateDraggableCard";
import StepTemplateDraggableCardList from "./StepTemplateDraggableCardList";
import { orderByBestMatchingStepTemplates, findClosestMatchingStepTokenOptions, updateScenarioStepTokenValues } from "@/_lib/stepTemplate";
import { getTextEmbedding } from "@/_lib/textEmbedding"

interface SemanticStepSorterProps extends FlexProps {
    stepTemplates: StepTemplate[];
    stepTokens: StepToken[];
    stepTokenOptions: StepTokenOption[];
    onEnterClicked?: (
        bestMatchStep: ScenarioStep,
        bestMatchScenarioStepTokenValues: ScenarioStepTokenValue[],
    ) => void;
}

export default function SemanticStepSorter({
    stepTemplates,
    stepTokens,
    stepTokenOptions,
    onEnterClicked,
    ...rest
}: SemanticStepSorterProps) {

    const [sortedStepTemplates, setSortedStepTemplates] = useState<StepTemplate[]>([]);
    const [userInputTextEmbedding, setUserInputTextEmbedding] = useState<number[]>([]);

    const [bestMatch, setBestMatch] = useState<{
        step: ScenarioStep;
        scenarioStepTokenValues: ScenarioStepTokenValue[];
        stepTemplate: StepTemplate;
    } | null>(null);

    const handleFilter = async (userInputValue: string) => {
        if (!userInputValue || userInputValue === "") {
            setSortedStepTemplates([]);
            setUserInputTextEmbedding([])
            setBestMatch(null)
            return;
        }
      
        try {
            const userInputTextEmbedding = await getTextEmbedding(userInputValue);
            const orderedByBestMatchStepTempaltes = orderByBestMatchingStepTemplates(userInputTextEmbedding, stepTemplates);
            setUserInputTextEmbedding(userInputTextEmbedding)
            setSortedStepTemplates(orderedByBestMatchStepTempaltes);

            const bestMatchStepId = uuidv4()
            const bestMatchStepTemplate = orderedByBestMatchStepTempaltes[0]
            const bestMatchScenarioStepTokenValues = findClosestMatchingStepTokenOptions(
                userInputValue,
                userInputTextEmbedding,
                bestMatchStepTemplate,
                stepTokens,
                stepTokenOptions
            ).map((bm) => ({
                stepId: bestMatchStepId,
                stepTokenKey: bm.stepTemplateTokenPlaceholderId,
                tokenValue: bm.bestOption?.value
            }))

            setBestMatch({
                step: {id: bestMatchStepId, stepTemplateId: bestMatchStepTemplate.id},
                scenarioStepTokenValues: bestMatchScenarioStepTokenValues,
                stepTemplate: bestMatchStepTemplate
            })
        } catch (error) {
          console.error("Error finding closest matching step template:", error);
        }
    };

    const handleEnterClicked = (userInputValue: string) => {
        if(onEnterClicked && bestMatch) {
            setBestMatch(null)
            onEnterClicked(
                bestMatch.step,
                bestMatch.scenarioStepTokenValues,
            )
        }
    }
    
    return (
        <Flex flex="1" direction="column" {...rest}>
            <ClearableSearchInput 
                onInputChange={(value) => {handleFilter(value)}}  
                onEnter={(userInputValue) => {handleEnterClicked(userInputValue)}}
                placeholder="Enter a step in your own words...."
                mb={5}
                placeholderIcon={<PiTargetBold />}
            />
            <Text color={"brand.200"} mb={5}>AI Suggested Step:</Text>
            <Flex 
                flex="1" 
                padding={5} 
                mb={25} 
                minHeight={75} 
                backgroundColor={"brand.600"} 
                borderRadius={6}
                justifyContent={"flex-start"}
                alignItems={"center"}
            >
            {/* {   !bestMatch &&
                <Text color={"brand.400"}>AI Suggested Step</Text>
            } */}
            {   bestMatch &&
                
                    <DraggableStepEditor 
                        step = {bestMatch.step}
                        stepTokens = {stepTokens}
                        stepTokenOptions = {stepTokenOptions}
                        scenarioStepTokenValues = {bestMatch.scenarioStepTokenValues}
                        stepTemplate = {bestMatch.stepTemplate}
                        onTokenValueChange = {(scenarioStepId, tokenKey, tokenValue) => {
                            setBestMatch((prevBestMatch) => {
                                if(!prevBestMatch) {
                                    console.log("prevBestMatch is null, it shouldn't be ")
                                    return prevBestMatch
                                }
                                const scenarioStepTokenValues = updateScenarioStepTokenValues(prevBestMatch.scenarioStepTokenValues, {
                                    stepId: scenarioStepId,
                                    stepTokenKey: tokenKey,
                                    tokenValue: tokenValue
                                })
                                return {
                                    ...bestMatch,
                                    scenarioStepTokenValues
                                }
                            })
                        }}
                    />
                    
                }
            </Flex>
            <Text color={"brand.200"} mb={5}>AI Suggested Step Templates:</Text>
            <StepTemplateDraggableCardList flex="1" height={"450px"}>
                {
                    sortedStepTemplates.length > 0 
                    ? sortedStepTemplates.map((stepTemplate, index) => (
                        false //index === 0 
                        ?   <StepTemplateDraggableCard
                                animation="bounce"
                                key={stepTemplate.id || index}
                                stepTemplate={stepTemplate}
                            />
                       
                        :   <StepTemplateDraggableCard
                                key={stepTemplate.id || index}
                                stepTemplate={stepTemplate}
                            />
                    ))
                    : stepTemplates.map((stepTemplate, index) => (
                        <StepTemplateDraggableCard
                            key={stepTemplate.id || index}
                            stepTemplate={stepTemplate}
                        />
                    ))
                }
            </StepTemplateDraggableCardList>
        </Flex>
    )
}