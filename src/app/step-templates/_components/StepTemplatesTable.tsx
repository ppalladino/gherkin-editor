'use client'

import { Button, Link, Table, Flex, Heading } from '@chakra-ui/react'
import { EmptyState } from "@/components/ui/empty-state"
import { FaGhost } from 'react-icons/fa'
import { StepTemplate } from '@/_types'
import { seedStepTemplates, deleteAllStepTemplates } from '@/_services/_index';

interface StepTemplatesTableProps {
    stepTemplates: StepTemplate[];
}

export default function StepTemplatesTable({
    stepTemplates,
}: StepTemplatesTableProps) {

    return (
        <Flex flex="1">
            {   
                stepTemplates.length === 0 && 
                <EmptyState
                    icon={<FaGhost />}
                    title="No Step Templates in DB."
                    description="Seed the database by clicking the button below."
                    >
                    <Button onClick={() => {seedStepTemplates()}}>Seed Data</Button>
                </EmptyState>
            }
            {
                stepTemplates.length > 0 && 
                <Flex w="100%" direction="column">
                    <Flex as="nav" p="10px" alignItems="center" justify={"space-between"} w="100%">
                        <Heading as="h4">Step Templates</Heading>
                        <Button onClick={() => {deleteAllStepTemplates()}}>Delete All Data</Button>
                    </Flex>
                    <Table.Root size="sm" w="100%">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Id</Table.ColumnHeader>
                                <Table.ColumnHeader>Title</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {stepTemplates.map((stepTemplate) => (
                                <Table.Row key={stepTemplate.id}>
                                    <Table.Cell>{stepTemplate.id.slice(0, 8)}...</Table.Cell>
                                    <Table.Cell>{stepTemplate.title}</Table.Cell>
                                    <Table.Cell textAlign="end">
                                        <Link href={`/step-templates/${stepTemplate.id}`}>
                                            Edit
                                        </Link>
                                        {/* |
                                            <Link href={`/scenarios/delete/${scenario.id}`}>
                                            Delete
                                            </Link> */
                                        }
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