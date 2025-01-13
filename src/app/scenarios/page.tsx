"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Table, Flex, Heading, Spacer, HStack, Button } from "@chakra-ui/react"
import { getAllScenarios, getAllFeatures } from '@/_services';
import { Feature, Scenario } from '@/_types';
import { findById } from "@/_lib/utils";

export default function ScenariosList() {
    const router = useRouter();

    const [features, setFeatures] = useState<Feature[]>([]);
    const [scenarios, setScenarios] = useState<Scenario[]>([]);
    
    useEffect(() => {
        const loadAllFeatures = async () => {
          try {
            const data = await getAllFeatures();
            setFeatures(data);
          } catch (error) {
            console.error(error);
          }
        };
        loadAllFeatures();

        const loadAllScenarios = async () => {
          try {
            const data = await getAllScenarios();
            setScenarios(data);
          } catch (error) {
            console.error(error);
          }
        };
        loadAllScenarios();
      }, []);

    return (
      <div>
        <Flex as="nav" p="10px" alignItems="center">
          <Heading as="h4">Scenario List</Heading>
          <Spacer />
          <HStack>
              <Button onClick={() => router.push('/scenarios/create')}>
                Create Scenario
              </Button>
          </HStack>
        </Flex>
        <Table.Root size="sm">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Feature</Table.ColumnHeader>
                <Table.ColumnHeader>Title</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {scenarios.map((scenario) => (
                <Table.Row key={scenario.id}>
                  <Table.Cell>{findById(features, scenario.featureId)?.name || "Not Found"}</Table.Cell>
                  <Table.Cell>{scenario.title}</Table.Cell>
                  <Table.Cell textAlign="end">
                    <Link href={`/scenarios/${scenario.id}`}>
                      Edit
                    </Link>
                    |
                    <Link href={`/scenarios/delete/${scenario.id}`}>
                      Delete
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
      </div>
    );
}