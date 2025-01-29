export const DragTypes = {
    STEP_TEMPLATE: 'STEP_TEMPLATE',
    SCENARIO_STEP: 'SCENARIO_STEP'
}

export const StepTemplateTypes = {
    PRECONDITION : 'PRECONDITION',
    ACTION: 'ACTION',
    RESULT: 'RESULT'
}

export enum StepTokenInputType {
    SELECT = 'select',
    TEXT = 'text',
}

export enum TokenStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
}

export interface StepToken {
    tokenKey: string;
    inputType: StepTokenInputType;
    tokenConstraint: string;
}

export interface StepTokenOptions {
    id: string;
    key: string;
    options: {status:string, value:string}[];
}

export interface StepTemplate {
    id: string;
    type: string;
    title: string;
    template: string;
    textEmbedding: number[];
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

export interface ReponseBase {
    data: any;
}

export interface GetStepTemplatesResponse extends ReponseBase {
    data: {
        stepTemplates: StepTemplate[];
    }
}

export interface GetStepTemplateResponse extends ReponseBase {
    data: {
        stepTemplate: StepTemplate;
    }
}

export interface GetAllStepTokenOptionsResponse extends ReponseBase {
    data: {
        stepTokenOptions: StepTokenOptions[];
    }
}

export interface GetStepTokenOptionsResponse extends ReponseBase {
    data: {
        stepTokenOptions: StepTokenOptions;
    }
}



