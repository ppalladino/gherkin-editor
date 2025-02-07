import { StepTemplate, StepTokenOption, StepToken, StepTokenInputType, StepTemplateSegment, StepTemplateTokenPlaceholder, ScenarioStepTokenValue } from "@/_types"
import { getTextEmbedding } from "./textEmbedding"

export const destringifyToken = (token: string): StepTemplateTokenPlaceholder => {
    const [id, inputType, tokenConstraint] = token.split(":");
    return {
        id,
        inputType: inputType as StepTokenInputType,
        tokenConstraint
    };
}

export const getTemplateSegments = (stepTemplate: StepTemplate): StepTemplateSegment[] => {
    const tokenRegex = /\[([^\]]+)\]/g;
    const segments = stepTemplate.template.split(tokenRegex);

    return segments.map((segmentValue, index) => {
        const isTokenPlaceholder = index % 2 === 1; // odd index => token

        return {
            index,
            isTokenPlaceholder,
            segmentValue,
            tokenPlaceholder: isTokenPlaceholder ? destringifyToken(segmentValue) : null
        } 
    })  
}

function cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) {
      throw new Error("Vectors must have the same length.");
    }
  
    // Dot product
    const dotProduct = a.reduce((acc, v, i) => acc + v * b[i], 0);
  
    // Magnitude (L2 norm)
    const magnitudeA = Math.sqrt(a.reduce((acc, v) => acc + v * v, 0));
    const magnitudeB = Math.sqrt(b.reduce((acc, v) => acc + v * v, 0));
  
    // Avoid division by zero
    if (magnitudeA === 0 || magnitudeB === 0) {
      return 0;
    }
  
    return dotProduct / (magnitudeA * magnitudeB);
}

export async function findClosestMatchingStepTemplate(
    subject: string,
    templateRecords: StepTemplate[]
  ): Promise<StepTemplate | null>  {

    if (subject.trim() === "") {
        return null
    }
    
    const subjectEmbedding = await getTextEmbedding(subject);

    let bestMatch: StepTemplate | null = null;
    let bestSimilarity = -Infinity;
  
    for (const record of templateRecords) {
      const similarity = cosineSimilarity(subjectEmbedding, record.titleTextEmbedding);
      if (similarity > bestSimilarity) {
        bestMatch = record;
        bestSimilarity = similarity;
      }
    }
  
    return bestMatch;
}

const gherkinStepKeywordTokenOptions = ["step-preconditions", "step-actions", "step-results"]

export function findClosestMatchingStepTokenOptions(
    userInput: string,
    userInputTextEmbedding: number[],
    stepTemplate: StepTemplate,
    stepTokens: StepToken[],
    stepTokenOptions: StepTokenOption[]
  ): Array<{ stepTemplateTokenPlaceholderId: string; bestOption: StepTokenOption | null }> {
    // 1. Get all segments from the template, then filter down to token segments
    const tokenSegments = getTemplateSegments(stepTemplate).filter((segment) => segment.isTokenPlaceholder && segment.tokenPlaceholder?.inputType === StepTokenInputType.SELECT);
  
    return tokenSegments.map((segment) => {
      // Each token segment should have a tokenConstraint (key) we can match on
      const tokenKey = segment.tokenPlaceholder?.tokenConstraint;
  
      // Find a corresponding StepToken by the tokenKey
      const matchingStepToken = stepTokens.find((stepToken) => stepToken.key === tokenKey);
  
      // If there's no matching StepToken, log and return a null match
      if (!matchingStepToken) {
        console.error(`Unable to find matching step token for template segment key: ${tokenKey}`);
        return {
          stepTemplateSegmentTokenId: segment.tokenPlaceholder?.id,
          similarOption: null,
        };
      }
  
      // Gather all StepTokenOptions for the matching token
      const matchingOptions = stepTokenOptions.filter(
        (option) => option.stepTokenId === matchingStepToken.id
      );
  
      // Compute similarity for each option, then sort descending by similarity
      const optionsSortedBySimilarity = matchingOptions
        .map((option) => ({
          option,
          similarity: cosineSimilarity(userInputTextEmbedding, option.valueTextEmbedding),
        }))
        .sort((a, b) => b.similarity - a.similarity);
  
      // Take the highest similarity option or null if none exist
      const bestOption = optionsSortedBySimilarity[0]?.option ?? null;
  
      // Return the result for this segment
      return {
        stepTemplateTokenPlaceholderId: segment.tokenPlaceholder?.id,
        bestOption: bestOption,
      };
    });
  }
  
export function orderByBestMatchingStepTemplates(
    subjectEmbedding: number[],
    templateRecords: StepTemplate[]
  ): StepTemplate[] {
    // Obtain the embedding for the subject text
  
    // Map each StepTemplate to its similarity score
    const templatesWithSimilarity = templateRecords.map((record) => {
      const similarity = cosineSimilarity(subjectEmbedding, record.titleTextEmbedding);
      return { record, similarity };
    });
  
    // Sort the templates by similarity in descending order (best match first)
    templatesWithSimilarity.sort((a, b) => b.similarity - a.similarity);
  
    // Extract the sorted StepTemplate records
    const sortedTemplates = templatesWithSimilarity.map((item) => item.record);
  
    return sortedTemplates;
  }


export function updateScenarioStepTokenValues(stepTokenValues: ScenarioStepTokenValue[], newStepTokenValue: ScenarioStepTokenValue) {
    const updatedStepTokenValues = [...stepTokenValues];

    console.log({stepTokenValues, newStepTokenValue})
    
    const existingIndex = updatedStepTokenValues.findIndex(
        (item) =>
          item.stepId === newStepTokenValue.stepId &&
          item.stepTokenKey === newStepTokenValue.stepTokenKey
    );

    if (existingIndex > -1) {
        updatedStepTokenValues[existingIndex] = {
            ...updatedStepTokenValues[existingIndex],
            tokenValue: newStepTokenValue.tokenValue,
        };
      } else {
        updatedStepTokenValues.push(newStepTokenValue);
    }
    return updatedStepTokenValues
}