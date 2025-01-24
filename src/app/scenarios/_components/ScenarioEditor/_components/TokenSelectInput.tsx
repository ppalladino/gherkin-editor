"use client"
import { useState } from "react";
import { Text } from "@chakra-ui/react";
import { StepTokenOptions } from "@/_types";

import {
    PopoverBody,
    PopoverContent,
    PopoverRoot,
    PopoverTrigger,
} from "@/components/ui/popover"

interface TokenSelectInputProps {
    tokenKey: string;
    tokenOptions: StepTokenOptions;
    onSelectedOptionChange: (featureTemplateStepId: string, tokenKey: string, option: string) => void;
    scenarioStepId: string;
    selectedTokenOption?: string;
  }

export default function TokenSelectInput({ 
    tokenKey,
    tokenOptions, 
    selectedTokenOption, 
    scenarioStepId,
    onSelectedOptionChange 
}: TokenSelectInputProps) {
    const [open, setOpen] = useState(false);

    const handleChange = (value: string) => {
        onSelectedOptionChange(scenarioStepId, tokenKey, value);
        setOpen(false)
    };

    return (
        <PopoverRoot
            open={open} 
            onOpenChange={(details) => setOpen(details.open)}
            positioning={{ placement: "bottom-start" }}
        >
            <PopoverTrigger 
                asChild
                _hover={{
                    cursor: "pointer",
                }}
            >
                <Text color={selectedTokenOption ? "brand.highlight" : "brand.alert"}>
                    {selectedTokenOption ? selectedTokenOption : "Null"}
                </Text>
            </PopoverTrigger>

            <PopoverContent
                backgroundColor={"brand.400"}
            >
                <PopoverBody>
                    {tokenOptions.options.map((option) => (
                        <Text 
                            key={option.value}
                            onClick={() => {handleChange(option.value)}}
                            cursor={"pointer"}
                            _hover={{
                                color: "brand.highlight"
                            }}
                        >{option.value}</Text>   
                    ))}
                </PopoverBody>
            </PopoverContent>
        </PopoverRoot>
    )
}