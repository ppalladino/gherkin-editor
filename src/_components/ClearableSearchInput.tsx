import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { Input, Box, BoxProps } from "@chakra-ui/react"
import { InputGroup } from "@/components/ui/input-group"
import { FaSearch, FaTimesCircle } from "react-icons/fa"

interface ClearableSearchInputProps extends BoxProps {
    value: string,
    onInputChange: (value: string) => void;
    onEnter?: (value: string) => void;
    onTab?: (value: string) => void;
    debounceMilliseconds?: number;
    placeholder?: string;
    placeholderIcon?: React.ReactNode;
}

export default function ClearableSearchInput({
    value,
    onInputChange,  
    onEnter,
    onTab,
    debounceMilliseconds = 300,
    placeholder = "Search...",
    placeholderIcon = <FaSearch />,
    ...rest
}: ClearableSearchInputProps) {

    const [searchTerm, setSearchTerm] = useState(value);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Cleanup the timer if the component unmounts
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        setSearchTerm(value)
    }, [value]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
    
        // clear any previous timer
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        // set a new timer
        timerRef.current = setTimeout(() => {
            onInputChange(value);
        }, debounceMilliseconds);
      };

    const handleClear = () => {
        setSearchTerm("");
        // clear any pending timer
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        // call onChange immediately for an empty string
        onInputChange("");
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (onEnter && e.key === "Enter") {
            onEnter(searchTerm);
            setSearchTerm("")
        } 
    };
  
    return (
        <Box {...rest}>
            <InputGroup
                w="100%" 
                endElement={
                    <Box
                        as="button"
                        cursor="pointer"
                        color="grey"
                        _hover={{ color: "brand.500" }}
                        onClick={() => handleClear()}
                    >
                        <FaTimesCircle />
                    </Box>
                }
            >
                <Input 
                    _focus={{
                        focusRingColor: "brand.highlight"
                    }}
                    placeholder={placeholder} 
                    _placeholder={{ color: "brand.600" }}
                    backgroundColor={"brand.100"}
                    color={"brand.900"}
                    value={searchTerm}
                    onChange={handleChange} 
                    onKeyDown={handleKeyDown}
                />
            </InputGroup>
        </Box>
    ) 
}