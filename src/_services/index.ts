import { Scenario, Feature, StepTemplate } from "@/_types";

export const getAllStepTemplates = async (): Promise<StepTemplate[]> => {
    const stepTemplates = [
        {id: "stepTemplate1", title: "GIVEN I am a <role>", template: "GIVEN I am a [role:select:roles]"},
        {id: "stepTemplate2", title: "WHEN I navigate to <route>", template: "[action:select:step-actions] I navigate to [route:select:routes]"},
        {id: "stepTemplate3", title: "WHEN I input <text> into <field>", template: "[action:select:step-actions] I input [name:text:string] into the [ui-id:select:component-ids] field"},
        {id: "stepTemplate4", title: "WHEN I click <component>", template: "[action:select:step-actions] I click [ui-id:select:component-ids] button"},
        {id: "stepTemplate5", title: "WHEN I wait <seconds>", template: "[action:select:step-actions] I wait [wait-time:text:number] seconds"},
        {id: "stepTemplate6", title: "THEN I see <component>", template: "[action:select:step-outcomes] I see [ui-id:select:component-ids] component"},
    ]
    return stepTemplates;
};

export const getAllFeatures = async (): Promise<Feature[]> => {
    return [
        { id: 'b8b0d3bd-4678-4135-94eb-f4b96831d7fb', name: 'Feature 1' },
        { id: 'a78c023f-bc55-411e-aa2d-f146aeaa04e6', name: 'Feature 2' },
        { id: '413185eb-2959-4b58-95ac-0751e9ab43c3', name: 'Feature 3' }
    ]
};

export const getAllScenarios = async (): Promise<Scenario[]> => {
    const scenarios = [
            {
            id: "b50b6c89-78b7-4bc3-b82e-6b5020d51201",
            title: "Sample Scenario 1",
            featureId: "b8b0d3bd-4678-4135-94eb-f4b96831d7fb",
            stepTokenValues: [
                {stepId: "0c1a9a53-1db5-4e1e-8711-d0e39cedf46b", tokenKey: "role", tokenValue: "EDITOR"}
            ],
            steps: [
                {id: "0c1a9a53-1db5-4e1e-8711-d0e39cedf46b", stepTemplateId: "stepTemplate1"},
                {id: "b33941e3-8894-4e0d-8469-e29cb27185ef", stepTemplateId: "stepTemplate2"},
                {id: "e11f0c0e-7e95-4aca-b921-c6e48c590e32", stepTemplateId: "stepTemplate3"},
                {id: "69fc80ed-ab1e-47c5-8e8f-63327eb30ea5", stepTemplateId: "stepTemplate4"},
                {id: "d7c1436f-b4bc-4750-b16d-0710301c1f45", stepTemplateId: "stepTemplate5"},
                {id: "428e6dfa-a87d-45c5-b423-650006417370", stepTemplateId: "stepTemplate6"},
            ]
        }
    ]
    return scenarios;
};