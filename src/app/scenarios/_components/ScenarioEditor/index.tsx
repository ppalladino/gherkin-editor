"use client";

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Flex, FlexProps, Box, Tabs, Button } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaSortAmountDown, FaMagic, FaRecycle } from "react-icons/fa";
import { Scenario, ScenarioStep, ScenarioStepTokenValue, StepTemplate, DragTypes, ProjectAggregate } from "@/_types";
import { findById, reorderArray } from "@/_lib/utils";
import { findClosestMatchingStepTokenOptions, updateScenarioStepTokenValues } from "@/_lib/stepTemplate";
import StepTemplateDropZone from "./_components/StepDropZone";
import SemanticStepSorter from "./_components/SemanticStepSorter";
import ConvertTextToSteps from "./_components/ConvertTextToSteps";
import DraggableScenarioStepEditor from "./_components/DraggableScenarioStepEditor";
import { FaSadTear } from "react-icons/fa";

interface ScenarioEditorProps extends FlexProps {
  scenario: Scenario;
  projectAggregate: ProjectAggregate;
}

export default function ScenarioEditor({
  scenario: _scenario,
  projectAggregate,
  ...rest
}: ScenarioEditorProps) {
  const [scenario, setScenario] = useState<Scenario>(_scenario);

  const handleTokenValueChange = (
    scenarioTemplateStepId: string,
    tokenId: string,
    tokenValue: string,
  ) => {
    setScenario((prevScenario) => {
        const updatedStepTokenValues = updateScenarioStepTokenValues(prevScenario.stepTokenValues, {
            stepId: scenarioTemplateStepId,
            stepTokenKey: tokenId,
            tokenValue: tokenValue
        })

        return {
            ...prevScenario,
            stepTokenValues: updatedStepTokenValues,
        };
    });
  };

  const handleDelete = (stepId: string) => {
    const newSteps = scenario.steps.filter((step) => step.id !== stepId);
    setScenario((prevScenario) => ({
      ...prevScenario,
      steps: newSteps,
    }));
  };

  const handleAppendStepTemplates = (stepTemplates: StepTemplate[]) => {
    const newSteps = [
      ...scenario.steps,
      ...stepTemplates.map((stepTemplate) => ({
        id: uuidv4(),
        stepTemplateId: stepTemplate.id,
      })),
    ];
    setScenario((prevScenario) => ({
      ...prevScenario,
      steps: newSteps,
    }));
  };

  const appendBestMatch = (
    bestMatchStep: ScenarioStep,
    bestMatchScenarioStepTokenValues: ScenarioStepTokenValue[],
  ) => {

    setScenario((prevScenario) => {
      const updatedSteps = [
        ...scenario.steps,
        bestMatchStep,
      ];

      const updatedStepTokenValues = [...prevScenario.stepTokenValues, ...bestMatchScenarioStepTokenValues];

      return {
        ...prevScenario,
        steps: updatedSteps,
        stepTokenValues: updatedStepTokenValues,
      };
    });
  };

  const handleDrop = (dropIndex: number, item: any) => {
    switch(item.type) {
        case DragTypes.STEP_TEMPLATE: {
            const newSteps = [
                ...scenario.steps.slice(0, dropIndex),
                { id: uuidv4(), stepTemplateId: item.id },
                ...scenario.steps.slice(dropIndex),
            ];
            setScenario((prevScenario) => ({
                ...prevScenario,
                steps: newSteps,
            }));
            break;
        }
        case DragTypes.SCENARIO_STEP: {
            // Reorder existing steps
            const currentIndex = scenario.steps.findIndex((step) => step.id === item.id);
            if (currentIndex === -1) {
                console.error(`Step with id ${item.id} not found.`);
                return;
            }

            // If the dropIndex is the same as currentIndex or adjacent appropriately, no need to reorder
            if (currentIndex === dropIndex || currentIndex === dropIndex - 1) {
                // No change needed
                return;
            }

            // Reorder the steps
            const reorderedSteps = reorderArray(
                scenario.steps,
                currentIndex,
                dropIndex
            );

            setScenario((prevScenario) => ({
                ...prevScenario,
                steps: reorderedSteps,
            }));
            break;
        }
        case DragTypes.STEP_EDITOR: {
            console.log("DROPPED STEP EDITOR", item)
            const newSteps = [
                ...scenario.steps.slice(0, dropIndex),
                item.step,
                ...scenario.steps.slice(dropIndex),
            ];
            setScenario((prevScenario) => ({
                ...prevScenario,
                steps: newSteps,
                stepTokenValues: [...prevScenario.stepTokenValues, ...item.scenarioStepTokenValues]
            }));
            break;
        }
        default: {
            console.error(`Unsupported drag type: ${item.type}`)
        }
    }
  };

  const getEmptyDropZone = () => {
    return (
      <StepTemplateDropZone
        dropIndex={0}
        onDrop={handleDrop}
        flex="1"
        keepOpen={true}
      >
        <Flex
          direction="column"
          align="center"
          color="brand.300"
          textAlign="center"
          justify={"center"}
          minH="100%"
          minW="100%"
        >
          Scenario is Empty!
          <FaSadTear size={40} />
          Drag a Step Here...
        </Flex>
      </StepTemplateDropZone>
    );
  };

  let dropIndex = -1;

  return (
    <Flex {...rest} direction="column" flex="1">
      <DndProvider backend={HTML5Backend}>
        <Flex direction="row" flex="1">
          {/* Left Column */}
          <Flex flex="1.5" p={4} direction="column">
            <Tabs.Root
              fitted
              variant="enclosed"
              defaultValue="filter-steps"
              flex="1"
            >
              <Tabs.List rounded="l3" backgroundColor={"brand.600"}>
                <Tabs.Trigger
                  value="filter-steps"
                  color="brand.100"
                  _selected={{ bg: "brand.500", color: "brand.highlight" }}
                >
                  <FaSortAmountDown />
                  Semantic Sort
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="convert-text"
                  color="brand.100"
                  _selected={{ bg: "brand.500", color: "brand.highlight" }}
                >
                  <FaMagic />
                  Convert Text
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="recycle-scenario"
                  color="brand.100"
                  _selected={{ bg: "brand.500", color: "brand.highlight" }}
                >
                  <FaRecycle />
                  Copy Scenario
                </Tabs.Trigger>
                <Tabs.Indicator
                  backgroundColor="brand.500"
                  css={{ color: "brand.highlight" }}
                  rounded="l2"
                  boxShadow={"none!important"}
                  border={"none!important"}
                />
              </Tabs.List>
              <Tabs.Content value="filter-steps" flex="1">
                <SemanticStepSorter
                    stepTemplates={projectAggregate.stepTemplates}
                    stepTokens={projectAggregate.stepTokens}
                    stepTokenOptions={projectAggregate.stepTokenOptions}
                    onEnterClicked={appendBestMatch}
                    onAddBestGuess={appendBestMatch}
                    onAddStepTemplate={(stepTemplate) => {handleAppendStepTemplates([stepTemplate])}}
                />
              </Tabs.Content>
              <Tabs.Content value="convert-text" flex="1">
                <ConvertTextToSteps
                  stepTemplates={projectAggregate.stepTemplates}
                  onAppendSuggestions={(stepTemplates) =>
                    handleAppendStepTemplates(stepTemplates)
                  }
                />
              </Tabs.Content>
              <Tabs.Content value="recycle-scenario" flex="1">
                Re-use an existing scenario
              </Tabs.Content>
            </Tabs.Root>
          </Flex>

          {/* Right Column */}
          <Flex flex="2" p={4} direction="column">
            {scenario.steps.length === 0 ? (
              getEmptyDropZone()
            ) : (
              <Box
                p={4}
                border="2px dashed"
                borderColor="brand.400"
                rounded="md"
                flex="1"
              >
                {scenario.steps.map((step) => {
                  dropIndex++;
                  return (
                    <React.Fragment key={step.id}>
                      <StepTemplateDropZone
                        dropIndex={dropIndex}
                        onDrop={handleDrop}
                      />
                      <DraggableScenarioStepEditor
                        scenarioStepTokenValues={scenario.stepTokenValues}
                        step={step}
                        stepTemplate={findById(
                          projectAggregate.stepTemplates,
                          step.stepTemplateId
                        )}
                        stepTokens={projectAggregate.stepTokens}
                        stepTokenOptions={projectAggregate.stepTokenOptions}
                        onDelete={handleDelete}
                        onTokenValueChange={handleTokenValueChange}
                      />
                    </React.Fragment>
                  );
                })}
                <StepTemplateDropZone
                  dropIndex={dropIndex + 1}
                  onDrop={handleDrop}
                />
              </Box>
            )}
            <Flex mt="20px" justify="right">
              <Button>Save Scenario</Button>
            </Flex>
          </Flex>
        </Flex>
      </DndProvider>
    </Flex>
  );
}
