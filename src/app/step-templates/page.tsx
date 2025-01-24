"use client"

import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Table, Flex, Heading, Spacer, HStack, Button } from "@chakra-ui/react"
import { EmptyState } from "@/components/ui/empty-state"
import { getAllStepTemplates, seedStepTemplates, deleteAllStepTemplates } from '@/_services';
import { StepTemplate } from '@/_types';
import { FaGhost } from "react-icons/fa"
// import { findById } from "@/_lib/utils";

export default function StepTemplatesPage() {
    // const router = useRouter();

    const [stepTemplates, setStepTemplates] = useState<StepTemplate[]>([]);
    
    useEffect(() => {
        const loadAllStepTemplates = async () => {
          try {
            const data = await getAllStepTemplates();
            setStepTemplates(data);
          } catch (error) {
            console.error(error);
          }
        };
        loadAllStepTemplates();
      }, []);

    return (
      <div>
        <Flex as="nav" p="10px" alignItems="center" justify={"space-between"}>
          <Heading as="h4">Step Templates</Heading>
          <Button onClick={() => {deleteAllStepTemplates()}}>Delete All Data</Button>
        </Flex>
        {stepTemplates.length === 0 ? (
            // <EmptyState title="No Step Templates in DB. Try clicking the 'Seed' button above."/>
            <EmptyState
                icon={<FaGhost />}
                title="No Step Templates in DB."
                description="Seed the database by clicking the button below."
                >
                <Button onClick={() => {seedStepTemplates()}}>Seed Data</Button>
            </EmptyState>
        ) : (
        <Table.Root size="sm">
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
                        </Link> */}
                  </Table.Cell>
                </Table.Row>
            ))}
            </Table.Body>
        </Table.Root>
        )}
        
      </div>
    );
}