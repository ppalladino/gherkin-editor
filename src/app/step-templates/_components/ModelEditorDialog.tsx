"use client"

import { useEffect, useState } from 'react'
import { Input, Stack, Flex, createListCollection } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText
} from "@/components/ui/select"
import { StepTemplate, Project, StepTemplateTypes } from "@/_types"

interface ModelEditorDialogProps {
  model: StepTemplate // Always required - parent component decides whether to provide existing or new model
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSaveConfirmed: (model: StepTemplate) => void
  projects: Project[]
  isProcessing: boolean
  dialogTitle: string // Let parent component set appropriate title
  submitButtonText: string // Let parent component set appropriate button text
}

export default function ModelEditorDialog({
  model,
  isOpen,
  onOpenChange,
  onSaveConfirmed,
  projects,
  isProcessing,
  dialogTitle,
  submitButtonText
}: ModelEditorDialogProps) {
  const [editedModel, setEditedModel] = useState<StepTemplate>({...model})

  // Reset edited model when the input model changes or dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      setEditedModel({...model})
    }
  }, [model, isOpen])

  const handleSaveConfirmed = () => {
    if (editedModel) {
      onSaveConfirmed(editedModel)
    }
  }

  const handleChange = (propName: string, value: string) => {
    switch (propName) {
      case 'title':
        setEditedModel({
          ...editedModel,
          title: value
        })
        break
      case 'template':
        setEditedModel({
          ...editedModel,
          template: value
        })
        break
      default:
        throw new Error(`Property name ${propName} is not supported.`)
    }
  }

  const projectsCollection = createListCollection({
    items: projects.map((proj) => { return { label: proj.name, value: proj.id } })
  })

  const stepTypesCollection = createListCollection({
    items: Object.entries(StepTemplateTypes).map(([key, value]) => {
      return { label: value, value }
    })
  })

  const handleProjectChange = (projectId: string) => {
    setEditedModel({
      ...editedModel,
      projectId: projectId
    })
  }

  const handleTypeChange = (type: string) => {
    setEditedModel({
      ...editedModel,
      type: type
    })
  }
  
  // Validate form to enable/disable submit button
  const isValid = !!(
    editedModel.title?.trim() && 
    editedModel.template?.trim() && 
    editedModel.projectId && 
    editedModel.type
  )

  return (
    <DialogRoot lazyMount open={isOpen} onOpenChange={(e) => onOpenChange(e.open)}>
      <DialogContent backgroundColor={"brand.500"} maxWidth="90%" width="90%" height="90vh">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Flex width="100%" height="100%" flexDirection="column">
            <Stack gap="6" width="60%" mx="auto" mt="4">
              {/* Show ID field for all cases - will be visible but not editable */}
              <Field orientation="horizontal" label="ID">
                <Input
                  value={editedModel.id}
                  disabled
                  backgroundColor="brand.100"
                  color="brand.500"
                  border="none"
                  readOnly
                  size="lg"
                />
              </Field>
              <Field orientation="horizontal" label="Title">
                <Input
                  onChange={(e) => handleChange('title', e.target.value)}
                  value={editedModel.title}
                  backgroundColor="brand.100"
                  color="brand.500"
                  border="none"
                  size="lg"
                  placeholder="Enter template title"
                />
              </Field>
              <Field orientation="horizontal" label="Template">
                <Input
                  onChange={(e) => handleChange('template', e.target.value)}
                  value={editedModel.template}
                  backgroundColor="brand.100"
                  color="brand.500"
                  border="none"
                  size="lg"
                  height="100px"
                  as="textarea"
                  py="2"
                  px="4"
                  placeholder="Enter step template text (e.g., 'Given I have {{count}} items')"
                />
              </Field>
                
              <Flex gap="6">
                <Field orientation="horizontal" label="Project" flex="1">
                  <SelectRoot
                    onValueChange={(item) => handleProjectChange(item.value[0])}
                    defaultValue={[editedModel.projectId]}
                    collection={projectsCollection}
                  >
                    <SelectTrigger backgroundColor="brand.100" borderRadius={5} color="brand.500" border="none" height="40px">
                      <SelectValueText backgroundColor="brand.100" placeholder="Select Project" />
                    </SelectTrigger>
                    <SelectContent backgroundColor="brand.100" color="brand.500" border="none" style={{ zIndex: 9999 }}>
                      {projects.map((proj) => (
                        <SelectItem item={{ label: proj.name, value: proj.id }} key={proj.id} _highlighted={{
                          color: "brand.900",
                          backgroundColor: "brand.200"
                        }}>
                          {proj.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                </Field>
                
                <Field orientation="horizontal" label="Type" flex="1">
                  <SelectRoot
                    onValueChange={(item) => handleTypeChange(item.value[0])}
                    defaultValue={[editedModel.type]}
                    collection={stepTypesCollection}
                  >
                    <SelectTrigger backgroundColor="brand.100" borderRadius={5} color="brand.500" border="none" height="40px">
                      <SelectValueText backgroundColor="brand.100" placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent backgroundColor="brand.100" color="brand.500" border="none" style={{ zIndex: 9999 }}>
                      {Object.entries(StepTemplateTypes).map(([key, value]) => {
                        return (
                          <SelectItem 
                            key={key}
                            item={{ label: value, value }}
                            _highlighted={{
                              color: "brand.900",
                              backgroundColor: "brand.200"
                            }}
                          >
                            {value}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </SelectRoot>
                </Field>
              </Flex>
            </Stack>
          </Flex>
        </DialogBody>
        <DialogFooter justifyContent="flex-end" mb="6" mr="6">
          <DialogActionTrigger asChild>
            <Button mr="4">Cancel</Button>
          </DialogActionTrigger>
          <Button
            onClick={() => handleSaveConfirmed()}
            loading={isProcessing}
            disabled={!isValid}
            backgroundColor={isValid ? "brand.highlight" : "gray.400"}
            _hover={{
              backgroundColor: isValid ? "brand.highlightMuted" : "gray.400"
            }}
          >
            {submitButtonText}
          </Button>
        </DialogFooter>
        <DialogCloseTrigger
          _hover={{
            color: "brand.highlight",
            backgroundColor: "transparent"
          }}
        />
      </DialogContent>
    </DialogRoot>
  )
}