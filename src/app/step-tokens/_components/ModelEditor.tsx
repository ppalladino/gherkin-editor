"use client"

import { useEffect, useState } from 'react';
import { Flex, FlexProps, Heading, Input, Stack, HStack, createListCollection } from "@chakra-ui/react"
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
import { 
    Project as ModelType,
    Organization
} from '@/_types';

interface ModelEditorProps extends FlexProps {
    model: ModelType;
    onSave: (organization: ModelType) => void;
    isUpdating: boolean,
    organizations: Organization[]
}

export default function ModelEditor({
    model,
    onSave,
    isUpdating,
    organizations, 
    ...rest
}: ModelEditorProps ) {

    const [editedModel, setEditedModel] = useState<ModelType>({...model});

    const handleSubmit = () => {
        onSave(editedModel)
    }

    function handleChange(propName: string, value: string) {
        switch (propName) {
            case 'name':
                setEditedModel({
                    ...editedModel,
                    name: value
                })
                break;
            default:
                throw new Error(`Property name ${propName} is not supported.`)
        } 
    }

    const organizationsCollection = createListCollection({
        items: organizations.map((org) => {return {label: org.name, value: org.id}})
    })

    const handleOrganizationChange = (organizationId: string) => {
        setEditedModel({
            ...editedModel,
            organizationId: organizationId
        })
    }

    return (
      <Flex flex={1} direction={"column"} {...rest}>
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
            <Field  orientation="horizontal"  label="Title" >
                <Input 
                    onChange={(e) => {handleChange('name', e.target.value)}} 
                    value={editedModel.name} 
                    backgroundColor="brand.100"  
                    color="brand.500" 
                    border="none" 
                />
            </Field>
            <Field orientation="horizontal"  label="Org">
                <SelectRoot
                    onValueChange={(item) => { handleOrganizationChange(item.value[0]) }}
                    defaultValue={[editedModel.organizationId]}
                    collection={organizationsCollection}
                >
                    <SelectTrigger backgroundColor="brand.100" borderRadius={5} color="brand.500" border="none">
                        <SelectValueText backgroundColor="brand.100" placeholder="Select Organization" />
                    </SelectTrigger>
                    <SelectContent backgroundColor="brand.100"  color="brand.500" border="none">
                        {organizations.map((org) => (
                            <SelectItem item={{label: org.name, value: org.id}} key={org.id} _highlighted={{
                                color: "brand.900",
                                backgroundColor: "brand.200"
                            }}>
                                {org.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </SelectRoot>
            </Field>
        </Stack>
        <Flex direction={"row"} mt="30px" justify="flex-end">
            {
                isUpdating ? <Button loading>Submit</Button> : <Button onClick={() => handleSubmit()}>Submit</Button>
            }
        </Flex>
      </Flex>
    );
}