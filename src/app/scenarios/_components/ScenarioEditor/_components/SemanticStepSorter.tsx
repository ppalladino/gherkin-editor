"use client"
import { useState } from "react";
import { FlexProps, Flex, Text, Box } from "@chakra-ui/react";
import { StepTemplate } from "@/_types";
import ClearableSearchInput from "@/_components/ClearableSearchInput";
// import StepTemplateBank from "./StepTemplateBank";
import StepTemplateDraggableCard from "./StepTemplateDraggableCard";
import StepTemplateDraggableCardList from "./StepTemplateDraggableCardList";
import { orderByBestMatchingStepTemplates } from "@/_lib/stepTemplate";
import { getTextEmbedding } from "@/_lib/textEmbedding"
import { PiTargetBold } from "react-icons/pi";

interface SemanticStepSorterProps extends FlexProps {
    stepTemplates: StepTemplate[];
    onEnterClicked?: (topStepTemplate: StepTemplate, userInputValue: string, userInputTextEmbedding: number[]) => void;
}

export default function SemanticStepSorter({
    stepTemplates,
    onEnterClicked,
    ...rest
}: SemanticStepSorterProps) {

    const [sortedStepTemplates, setSortedStepTemplates] = useState<StepTemplate[]>([]);
    const [userInputTextEmbedding, setUserInputTextEmbedding] = useState<number[]>([]);


    const handleFilter = async (value: string) => {
        if (!value || value === "") {
            setSortedStepTemplates([]);
            setUserInputTextEmbedding([])
          return;
        }
      
        try {
            const valueTextEmbedding = await getTextEmbedding(value);
            const orderedByBestMatchStepTempaltes = orderByBestMatchingStepTemplates(valueTextEmbedding, stepTemplates);
            setUserInputTextEmbedding(valueTextEmbedding)
            setSortedStepTemplates(orderedByBestMatchStepTempaltes);
        } catch (error) {
          console.error("Error finding closest matching step template:", error);
        }
    };

    const handleEnterClicked = (userInputValue: string) => {
        if(onEnterClicked && sortedStepTemplates.length > 0) {
            onEnterClicked(sortedStepTemplates[0], userInputValue, userInputTextEmbedding)
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
            <StepTemplateDraggableCardList flex="1">
                {
                    sortedStepTemplates.length > 0 
                    ? sortedStepTemplates.map((stepTemplate, index) => (
                        index === 0 
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