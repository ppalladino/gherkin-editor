"use client"

import React, { useEffect, useState, Usable, use } from "react";
import { Heading, Flex } from "@chakra-ui/react";
import Spinner from "@/_components/Spinner"
import ErrorContent from "@/_components/ErrorContent";
import ModelEditor from "../_components/ModelEditor";
import { v4 as uuidv4 } from 'uuid';
import { toaster } from "@/components/ui/toaster"

// EDIT THESE MODEL TYPE SPECIFIC ITEMS
import { 
    Project as ModelType,
    Organization
} from "@/_types";
import { 
    useGetProjectQuery as useGetQuery, 
    usePutProjectMutation as usePutMutation,
    useGetOrganizationsQuery
} from "@/_services";

const modelName = "Project"

interface EditPageProps {
    params: Usable<{id: string}>;
}

export default function EditPage({params}: EditPageProps) {
    const { id } = use<{id: string}>(params);

    const { data: getData, error: isGetError, isLoading: isGetLoading } = useGetQuery(id);
    const [putModel, { isLoading: isPutLoading, isSuccess: isPutSuccess, isError: isPutError, error: putError }] = usePutMutation();

    const [model, setModel] = useState<ModelType>()

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
            setModel(getData.data.project)
        }
    }, [getData])

    useEffect(() => {
        if (isPutSuccess) {
            toaster.create({
                title: `Success!`,
                description: `${modelName} Updated.`,
                type: 'success',
            })
        }
    }, [isPutSuccess])

    useEffect(() => {
        if (isGetError) {
            showError(
                `Error Getting ${modelName}`,
                JSON.stringify(isGetError)
            )
        }
    }, [isGetError])

    useEffect(() => {
        if (isPutError) {
            showError(
                `Error Updating ${modelName}`,
                JSON.stringify(isPutError)
            )
        }
    }, [isPutError])

    const handleSubmit = async (model: ModelType) => {
        const putResult = await putModel(model).unwrap();
        setModel(putResult.data.project)
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
        <Flex flex="1">
            {
                isGetLoading && <Spinner />
            }
            {
                isGetError && <ErrorContent />
            }
            {
                model && 
                <Flex flex="1" direction="column" alignItems={"center"}>
                        <Heading 
                            mb="30px"
                            width={"50%"}
                        >Edit {modelName}</Heading>
                        <ModelEditor 
                            organizations={organizations}
                            model={model} 
                            onSave={(o) => handleSubmit(o)}
                            isUpdating={isLoading}
                            width={"50%"}
                        />
                </Flex>
            }
        </Flex>
    )
}