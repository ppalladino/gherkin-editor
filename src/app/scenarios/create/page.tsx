"use client"

import { useEffect, useState } from "react";
import { Heading } from "@chakra-ui/react";
import { Scenario, StepTemplate } from "@/_types";
import { getAllStepTemplates } from "@/_services";
import ScenarioEditor from "@/app/scenarios/_components/ScenarioEditor";

const sampleScenario: Scenario = {
  id: "sampleScenario1",
  title: "Sample Scenario 1",
  featureId: "sampleFeature1",
  stepTokenValues: [
      {stepId: "step1", tokenKey: "role", tokenValue: "EDITOR"}
  ],
  steps: [
      {id: "step1", stepTemplateId: "stepTemplate1"},
      {id: "step2", stepTemplateId: "stepTemplate2"},
      {id: "step3", stepTemplateId: "stepTemplate3"},
      {id: "step4", stepTemplateId: "stepTemplate4"},
      {id: "step5", stepTemplateId: "stepTemplate5"},
      {id: "step6", stepTemplateId: "stepTemplate6"},
  ]
}

export default function CreateScenarioPage() {
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
        <main>
          <Heading>Create Scenario</Heading>
          <ScenarioEditor scenario={sampleScenario} stepTemplates={stepTemplates}/>
        </main>
    );
}