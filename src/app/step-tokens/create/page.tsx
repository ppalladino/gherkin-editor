'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Heading, Flex } from "@chakra-ui/react";
import ModelEditor from "../_components/ModelEditor";
import { v4 as uuidv4 } from 'uuid';
import { toaster } from "@/components/ui/toaster"

// Edit the below w/ model specifics
import { 
    Project as ModelType,
    Organization
} from "@/_types";
import { 
    usePostProjectMutation as usePostModelMutation,
    useGetOrganizationsQuery
} from "@/_services";
const modelNameSingular = "Project"

export default function CreateModelPage() {
    const newModel: ModelType = {
        id: uuidv4(),
        name: `New ${modelNameSingular}`,
        organizationId: "blah"
      }
      
    const router = useRouter();

    const [
        postModel,
        { 
            isLoading: isCreateLoading, 
            isSuccess: isCreateSuccess, 
            error: isCreateError
        },
    ] = usePostModelMutation()

    let isLoading = isCreateLoading
    let isDataLoaded = true

    useEffect(() => {
        if (isCreateSuccess) {
            toaster.create({
                title: `Success!`,
                description: `${modelNameSingular} Created.`,
                type: 'success',
            })
            router.push(`/projects/${newModel.id}`);
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


    const handleSubmit = (model: ModelType) => {
        postModel(model)
    }

    // GET FORIEGN MODELS
    const { 
        data: getOrganizationsResponse, 
        error: isGetOrganizationsError, 
        isLoading: isGetOrganizationsLoading 
    } = useGetOrganizationsQuery(undefined)
    const [organizations, setOrganizations] = useState<Organization[]>([])
    useEffect(() => {
        setOrganizations(getOrganizationsResponse?.data.organizations || [])
    }, [getOrganizationsResponse])

    return (
        <>
            {
                isDataLoaded && 
                <Flex flex="1" direction="column" alignItems={"center"}>
                    <Heading width={"50%"} mb="30px">Create {modelNameSingular}</Heading>
                    <ModelEditor 
                        organizations={organizations}
                        model={newModel} 
                        onSave={(o) => handleSubmit(o)}
                        isUpdating={isLoading}
                        width={"50%"}
                    />
                </Flex>
            }
        </>     
    );
}