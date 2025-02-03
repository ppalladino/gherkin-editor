'use client'

import { useState } from "react"
import { Link, Table, Flex, Heading } from '@chakra-ui/react'
import { Button } from "@/components/ui/button"
import Empty from '@/_components/Empty'

import { 
    Project as ModelType,
    Organization
} from '@/_types'

const modelNameSingular = "Project";
const modelNamePlural = "Projects";

interface ModelsTableProps {
    models: ModelType[];
    onDelete: (model: ModelType) => void;
    organizations: Organization[]
}

export default function ModelsTable({
    models = [],
    onDelete,
    organizations
}: ModelsTableProps) {

    return (
        <Flex flex="1">
            {   
                models.length === 0 && 
                    <Empty
                        title={`No ${modelNamePlural} Found.`}
                        description="Consider seeding data. See README.md."
                    />
            }
            {
                models.length > 0 && 
                <Flex w="100%" direction="column">
                    <Flex as="nav" p="10px" alignItems="center" justify={"space-between"} w="100%">
                        <Heading as="h4">{modelNamePlural}</Heading>
                    </Flex>
                    <Table.Root size="sm" w="100%">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Id</Table.ColumnHeader>
                                <Table.ColumnHeader>{modelNameSingular} Name</Table.ColumnHeader>
                                <Table.ColumnHeader>Organization</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {models.map((model) => (
                                <Table.Row key={model.id}>
                                    <Table.Cell>{model.id.slice(0, 8)}...</Table.Cell>
                                    <Table.Cell>{model.name}</Table.Cell>
                                    <Table.Cell>{organizations?.find((org) => (org.id === model.organizationId))?.name || "Null"}</Table.Cell>
                                    <Table.Cell textAlign="end">
                                        <Link href={`/projects/${model.id}`}>
                                            Edit
                                        </Link>
                                        <Button 
                                            onClick={()=> {onDelete(model)}}
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