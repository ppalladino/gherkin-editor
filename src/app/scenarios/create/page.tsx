"use client"

import React, { useEffect, useState } from "react";
import { Heading, Flex } from "@chakra-ui/react";
import { Scenario, StepTemplate, StepTokenOptions } from "@/_types";
import { getAllStepTemplates, getAllStepTokenOptions } from "@/_services";
import ScenarioEditor from "@/app/scenarios/_components/ScenarioEditor";
import { v4 as uuidv4 } from 'uuid';

const newScenario: Scenario = {
  id: uuidv4(),
  title: "New Title",
  featureId: "",
  stepTokenValues: [],
  steps: []
}

export default function CreateScenarioPage() {
    const [stepTemplates, setStepTemplates] = useState<StepTemplate[]>([]);
    const [stepTokenOptions, setStepTokenOptions] = useState<StepTokenOptions[]>([]);

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

      const loadAllStepTokenOptions = async () => {
        try {
          const data = await getAllStepTokenOptions();
          setStepTokenOptions(data);
        } catch (error) {
          console.error(error);
        }
      };
      loadAllStepTokenOptions();
    }, []);

    return (
        <Flex flex="1" direction="column">
            <Heading>Create Scenario</Heading>
            <ScenarioEditor 
                scenario={newScenario} 
                stepTemplates={stepTemplates}
                stepTokenOptions={stepTokenOptions}
            />
        </Flex>
    );
}