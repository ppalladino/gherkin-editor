"use client"; 

import React, { useState } from "react";
import { Box, Textarea, Stack, Flex, FlexProps, Heading } from "@chakra-ui/react";
import { Button } from "@/components/ui/button"
import { FaTimesCircle } from "react-icons/fa";
import { StepTemplate } from "@/_types";
import { findClosestMatchingStepTemplate } from "@/_lib/stepTemplate";
import StepTemplateBank from "./StepTemplateBank";

interface ConvertTextToStepsProps extends FlexProps {
    stepTemplates: StepTemplate[];
    onAppendSuggestions: (suggestedStepTemplates: StepTemplate[]) => void;
}

export default function ConvertTextToSteps({
    stepTemplates,
    onAppendSuggestions,
    ...rest
}: ConvertTextToStepsProps) {

    const [content, setContent] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [suggestedStepTemplates, setSuggestedStepTemplates] = useState([] as StepTemplate[]);

    const handleSuggestSteps = async () => {
        setShowLoader(true);
        const lines = content.split(/\r?\n/);

        let matchingStepTemplates: StepTemplate[] = [];

        for (const [index, line] of lines.entries()) {
            console.log(`Line ${index + 1}: ${line}`);
            try {
                const closestMatchingStepTemplate = await findClosestMatchingStepTemplate(line, stepTemplates);
                if (closestMatchingStepTemplate){
                    matchingStepTemplates.push(closestMatchingStepTemplate);
                }
                // Handle the result as needed
                console.log(`Closest Match for Line ${index + 1}:`, closestMatchingStepTemplate?.title);
            } catch (error) {
                console.error(`Error processing line ${index + 1}:`, error);
            }
        }
        setSuggestedStepTemplates(matchingStepTemplates)
        setShowLoader(false);
    };

    return (
        <Flex {...rest} flex="1" direction="column">
            <Box
                aria-label="Clear text"
                position="absolute"
                zIndex={2}
                top="63px"
                right="8px"
                onClick={() => {setContent(""); setSuggestedStepTemplates([]);}}
                color="brand.500"
                _hover={{ color: "brand.300" }}
            >
                <FaTimesCircle />
            </Box>
            <Textarea
                zIndex={1}
                autoresize
                backgroundColor={"brand.100"}
                color={"brand.500"}
                placeholder="Enter your text here..."
                size="md"
                resize="vertical" // or "horizontal", "none"
                // variant="outline" // variants: "outline", "filled", "flushed", "unstyled"
                value={content}
                minHeight={120}
                onChange={(e) => setContent(e.target.value)}
            />
            <Stack mt={3} direction="row" gap="4" align="center" justify={"end"}>
                { 
                    showLoader 
                    ? <Button loading>Convert</Button> 
                    : <Button disabled={content.trim() == ""} onClick={handleSuggestSteps}>Suggest Steps</Button> }
                { 
                    suggestedStepTemplates.length > 0 
                    ? <Button onClick={() => onAppendSuggestions(suggestedStepTemplates)}>Append Suggestions</Button> 
                    : <Button disabled>Append Suggestions</Button>  
                }
                {/* <Button onClick={() => {setContent(""); setSuggestedStepTemplates([]);}}>Clear</Button>  */}
            </Stack>
            <Heading size="md" mt={5}>Suggested Steps</Heading>
            <StepTemplateBank mt={5} stepTemplates={suggestedStepTemplates} flex="1"/>
        </Flex>
    )
}