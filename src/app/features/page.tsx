"use client"

import React, { useEffect, useState } from 'react';
import { Table, Heading } from "@chakra-ui/react"
import { Feature } from '@/_types'
import { getAllFeatures } from '@/_services/_index'

export default function Features() {
    const [features, setFeatures] = useState<Feature[]>([]);

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
      }, []);
    
    return (
      <div>
          <Table.Root size="sm">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Product</Table.ColumnHeader>
                <Table.ColumnHeader>Category</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {features.map((feature) => (
                <Table.Row key={feature.id}>
                  <Table.Cell>{feature.name}</Table.Cell>
                  <Table.Cell>Blah</Table.Cell>
                  <Table.Cell textAlign="end">Blurg</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
      </div>
    );
}