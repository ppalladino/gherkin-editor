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

export enum StepTokenOptionStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
}

export interface Organization {
    id: string;
    name: string;
}

export interface Project {
    id: string;
    name: string;
    organizationId: string;
}

// export interface StepToken {
//     tokenKey: string;
//     inputType: StepTokenInputType;
//     tokenConstraint: string;
// }

export interface StepTokenOptionsValue {
    id: string;
    status:string;
    value:string;
    textEmbedding: number[];
}

export interface StepTokenOptions {
    id: string;
    key: string;
    options: StepTokenOptionsValue[];
}

export interface StepTemplate {
    id: string;
    type: string;
    title: string;
    template: string;
    projectId: string;
    titleTextEmbedding: number[];
}

export interface StepToken {
    id: string;
    key: string;
    projectId: string;
}

export interface StepTokenOption {
    id: string;
    status: string;
    value: string;
    stepTokenId: string;
    valueTextEmbedding: number[];
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

// AGGREGATE MODELS

export interface StepTokenAggregate extends StepToken {
    stepTokenOptions: StepTokenOption[]
}

export interface ProjectAggregate {
    project: Project | undefined,
    stepTemplates: StepTemplate[],
    stepTokens: StepToken[],
    stepTokenOptions: StepTokenOption[],
    stepTokensAggregate: StepTokenAggregate[]
}



