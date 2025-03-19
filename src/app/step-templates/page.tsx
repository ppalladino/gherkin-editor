"use client"

import { useEffect, useState } from 'react';
import { Flex, Text } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"
import Spinner from "@/_components/Spinner";
import ErrorContent from "@/_components/ErrorContent";
import ModelsTable from './_components/ModelsTable';
import ModelDeleteDialog from './_components/ModelDeleteDialog';
import ModelEditorDialog from './_components/ModelEditorDialog';

// Edit the below to model specifics
import { 
    StepTemplate as ModelType, 
    Project,
    StepTemplateTypes
} from '@/_types';

import { 
    useGetStepTemplatesQuery as useGetModelsQuery, 
    useDeleteStepTemplateMutation as useDeleteModelQuery,
    usePutStepTemplateMutation as usePutModelMutation,
    usePostStepTemplateMutation as usePostModelMutation,
    useGetProjectsQuery
} from '@/_services';

const modelNameSingular = "Step Template"
const modelNamePlural   = "Step Templates"

export default function ListPage() {

    const { data: getResponse, error: isGetError, isLoading: isGetLoading } = useGetModelsQuery(undefined)
    const [deleteModel, { isLoading: isDeleting }] = useDeleteModelQuery()
    const [updateModel, { isLoading: isUpdating }] = usePutModelMutation()
    const [postModel, { isLoading: isCreating }] = usePostModelMutation()
    const [listModels, setListModels] = useState<ModelType[]>([])
    
    // Delete modal state
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [modelToDelete, setModelToDelete] = useState<ModelType | undefined>()
    
    // Edit modal state
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [modelToEdit, setModelToEdit] = useState<ModelType | undefined>()
    
    // Create modal state
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [newModel, setNewModel] = useState<ModelType | undefined>()
        
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
    
    const handleOpenEditDialog = (model: ModelType) => {
        setModelToEdit(model)
        setIsEditOpen(true)
    }
    
    const handleIsEditOpenChanged = (open: boolean) => {
        setIsEditOpen(open)
        if(!open) {
            setModelToEdit(undefined)
        }
    }
    
    const handleOpenCreateDialog = () => {
        // Create a new model with default values
        const newStepTemplate: ModelType = {
            id: crypto.randomUUID(),
            title: '',
            template: '',
            type: StepTemplateTypes.ACTION,
            projectId: projects.length > 0 ? projects[0].id : '',
            titleTextEmbedding: []
        }
        setNewModel(newStepTemplate)
        setIsCreateOpen(true)
    }
    
    const handleIsCreateOpenChanged = (open: boolean) => {
        setIsCreateOpen(open)
        if(!open) {
            setNewModel(undefined)
        }
    }
    
    const handleDelete = async (model: ModelType) => {
        setIsDeleteOpen(false)
        try {
            const result = await deleteModel(model.id).unwrap()

            if (result.data.success) {
                // Update the local list immediately for a more responsive UI
                setListModels((currentModels) => 
                    currentModels.filter(item => item.id !== model.id)
                )
                
                toaster.create({
                    title: `${modelNameSingular} Deleted`,
                    description: `${modelNameSingular} ${model.title} deleted`,
                    type: 'success',
                })
            } else {
                console.error(`Error deleting ${modelNameSingular}`, result)
                toaster.create({
                    title: `Error Deleting ${modelNameSingular}`,
                    description: `There was an error deleting ${model.id}. Check the logs.`,
                    type: 'error',
                })
            }
        } catch (error) {
            console.error(`Error deleting ${modelNameSingular}`, error)
            toaster.create({
                title: `Error Deleting ${modelNameSingular}`,
                description: `There was an error deleting the model. Check the logs.`,
                type: 'error',
            })
        }
    }
    
    const handleUpdate = async (model: ModelType) => {
        setIsEditOpen(false)
        try {
            const result = await updateModel(model).unwrap()
            
            // Update the local list immediately for a more responsive UI
            setListModels((currentModels) => 
                currentModels.map(item => 
                    item.id === model.id ? model : item
                )
            )
            
            toaster.create({
                title: `${modelNameSingular} Updated`,
                description: `${modelNameSingular} ${model.title} updated successfully`,
                type: 'success',
            })
        } catch (error) {
            console.error(`Error updating ${modelNameSingular}`, error)
            toaster.create({
                title: `Error Updating ${modelNameSingular}`,
                description: `There was an error updating ${model.title}. Check the logs.`,
                type: 'error',
            })
        }
    }
    
    const handleCreate = async (model: ModelType) => {
        setIsCreateOpen(false)
        try {
            const result = await postModel(model).unwrap()
            
            // Update the local list immediately for a more responsive UI
            setListModels((currentModels) => [
                ...currentModels,
                model
            ])
            
            toaster.create({
                title: `${modelNameSingular} Created`,
                description: `${modelNameSingular} ${model.title} created successfully`,
                type: 'success',
            })
        } catch (error) {
            console.error(`Error creating ${modelNameSingular}`, error)
            toaster.create({
                title: `Error Creating ${modelNameSingular}`,
                description: `There was an error creating ${model.title}. Check the logs.`,
                type: 'error',
            })
        }
    }
    
    useEffect(() => {
        if (isGetError) {
            console.error(`Error getting step tokens`, isGetError)
            toaster.create({
                title: `Error Loading ${modelNameSingular}`,
                description: JSON.stringify(isGetError),
                type: 'error',
            })
        }
    }, [isGetError])

    useEffect(() => {
        setListModels(getResponse?.data.stepTemplates || [])
    }, [getResponse])

    // START FORIEGN MODELS

        // PROJECTS
        const [projects, setProjects] = useState<Project[]>([])
        const { 
            data: getProjectsResponse, 
            error: isGetProjectsError, 
            isLoading: isGetProjectsLoading 
        } = useGetProjectsQuery(undefined)
        useEffect(() => {
            setProjects(getProjectsResponse?.data.projects || [])
        }, [getProjectsResponse])

    // END FORIEGN MODELS
    
    return (
        <Flex flex="1" direction={"column"}>
            <Flex direction={"row"} justify={"flex-end"}>
                <Button 
                    variant="link" 
                    onClick={handleOpenCreateDialog}
                    _hover={{
                        color: "brand.highlight"
                    }}
                >
                    <Text p="5px" fontSize="sm">Create {modelNameSingular}</Text>
                </Button>
            </Flex>
            {
                isGetLoading && <Spinner />
            }
            {
                isGetError && <ErrorContent />
            }
            {
                listModels && <ModelsTable 
                                projects={projects}
                                models={listModels}
                                onDelete={(model: ModelType) => handleOpenDeleteDialog(model)}
                                onEdit={(model: ModelType) => handleOpenEditDialog(model)}
                            />
            }
            {/* Delete Dialog */}
            <ModelDeleteDialog 
                model={modelToDelete}
                isOpen={isDeleteOpen} 
                onOpenChange={(open) => {handleIsDeleteOpenChanged(open)}}
                onDeleteConfirmed={(model) => handleDelete(model)}
            />
            
            {/* Edit Dialog */}
            {modelToEdit && (
                <ModelEditorDialog
                    model={modelToEdit}
                    isOpen={isEditOpen}
                    onOpenChange={(open) => {handleIsEditOpenChanged(open)}}
                    onSaveConfirmed={(model) => handleUpdate(model)}
                    projects={projects}
                    isProcessing={isUpdating}
                    dialogTitle="Edit Step Template"
                    submitButtonText="Save Changes"
                />
            )}
            
            {/* Create Dialog */}
            {newModel && (
                <ModelEditorDialog
                    model={newModel}
                    isOpen={isCreateOpen}
                    onOpenChange={(open) => {handleIsCreateOpenChanged(open)}}
                    onSaveConfirmed={(model) => handleCreate(model)}
                    projects={projects}
                    isProcessing={isCreating}
                    dialogTitle="Create New Step Template"
                    submitButtonText="Create"
                />
            )}
        </Flex>
    );
}