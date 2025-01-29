"use client"

import { useEffect, useState } from 'react';
import { Flex, Heading, Input, Stack, HStack, createListCollection } from "@chakra-ui/react"
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
import { StepTemplate, StepTemplateTypes } from '@/_types';

export enum PropName {
    Title,
    Template,
    Type
}

interface StepTemplateEditorProps {
    stepTemplate: StepTemplate;
    onSubmit: (stepTemplate: StepTemplate) => void;
    isUpdating: boolean
}

export default function StepTemplateEditor({
    stepTemplate,
    onSubmit,
    isUpdating
}: StepTemplateEditorProps ) {

    const [editedStepTeplate, setEditedStepTeplate] = useState<StepTemplate>({...stepTemplate});

    const handleSubmit = () => {
        onSubmit(editedStepTeplate)
    }

    function handleChange(propName: PropName, value: string) {
        // console.log(propName, value)
        switch (propName) {
            case PropName.Title:
                setEditedStepTeplate({
                    ...editedStepTeplate,
                    title: value
                })
                break;
            case PropName.Template:
                setEditedStepTeplate({
                    ...editedStepTeplate,
                    template: value
                })
                break;
            case PropName.Type:
                setEditedStepTeplate({
                    ...editedStepTeplate,
                    type: value
                })
                break;
            default:
                throw new Error(`Property name ${propName} is not supported.`)
        } 
    }

    const stepTemplateTypesCollection = createListCollection({
        items: Object.values(StepTemplateTypes)
        .map((type) => ({
            value: type,
            name: type
        })),
    })
      
    return (
      <Flex flex={1} direction={"column"}>
        <Heading as="h1" size="lg" mb="25px">Edit Step Template</Heading>
        <Stack gap="8" >
            <Field orientation="horizontal"  label="Id" >
                <Input
                    value={editedStepTeplate.id}
                    disabled 
                    backgroundColor="brand.100" 
                    color="brand.500" 
                    border="none"  
                    readOnly 
                />
            </Field>
            <Field  orientation="horizontal"  label="Title" >
                <Input 
                    onChange={(e) => {handleChange(PropName.Title, e.target.value)}} 
                    value={editedStepTeplate.title} 
                    backgroundColor="brand.100"  
                    color="brand.500" 
                    border="none" 
                />
            </Field>
            <Field orientation="horizontal"  label="Template" >
                <Input 
                    onChange={(e) => {handleChange(PropName.Template, e.target.value)}} 
                    value={editedStepTeplate.template} 
                    backgroundColor="brand.100"  
                    color="brand.500" 
                    border="none" 
                />
            </Field>
            <Field  orientation="horizontal"  label="Type" >
                <SelectRoot
                    onValueChange={(item) => {handleChange(PropName.Type, item.value[0])}}
                    defaultValue={[editedStepTeplate.type]}
                    collection={stepTemplateTypesCollection}
                >
                    {/* <SelectLabel>size = {size}</SelectLabel> */}
                <SelectTrigger backgroundColor="brand.100"  color="brand.500" border="none">
                    <SelectValueText  placeholder="Select type" />
                </SelectTrigger>
                <SelectContent backgroundColor="brand.100"  color="brand.500" border="none">
                    {stepTemplateTypesCollection.items.map((type) => (
                        <SelectItem item={type.name} key={type.name} _highlighted={{
                            color: "brand.900",
                            backgroundColor: "brand.200"
                        }}>
                            {type.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>
            </Field>
        </Stack>
        <Flex direction={"row"} mt="30px" justify="flex-end">
            {
                isUpdating ? <Button loading>Submit Update</Button> : <Button onClick={() => handleSubmit()}>Submit Update</Button>
            }
            
        </Flex>
       
      </Flex>
    );
}