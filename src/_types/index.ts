export interface StepTokenOptions {
    id: string;
    key: string;
    options: string[];
}

export interface StepTemplate {
    id: string;
    title: string;
    template: string;
}

export interface ScenarioStep {
    id: string;
    stepTemplateId: string;
}

export interface ScenarioStepTokenValue {
    stepId: string;
    tokenKey: string;
    tokenValue: string;
}

export interface Scenario {
    id: string;
    title: string;
    featureId: string;
    steps: ScenarioStep[];
    stepTokenValues: ScenarioStepTokenValue[];
}

export interface Feature {
    id: string;
    name: string;
}

export const DragTypes = {
    STEP_TEMPLATE: 'STEP_TEMPLATE',
    SCENARIO_STEP: 'SCENARIO_STEP'
}