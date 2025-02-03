'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Heading, Flex } from "@chakra-ui/react";
import { Organization } from "@/_types";
import { usePostOrganizationMutation } from "@/_services";
import OrganizationEditor from "../_components/OrganizationEditor";
import { v4 as uuidv4 } from 'uuid';
import { toaster } from "@/components/ui/toaster"

// import Spinner from "@/_components/Spinner";

const newOrganization: Organization = {
  id: uuidv4(),
  name: "New Organization",
}

export default function CreateOrganizationPage() {
    const router = useRouter();

    const [
        postOrganization,
        { 
            isLoading: isCreateLoading, 
            isSuccess: isCreateSuccess, 
            error: isCreateError
        },
    ] = usePostOrganizationMutation()

    let isLoading = isCreateLoading
    let isDataLoaded = true

    useEffect(() => {
        if (isCreateSuccess) {
            toaster.create({
                title: `Success!`,
                description: 'Organization Created.',
                type: 'success',
            })
            router.push(`/organizations/${newOrganization.id}`);
        }
        

    }, [isCreateSuccess, router])

    useEffect(() => {
        if (isCreateError) {
            toaster.create({
                title: `Error!`,
                description: JSON.stringify(isCreateError),
                type: 'error',
            })
        }
    }, [isCreateError])


    const handleSubmit = (organization: Organization) => {
        postOrganization(organization)
    }

    return (
        <>
            {/* { isLoading && <Spinner /> }  */}

            {
                isDataLoaded && 
                <Flex flex="1" direction="column" alignItems={"center"}>
                    <Heading width={"50%"} mb="30px">Create Organization</Heading>
                    <OrganizationEditor 
                        organization={newOrganization} 
                        onSave={(o) => handleSubmit(o)}
                        isUpdating={isLoading}
                        width={"50%"}
                    />
                </Flex>
            }
        </>     
    );
}