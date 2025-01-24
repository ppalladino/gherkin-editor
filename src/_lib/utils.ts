import { ScenarioStepTokenValue } from '@/_types';

export function findById<T extends { id: string }>(list: T[], id: string): T | undefined {
    return list.find(item => item.id === id);
}

export const reorderArray = <T,>(array: T[], fromIndex: number, toIndex: number): T[] => {
    const newArray = [...array];
    const [movedItem] = newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, movedItem);
    return newArray;
};

export function findByKey<T extends { key: string }>(list: T[], key: string): T | undefined {
    return list.find(item => item.key === key);
}

export function findScenarioStepTokenValue(stepTokenValues: ScenarioStepTokenValue[], stepId: string, tokenKey: string): string | undefined {
    return stepTokenValues.find(item => item.stepId === stepId && item.tokenKey === tokenKey)?.tokenValue;
}
