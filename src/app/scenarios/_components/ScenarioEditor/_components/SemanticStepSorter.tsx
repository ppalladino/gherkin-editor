"use client"
import { useState } from "react";
import { FlexProps, Flex, Text, Box } from "@chakra-ui/react";
import { StepTemplate } from "@/_types";
import ClearableSearchInput from "@/_components/ClearableSearchInput";
// import StepTemplateBank from "./StepTemplateBank";
import StepTemplateDraggableCard from "./StepTemplateDraggableCard";
import StepTemplateDraggableCardList from "./StepTemplateDraggableCardList";
import { orderByBestMatchingStepTemplates } from "@/_lib/stepTemplate";
import { PiTargetBold } from "react-icons/pi";

interface SemanticStepSorterProps extends FlexProps {
    stepTemplates: StepTemplate[];
}

export default function SemanticStepSorter({
    stepTemplates,
    ...rest
}: SemanticStepSorterProps) {

    const [sortedStepTemplates, setSortedStepTemplates] = useState<StepTemplate[]>([]);

    const handleFilter = async (value: string) => {
        if (!value || value === "") {
            setSortedStepTemplates([]);
          return;
        }
      
        try {
            const orderedByBestMatchStepTempaltes = await orderByBestMatchingStepTemplates(value, stepTemplates);
            setSortedStepTemplates(orderedByBestMatchStepTempaltes);
        } catch (error) {
          console.error("Error finding closest matching step template:", error);
        }
    };
    
    return (
        <Flex flex="1" direction="column" {...rest}>
            <ClearableSearchInput 
                onInputChange={(value) => {handleFilter(value)}}  
                onEnter={(value) => {console.log("Enter clicked: ", value)}}
                placeholder="Enter Semantic Target...."
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