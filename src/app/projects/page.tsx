"use client"

import { useEffect, useState } from 'react';
import Link  from 'next/link'
import { Flex, Text } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster"
import Spinner from "@/_components/Spinner";
import ErrorContent from "@/_components/ErrorContent";
import ModelsTable from './_components/ModelsTable';
import ModelDeleteDialog from './_components/ModelDeleteDialog';

// Edit the below to model specifics
import { 
    Project as ModelType, 
    Organization 
} from '@/_types';

import { 
    useGetProjectsQuery as useGetModelsQuery, 
    useDeleteProjectMutation as useDeleteModelQuery,
    useGetOrganizationsQuery
} from '@/_services';

const modelNameSingular = "Project"
const modelNamePlural   = "Projects"

export default function ListPage() {

    const { data: getResponse, error: isGetError, isLoading: isGetLoading } = useGetModelsQuery(undefined)
    const [deleteModel, { isLoading: isDeleting }] = useDeleteModelQuery()
    const [listModels, setListModels] = useState<ModelType[]>([])
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [modelToDelete, setModelToDelete] = useState<ModelType | undefined>()
        
    const handleOpenDeleteDialog = (model: ModelType) => {
        setModelToDelete(model)
        setIsDeleteOpen(true)
    }
    
    const handleIsDeleteOpenChanged = (open: boolean) => {
        setIsDeleteOpen(open)
        if(!open) {
            setModelToDelete(undefined)
        }
    }
    
    const handleDelete = async (model: ModelType) => {

        setIsDeleteOpen(false)
        const result = await deleteModel(model.id).unwrap()

        if (result.data.success) {
            toaster.create({
                title: `${modelNameSingular} Deleted`,
                description: `${modelNameSingular} ${model.name} deleted`,
                type: 'success',
            })
        } else {
            toaster.create({
                title: `Error Deleting ${modelNameSingular}`,
                description: `There was an error deleting ${model.id}. Check the logs.`,
                type: 'error',
            })
        }
    }
    
    useEffect(() => {
        if (isGetError) {
            console.error(isGetError)
            toaster.create({
                title: `Error Loading ${modelNameSingular}`,
                description: JSON.stringify(isGetError),
                type: 'error',
            })
        }
    }, [isGetError])

    useEffect(() => {
        setListModels(getResponse?.data.projects || [])
    }, [getResponse])

    // GET FORIEGN MODELS
    const [organizations, setOrganizations] = useState<Organization[]>([])
    const { 
        data: getOrganizationsResponse, 
        error: isGetOrganizationsError, 
        isLoading: isGetOrganizationsLoading 
    } = useGetOrganizationsQuery(undefined)
    useEffect(() => {
        setOrganizations(getOrganizationsResponse?.data.organizations || [])
    }, [getOrganizationsResponse])
    
    return (
        <Flex flex="1" direction={"column"}>
            <Flex direction={"row"} justify={"flex-end"}>
                <Link href="/projects/create">
                    <Text p="5px" fontSize="sm">Create {modelNameSingular}</Text>
                </Link>
            </Flex>
            {
                isGetLoading && <Spinner />
            }
            {
                isGetError && <ErrorContent />
            }
            {
                listModels && <ModelsTable 
                                organizations={organizations}
                                models={listModels}
                                onDelete={(model: ModelType) => handleOpenDeleteDialog(model)}
                            />
            }
            <ModelDeleteDialog 
                model={modelToDelete}
                organizations={organizations}
                isOpen={isDeleteOpen} 
                onOpenChange={(open) => {handleIsDeleteOpenChanged(open)}}
                onDeleteConfirmed={(model) => handleDelete(model)}
            />
        </Flex>
    );
}