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
import { useState, useEffect } from "react"
import { Organization } from "@/_types"

interface OrganizationDeleteDialogProps {
    organization: Organization | undefined;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void,
    onDeleteConfirmed: (organization: Organization) => void
}

export default function OrganizationDeleteDialog ({
    organization,
    isOpen,
    onOpenChange,
    onDeleteConfirmed
}: OrganizationDeleteDialogProps) {

    const handleDeleteConfirmed = () => {
        if(organization) {
            onDeleteConfirmed(organization)
        }
    }

  return (
    <DialogRoot lazyMount open={isOpen} onOpenChange={(e) => onOpenChange(e.open)}>
      <DialogContent backgroundColor={"brand.500"}>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <DialogBody>
          Do you really want to delete organization: <Text as="span" fontWeight="bold" color={"brand.highlight"}>{organization?.name || "Null"}</Text>?
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
