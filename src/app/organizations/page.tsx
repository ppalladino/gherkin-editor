"use client"

import { useEffect, useState } from 'react';
import { useGetOrganizationsQuery, useDeleteOrganizationMutation } from '@/_services';
import Link  from 'next/link'
import { Flex, Text } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster"
import { Organization } from '@/_types';
import Spinner from "@/_components/Spinner";
import ErrorContent from "@/_components/ErrorContent";
import OrganizationsTable from './_components/OrganizationsTable';
import OrganizationDeleteDialog from './_components/OrganizationDeleteDialog';


export default function Organizations() {
    
    const { data: getResponse, error: isGetError, isLoading: isGetLoading } = useGetOrganizationsQuery(undefined)
    const [deleteOrganization, { isLoading: isDeleting }] = useDeleteOrganizationMutation()

    const [organizations, setOrganizations] = useState<Organization[]>([])
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [organizationToDelete, setOrganizationToDelete] = useState<Organization | undefined>()
            
    const handleOpenDeleteDialog = (organization: Organization) => {
        setOrganizationToDelete(organization)
        setIsDeleteOpen(true)
    }
    
    const handleIsDeleteOpenChanged = (open: boolean) => {
        setIsDeleteOpen(open)
        if(!open) {
            setOrganizationToDelete(undefined)
        }
    }
    
    const handleDelete = async (organization: Organization) => {

        setIsDeleteOpen(false)
        const result = await deleteOrganization(organization.id).unwrap()

        if (result.data.success) {
            toaster.create({
                title: `Organization Deleted`,
                description: `Organization ${organization.name} deleted`,
                type: 'success',
            })
        } else {
            toaster.create({
                title: `Error Deleting Organiztion`,
                description: `There was an error deleting ${organization.id}. Check logs.`,
                type: 'error',
            })
        }
    }
    
    useEffect(() => {
        if (isGetError) {
            console.error(isGetError)
            toaster.create({
                title: `Error Loading Organization`,
                description: JSON.stringify(isGetError),
                type: 'error',
            })
        }
    }, [isGetError])

    useEffect(() => {
        setOrganizations(getResponse?.data.organizations || [])
    }, [getResponse])
    
    return (
        <Flex flex="1" direction={"column"}>
            <Flex direction={"row"} justify={"flex-end"}>
                <Link href="/organizations/create">
                    <Text p="5px" fontSize="sm">Create Organization</Text>
                </Link>
            </Flex>
            {
                isGetLoading && <Spinner />
            }
            {
                isGetError && <ErrorContent />
            }
            {
                organizations.length > 0 && <OrganizationsTable 
                                organizations={organizations}
                                onDelete={(organization: Organization) => handleOpenDeleteDialog(organization)}
                            />
            }
            <OrganizationDeleteDialog 
                organization={organizationToDelete}
                isOpen={isDeleteOpen} 
                onOpenChange={(open) => {handleIsDeleteOpenChanged(open)}}
                onDeleteConfirmed={(organization) => handleDelete(organization)}
            />
        </Flex>
    );
}