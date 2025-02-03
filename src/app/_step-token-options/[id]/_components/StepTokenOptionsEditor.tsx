"use client"

import { StepTokenOptions, TokenStatus } from "@/_types";
import { useState } from "react";
import { Flex, Heading, Input, Stack, Box, VStack, createListCollection, Link, Table, Text } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
  } from "@/components/ui/select"

interface StepTokenOptionsEditorProps {
    stepTokenOptions: StepTokenOptions;
    onSubmit: (stepTokenOptions: StepTokenOptions) => void;
    isUpdating: boolean
}

enum PropName {
    Key,
    Options
}

export default function StepTokenOptionsEditor({
    stepTokenOptions,
    onSubmit,
    isUpdating
}: StepTokenOptionsEditorProps) {

    const [editedModel, setEditedModel] = useState<StepTokenOptions>({...stepTokenOptions});

    const handleSubmit = () => {
        onSubmit(editedModel)
    }

    function handleChange<T>(propName: PropName, value: T) {
        switch (propName) {
            case PropName.Key:
                setEditedModel({
                    ...editedModel,
                    key: value as string
                })
                break;
            default:
                throw new Error(`Property name ${propName} is not supported.`)
        } 
    }

    const handleAddOption = () => {
        setEditedModel({
            ...editedModel,
            options: [{status: TokenStatus.DRAFT, value: ""}, ...editedModel.options]
        })
    }

    const handleDeleteOption = (index: number) => {
        setEditedModel({
            ...editedModel,
            options: editedModel.options.filter((_, i) => i !== index)
        })
    }

    const handleOptionValueChange = (index: number, value: string) => {
        setEditedModel({
            ...editedModel,
            options: editedModel.options.map((option, i) => i === index ? { ...option, value } : option)
        })
    }

    // const statusCollection = createListCollection({
    //     items: Object.values(TokenStatus)
    // })

    const statusCollection = createListCollection({
        items: [TokenStatus.DRAFT, TokenStatus.PUBLISHED]
    })

    const handleStatusChange = (index: number, value: string) => {
        setEditedModel({
            ...editedModel,
            options: editedModel.options.map((option, i) => i === index ? { ...option, status: value as TokenStatus } : option)
        })
    }

    return (
        <Flex flex={1} direction={"column"}>
            <Heading as="h1" size="lg" mb="25px">Edit Step Token Options</Heading>
            <Flex direction={"row"} gap="30px">
                {/* Left Column */}
                <Flex flex={1} direction={"column"}>
                    <Stack gap="8" >
                        <Field orientation="horizontal"  label="Id" >
                            <Input
                                value={editedModel.id}
                                disabled 
                                backgroundColor="brand.100" 
                                color="brand.500" 
                                border="none"  
                                readOnly 
                            />
                        </Field>
                        <Field  orientation="horizontal"  label="Key" >
                            <Input 
                                onChange={(e) => {handleChange(PropName.Key, e.target.value)}} 
                                value={editedModel.key} 
                                backgroundColor="brand.100"  
                                color="brand.500" 
                                border="none" 
                            />
                        </Field>
                    </Stack>
                    <Flex direction={"row"} mt="30px" justify="flex-end">
                        {
                            isUpdating ? <Button loading>Submit Update</Button> : <Button onClick={() => handleSubmit()}>Submit Update</Button>
                        }
                        
                    </Flex>
                </Flex>
                {/* Right Column */}
                <Flex flex={1} direction={"column"}>
                    <Flex direction={"row"} width="100%" justifyContent="space-between">
                        <Text>Options</Text>
                        <Button 
                            justifyContent="flex-end" 
                            mb="20px"
                            onClick={() => handleAddOption()}
                        >Add Option</Button>
                    </Flex>
                    <Box
                        maxHeight="700px" // Set the maximum height
                        overflow="auto"   // Add scrollbars when content overflows
                        border="1px solid"
                        borderColor="gray.200"
                        padding="4"
                    >
                        <Table.Root size="sm" w="100%">
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeader>Value</Table.ColumnHeader>
                                    <Table.ColumnHeader>Status</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {editedModel.options.map((option, index) => (
                                    <Table.Row key={ option.value }>
                                        <Table.Cell>
                                            <Input
                                                value={option.value}
                                                backgroundColor="brand.100" 
                                                color="brand.500" 
                                                border="none"  
                                                onChange={(e) => handleOptionValueChange(index, e.target.value)}
                                            />
                                        </Table.Cell>
                                        <Table.Cell>
                                            {option.status}
                                            <SelectRoot
                                                onValueChange={(item) => { handleStatusChange(index, item.value[0]) }}
                                                defaultValue={[option.status]}
                                                collection={statusCollection}
                                            >
                                                <SelectTrigger backgroundColor="brand.100"  color="brand.500" border="none">
                                                    <SelectValueText  placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent backgroundColor="brand.100"  color="brand.500" border="none">
                                                    {Object.values(TokenStatus).map((status) => (
                                                        <SelectItem item={status} key={status} _highlighted={{
                                                            color: "brand.900",
                                                            backgroundColor: "brand.200"
                                                        }}>
                                                            {status}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </SelectRoot>
                                        </Table.Cell>
                                        <Table.Cell textAlign="end">
                                            <Button 
                                                onClick={() => handleDeleteOption(index)}
                                                variant="link"
                                                _hover={{
                                                    color: "brand.highlight"
                                                }}
                                            >
                                                Delete
                                            </Button>
                                            {/* |
                                                <Link href={`/scenarios/delete/${scenario.id}`}>
                                                Delete
                                                </Link> */
                                            }
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    );
}