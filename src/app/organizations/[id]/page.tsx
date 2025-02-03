"use client"

import React, { useEffect, useState, Usable, use } from "react";
import { Heading, Flex } from "@chakra-ui/react";
import { Organization } from "@/_types";
import { useGetOrganizationQuery, usePutOrganizationMutation } from "@/_services";
import Spinner from "@/_components/Spinner"
import ErrorContent from "@/_components/ErrorContent";
import OrganizationEditor from "../_components/OrganizationEditor";
import { v4 as uuidv4 } from 'uuid';
import { toaster } from "@/components/ui/toaster"

interface EditOrganizationPageProps {
    params: Usable<{id: string}>;
}

export default function EditOrganizationPage({params}: EditOrganizationPageProps) {
    const { id } = use<{id: string}>(params);

    const { data: getData, error: isGetError, isLoading: isGetLoading } = useGetOrganizationQuery(id);
    const [putOrganization, { isLoading: isPutLoading, isSuccess: isPutSuccess, isError: isPutError, error: putError }] = usePutOrganizationMutation();

    const [organization, setOrganization] = useState<Organization>()

    let isLoading = isGetLoading || isPutLoading
    
    const showError = (errorTitle: string, errorDescription: string) => {
        toaster.create({
            title: errorTitle,
            description: errorDescription,
            type: 'error',
        })
    }

    useEffect(() => {
        if (getData) {
            setOrganization(getData.data.organization)
        }
    }, [getData])

    useEffect(() => {
        if (isPutSuccess) {
            toaster.create({
                title: `Success!`,
                description: 'Organization Updated.',
                type: 'success',
            })
        }
    }, [isPutSuccess])

    useEffect(() => {
        if (isGetError) {
            showError(
                `Error Getting Organization`,
                JSON.stringify(isGetError)
            )
        }
    }, [isGetError])

    useEffect(() => {
        if (isPutError) {
            showError(
                `Error Updating Organization`,
                JSON.stringify(isPutError)
            )
        }
    }, [isPutError])

    const handleSubmit = async (organization: Organization) => {
        const putResult = await putOrganization(organization).unwrap();
        setOrganization(putResult.data.organization)
    }

    return (
        <Flex flex="1">
            {
                isGetLoading && <Spinner />
            }
            {
                isGetError && <ErrorContent />
            }
            {
                organization && 
                <Flex flex="1" direction="column" alignItems={"center"}>
                        <Heading 
                            mb="30px"
                            width={"50%"}
                        >Edit Organization</Heading>
                        <OrganizationEditor 
                            organization={organization} 
                            onSave={(o) => handleSubmit(o)}
                            isUpdating={isLoading}
                            width={"50%"}
                        />
                </Flex>
            }
        </Flex>
    )
}