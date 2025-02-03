'use client'

import { useState } from "react"
import { Link, Table, Flex, Heading } from '@chakra-ui/react'
import { Button } from "@/components/ui/button"
import { Organization } from '@/_types'
import Empty from '@/_components/Empty'

interface OrganizationsTableProps {
    organizations: Organization[];
    onDelete: (organization: Organization) => void;
}

export default function OrganizationsTable({
    organizations = [],
    onDelete
}: OrganizationsTableProps) {

    return (
        <Flex flex="1">
            {   
                organizations.length === 0 && 
                    <Empty
                        title="No Organizations Found."
                        description="Consider seeding data. See README.md."
                    />
            }
            {
                organizations.length > 0 && 
                <Flex w="100%" direction="column">
                    <Flex as="nav" p="10px" alignItems="center" justify={"space-between"} w="100%">
                        <Heading as="h4">Organizations</Heading>
                    </Flex>
                    <Table.Root size="sm" w="100%">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Id</Table.ColumnHeader>
                                <Table.ColumnHeader>Name</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {organizations.map((organization) => (
                                <Table.Row key={organization.id}>
                                    <Table.Cell>{organization.id.slice(0, 8)}...</Table.Cell>
                                    <Table.Cell>{organization.name}</Table.Cell>
                                    <Table.Cell textAlign="end">
                                        <Link href={`/organizations/${organization.id}`}>
                                            Edit
                                        </Link>
                                        <Button 
                                            onClick={()=> {onDelete(organization)}}
                                            variant="link"
                                            _hover={{
                                                color: "brand.highlight"
                                            }}
                                        >Delete</Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Flex>
            }
        </Flex>
    )
}