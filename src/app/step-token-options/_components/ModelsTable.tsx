'use client'

import { useEffect } from 'react'
import { Link, Table, Flex, Heading, HStack, Text } from '@chakra-ui/react'
import { Button } from "@/components/ui/button"
import { ClipboardIconButton, ClipboardRoot } from "@/components/ui/clipboard"
import { StepTokenOptionStatus } from '@/_types';
import Empty from '@/_components/Empty'
import { toaster } from "@/components/ui/toaster"
import { useSeedStepTokenOptionsMutation } from "@/_services"

import { 
    StepTokenOption as ModelType,
    StepToken
} from '@/_types'

const modelNameSingular = "Step Token Option";
const modelNamePlural = "Step Token Options";

interface ModelsTableProps {
    models: ModelType[];
    onDelete: (model: ModelType) => void;
    stepTokens: StepToken[]
}

export default function ModelsTable({
    models = [],
    onDelete,
    stepTokens
}: ModelsTableProps) {

     // SEED STEP TOKEN OPTIONS
     const [
        seedStepTokenOptions,
        { 
            isLoading: isSeedStepTokenOptionsLoading, 
            isSuccess: isSeedStepTokenOptionsSuccess, 
            error: isSeedStepTokenOptionsError
        },
    ] = useSeedStepTokenOptionsMutation()
    useEffect(() => {
        if (isSeedStepTokenOptionsSuccess) {
            toaster.create({
                title: `Success Seeding ${modelNamePlural}`,
                description: "You did it!",
                type: 'success',
            })
        }
    }, [isSeedStepTokenOptionsSuccess])
    useEffect(() => {
        if (isSeedStepTokenOptionsError) {
            console.error(isSeedStepTokenOptionsError)
            toaster.create({
                title: `Error Seeding ${modelNamePlural}`,
                description: JSON.stringify(isSeedStepTokenOptionsError),
                type: 'error',
            })
        }
    }, [isSeedStepTokenOptionsError])

    const handleSeedData = () => {
        seedStepTokenOptions(undefined)
    }

    return (
        <Flex flex="1">
            {   
                models.length === 0 && 
                    <Flex flex="1" direction={"column"} alignItems={"center"}>
                        <Empty
                            title={`No ${modelNamePlural} Found.`}
                            description="Consider seeding data. See README.md."
                        />
                        <Button onClick={() => {handleSeedData()}}>Seed Data</Button>
                    </Flex>
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
                                <Table.ColumnHeader>Step Token Key</Table.ColumnHeader>
                                <Table.ColumnHeader>Status</Table.ColumnHeader>
                                <Table.ColumnHeader>Value</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {models.map((model) => (
                                <Table.Row key={model.id}>
                                    <Table.Cell>
                                        <HStack>
                                            <ClipboardRoot value={model.id}>
                                                <ClipboardIconButton 
                                                    backgroundColor={"transparent"}
                                                    _hover={{color: "brand.highlight"}}
                                                />
                                            </ClipboardRoot>
                                            {model.id.slice(0, 8)}...
                                        </HStack>
                                    </Table.Cell>
                                    <Table.Cell>{stepTokens?.find((x) => (x.id === model.stepTokenId))?.key || "Null"}</Table.Cell>
                                    <Table.Cell>
                                        <Text
                                            color={model.status === StepTokenOptionStatus.PUBLISHED ? 'brand.highlight' : 'brand.alert'}
                                        >{model.status}</Text>
                                    </Table.Cell>
                                    <Table.Cell>{model.value}</Table.Cell>
                                    <Table.Cell textAlign="end">
                                        <Link href={`/step-tokens/${model.id}`}>
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