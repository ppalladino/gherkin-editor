"use client"

import { useEffect, useState } from 'react';
import { Flex, FlexProps, Heading, Input, Stack, HStack, createListCollection } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"    
import { Organization } from '@/_types';

interface OrganizationEditorProps extends FlexProps {
    organization: Organization;
    onSave: (organization: Organization) => void;
    isUpdating: boolean
}

export default function OrganizationEditor({
    organization,
    onSave,
    isUpdating,
    ...rest
}: OrganizationEditorProps ) {

    const [editedOrganization, setEditedOrganization] = useState<Organization>({...organization});

    const handleSubmit = () => {
        onSave(editedOrganization)
    }

    function handleChange(propName: string, value: string) {
        switch (propName) {
            case 'name':
                setEditedOrganization({
                    ...editedOrganization,
                    name: value
                })
                break;
            default:
                throw new Error(`Property name ${propName} is not supported.`)
        } 
    }

    return (
      <Flex flex={1} direction={"column"} {...rest}>
        <Stack gap="8" >
            <Field orientation="horizontal"  label="Id" >
                <Input
                    value={editedOrganization.id}
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
                    value={editedOrganization.name} 
                    backgroundColor="brand.100"  
                    color="brand.500" 
                    border="none" 
                />
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