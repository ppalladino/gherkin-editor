import { ScenarioStep } from "@/_types";
import { reorderArray } from "./utils";

// Not tested !!!

// export const reorderSteps = (steps: ScenarioStep[], moveStep: ScenarioStep, moveToIndex: number) : ScenarioStep[] => {
//     // Reorder existing steps
//     const moveFromIndex = steps.findIndex(s => s.id === moveStep.id);

//     if (moveFromIndex === -1) {
//         console.error(`Step with id ${moveStep.id} not found.`);
//         return steps;
//     }

//     // If the moveToIndex is the same as currentIndex or adjacent appropriately, no need to reorder
//     if (moveFromIndex === moveToIndex) {
//         // No change needed
//         return steps;
//     }

//     // Reorder the steps
//     return reorderArray(steps, moveFromIndex, moveToIndex);
// }