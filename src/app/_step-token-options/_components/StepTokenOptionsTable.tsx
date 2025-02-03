'use client'

import { Text, Link, Table, Flex, Heading } from '@chakra-ui/react'
import { EmptyState } from "@/components/ui/empty-state"
import { FaGhost } from 'react-icons/fa'
import { StepTokenOptions, TokenStatus } from '@/_types'

interface StepTokenOptionsTableProps {
    stepTokenOptions: StepTokenOptions[];
}

export default function StepTemplatesTable({
    stepTokenOptions,
}: StepTokenOptionsTableProps) {

    return (
        <Flex flex="1">
            {   
                stepTokenOptions.length === 0 && 
                <EmptyState
                    icon={<FaGhost />}
                    title="No Step Token Options in DB."
                    description="Seeding data did not work in the db init script. Check there."
                    >
                </EmptyState>
            }
            {
                stepTokenOptions.length > 0 && 
                <Flex w="100%" direction="column">
                    <Flex as="nav" p="10px" alignItems="center" justify={"space-between"} w="100%">
                        <Heading as="h4">Step Token Options</Heading>
                    </Flex>
                    <Table.Root size="sm" w="100%">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Id</Table.ColumnHeader>
                                <Table.ColumnHeader>Title</Table.ColumnHeader>
                                <Table.ColumnHeader>Published Options</Table.ColumnHeader>
                                <Table.ColumnHeader>Draft Options</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {stepTokenOptions.map((options) => (
                                <Table.Row key={options.id}>
                                    <Table.Cell>{options.id.slice(0, 8)}...</Table.Cell>
                                    <Table.Cell>{options.key}</Table.Cell>
                                    <Table.Cell>
                                        {options.options.filter((o) => o.status === TokenStatus.PUBLISHED).map((o, index) => (
                                            <Text key={index}>{o.value}</Text>
                                        ))}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {options.options.filter((o) => o.status === TokenStatus.DRAFT).map((o, index) => (
                                            <Text key={index}>{o.value}</Text>
                                        ))}
                                    </Table.Cell>
                                    <Table.Cell textAlign="end">
                                        <Link href={`/step-token-options/${options.id}`}>
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