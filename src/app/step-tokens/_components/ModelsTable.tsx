'use client'

import { useEffect } from 'react'
import { Link, Table, Flex, Heading, HStack } from '@chakra-ui/react'
import { Button } from "@/components/ui/button"
import { ClipboardIconButton, ClipboardRoot } from "@/components/ui/clipboard"
import Empty from '@/_components/Empty'
import { useSeedStepTokensMutation } from "@/_services"
import { toaster } from "@/components/ui/toaster"

import { 
    StepToken as ModelType,
    Project
} from '@/_types'

const modelNameSingular = "Step Token";
const modelNamePlural = "Step Tokens";

interface ModelsTableProps {
    models: ModelType[];
    onDelete: (model: ModelType) => void;
    projects: Project[]
}

export default function ModelsTable({
    models = [],
    onDelete,
    projects
}: ModelsTableProps) {

     // SEED STEP TEMPLATES
     const [
        seedStepTokens,
        { 
            isLoading: isSeedStepTokensLoading, 
            isSuccess: isSeedStepTokensSuccess, 
            error: isSeedStepTokensError
        },
    ] = useSeedStepTokensMutation()
    useEffect(() => {
        if (isSeedStepTokensSuccess) {
            toaster.create({
                title: `Success Seeding ${modelNamePlural}`,
                description: "You did it!",
                type: 'success',
            })
        }
    }, [isSeedStepTokensSuccess])
    useEffect(() => {
        if (isSeedStepTokensError) {
            console.error(isSeedStepTokensError)
            toaster.create({
                title: `Error Seeding ${modelNamePlural}`,
                description: JSON.stringify(isSeedStepTokensError),
                type: 'error',
            })
        }
    }, [isSeedStepTokensError])

    const handleSeedData = () => {
        seedStepTokens(undefined)
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
                                <Table.ColumnHeader>Project Name</Table.ColumnHeader>
                                <Table.ColumnHeader>{modelNameSingular} Key</Table.ColumnHeader>
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
                                    <Table.Cell>{projects?.find((x) => (x.id === model.projectId))?.name || "Null"}</Table.Cell>
                                    <Table.Cell>{model.key}</Table.Cell>
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