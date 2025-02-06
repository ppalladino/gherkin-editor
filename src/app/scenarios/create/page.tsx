"use client"

import React, { useEffect, useState } from "react";
import { Heading, Flex } from "@chakra-ui/react";
import { Scenario } from "@/_types";
import { useGetProjectAggregateQuery } from "@/_services"
import ScenarioEditor from "@/app/scenarios/_components/ScenarioEditor";
import { v4 as uuidv4 } from 'uuid';
import Spinner from "@/_components/Spinner";

const newScenario: Scenario = {
  id: uuidv4(),
  title: "New Title",
  featureId: "",
  stepTokenValues: [],
  steps: []
}

export default function CreateScenarioPage() {
    const { 
        data: getProjectAggregateData, 
        error: getProjectAggregateError, 
        isLoading: getProjectAggregateLoading 
    } = useGetProjectAggregateQuery("fake-uuid-1234")

    let isLoading = getProjectAggregateLoading
    let isData = getProjectAggregateData
    let isError = getProjectAggregateError

    return (
        <>
            { isLoading && <Spinner /> } 

            {
                isData && 
                <Flex flex="1" direction="column">
                    <Heading>Create Scenario</Heading>
                    <ScenarioEditor 
                        scenario={newScenario} 
                        projectAggregate={getProjectAggregateData.data.projectAggregate}
                    />
                </Flex>
            }

            {isError && <div>getProjectAggregateError: {JSON.stringify(getProjectAggregateError)}</div>}
        </>     
    );
}