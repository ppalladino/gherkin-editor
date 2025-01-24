"use client"

import { Text } from "@chakra-ui/react"

import {
    PopoverBody,
    PopoverContent,
    PopoverRoot,
    PopoverTrigger,
} from "@/components/ui/popover"

interface TokenTextInputProps {
    tokenKey: string;
    tokenValueConstraint: string; // TEXT | NUMBER
    onTokenValueChange: (featureTemplateStepId: string, tokenKey: string, value: string) => void;
    tokenValue?: string;
    scenarioStepId: string;
}

export default function TokenTextInput({ 
    tokenKey,
    tokenValueConstraint, 
    onTokenValueChange, 
    scenarioStepId,
    tokenValue 
}: TokenTextInputProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onTokenValueChange(scenarioStepId, tokenKey, e.target.value);
    };

    // return (
    //     <input
    //         type={tokenValueConstraint}
    //         value={tokenValue ?? ""}
    //         onChange={handleChange}
    //         placeholder={`Enter a ${tokenValueConstraint}...`}
    //         style={{ marginRight: "8px" }}
    // />
    // );

    return (
<PopoverRoot

        >
            <PopoverTrigger 
                asChild
                _hover={{
                    cursor: "pointer",
                }}
            >
                <Text color={tokenValue ? "brand.highlight" : "brand.alert"}>
                    {tokenValue ? '"' + tokenValue + '"' : '"Null"'}
                </Text>
            </PopoverTrigger>

            <PopoverContent
                backgroundColor={"brand.400"}
            >
                <PopoverBody>
                <input
            type={tokenValueConstraint}
            value={tokenValue ?? ""}
            onChange={handleChange}
            placeholder={`Enter a ${tokenValueConstraint}...`}
            style={{ marginRight: "8px" }}
    />
                </PopoverBody>
            </PopoverContent>
        </PopoverRoot>
    );
}