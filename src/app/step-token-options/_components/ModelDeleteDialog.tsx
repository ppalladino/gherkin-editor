"use client"

import { Button, Text } from "@chakra-ui/react"
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { StepTokenOption as ModelType} from "@/_types"

const modelNameSingular = 'Step Token Option'

interface ModelDeleteDialogProps {
    model: ModelType | undefined;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void,
    onDeleteConfirmed: (model: ModelType) => void
}

export default function ModelDeleteDialog ({
    model,
    isOpen,
    onOpenChange,
    onDeleteConfirmed
}: ModelDeleteDialogProps) {

    const handleDeleteConfirmed = () => {
        if(model) {
            onDeleteConfirmed(model)
        }
    }

  return (
    <DialogRoot lazyMount open={isOpen} onOpenChange={(e) => onOpenChange(e.open)}>
      <DialogContent backgroundColor={"brand.500"}>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <DialogBody>
          Do you really want to delete {modelNameSingular}: <Text as="span" fontWeight="bold" color={"brand.highlight"}>{model?.value || "Null"}</Text>?
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button>Cancel</Button>
          </DialogActionTrigger>
          <Button 
            backgroundColor={"brand.alert"}
            _hover={{
                backgroundColor: "brand.alertMuted"
            }}
            onClick={() => handleDeleteConfirmed()}
          >Delete</Button>
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
