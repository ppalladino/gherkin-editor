import { StepTemplateTypes, StepTemplate, StepToken, StepTokenOption, StepTokenOptionStatus } from '@/_types'

const {PRECONDITION, ACTION, RESULT} = StepTemplateTypes;

export const mockStepTemplates: StepTemplate[] = [
    // # Given
    {id:"0a16bdf6-d237-4980-a84f-e1ec7ec88d6f", projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994", type:PRECONDITION, title:"GIVEN|AND I am a <role> user",                            template: '[action:select:step-preconditions] I am a [role:select:roles] user',                                                     titleTextEmbedding: []},

    // # When / And
    {id:"eeb7be4f-fcc7-4396-babd-0ed27c0519bf", projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994", type:ACTION, title:"WHEN|AND I navigate to <route> page",                           template: '[action:select:step-actions] I navigate to [route:select:routes] page',                                                  titleTextEmbedding: []},
    {id:"0813514a-5041-44b2-9672-5c71d694fb70", projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994", type:ACTION, title:"WHEN|AND I input <text> into <component> field",                template: '[action:select:step-actions] I input [name:text:string] into the [ui-id:select:component-ids] field',                    titleTextEmbedding: []},
    {id:"aabac64d-dbba-4b7e-9f8b-3a1f596bcb72", projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994", type:ACTION, title:"WHEN|AND I clear <component> field",                            template: '[action:select:step-actions] I clear the [ui-id:select:component-ids] field',                                            titleTextEmbedding: []},
    {id:"7089964a-6d65-4ea1-9db4-19e4e277881f", projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994", type:ACTION, title:"WHEN|AND I click <component> button",                           template: '[action:select:step-actions] I click [ui-id:select:component-ids] button',                                               titleTextEmbedding: []},
    {id:"eb1d491e-ce6f-46b7-bc68-755a97125016", projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994", type:ACTION, title:"WHEN|AND I wait <number> seconds",                              template: '[action:select:step-actions] I wait [wait-time:text:number] seconds',                                                    titleTextEmbedding: []},
    {id:"599462ac-2edc-4985-8178-e3596236889b", projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994", type:ACTION, title:"WHEN|AND I select <text> from <component> dropdown",            template: '[action:select:step-actions] I select the [option:text:string] option from the [ui-id:select:component-ids] dropdown',   titleTextEmbedding: []},
    {id:"380bb407-c48a-45c5-aaf8-47c565f72659", projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994", type:ACTION, title:"WHEN|AND I check <component> checkbox",                         template: '[action:select:step-actions] I check the [ui-id:select:component-ids] checkbox',                                         titleTextEmbedding: []},
    {id:"7e58fd16-0ed1-479e-97d8-fd76396c6bfd", projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994", type:ACTION, title:"WHEN|AND I uncheck <component> checkbox",                       template: '[action:select:step-actions] I un-check the [ui-id:select:component-ids] checkbox',                                      titleTextEmbedding: []},
    {id:"757d9df5-2526-4ada-bd7b-d10520ad4c8f", projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994", type:ACTION, title:"WHEN|AND I drag <component> to <component>",                    template: '[action:select:step-actions] I drag the [drag-ui-id:select:component-ids] to [drop-ui-id:select:component-ids]',         titleTextEmbedding: []},

    // # Then / And 
    {id:"53414dbb-c6b7-4f1a-a563-148283eb1f04", projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994", type:RESULT, title:"THEN|AND I see <component> component",                          template: '[action:select:step-results] I see the [ui-id:select:component-ids] component',                                          titleTextEmbedding: []},
    {id:"58be3a92-81bb-4cc9-99a5-6d11375c9589", projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994", type:RESULT, title:"THEN|AND I do NOT see <component> component",                   template: '[action:select:step-results] I see the [ui-id:select:component-ids] component',                                          titleTextEmbedding: []},
    {id:"eec5d136-d1ba-4c85-9712-6484df3ab79d", projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994", type:RESULT, title:"THEN|AND <component> component contains <text> text",           template: '[action:select:step-results] the [ui-id:select:component-ids] component contains [value:text:string] text',              titleTextEmbedding: []},
    {id:"af685208-542a-4876-92c4-f1c421e2c6fc", projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994", type:RESULT, title:"THEN|AND <component> component does not contain <text> text",   template: '[action:select:step-results] the [ui-id:select:component-ids] component does not contain [value:text:string] text',      titleTextEmbedding: []},
    {id:"10ac9533-e33a-47bd-9def-436bc953675b", projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994", type:RESULT, title:"THEN|AND <component> is checked",                               template: '[action:select:step-results] the [ui-id:select:component-ids] is checked',                                               titleTextEmbedding: []},
    {id:"56bc9064-b3e9-477d-9f51-53c274f85162", projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994", type:RESULT, title:"THEN|AND <component> is unchecked",                             template: '[action:select:step-results] the [ui-id:select:component-ids] is not checked',                                           titleTextEmbedding: []},
    {id:"aac3ff74-bb3b-4468-b168-3bdc99a9c8c0", projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994", type:RESULT, title:"THEN|AND <component> is disabled",                              template: '[action:select:step-results] the [ui-id:select:component-ids] is disabled',                                              titleTextEmbedding: []},
    {id:"08d5e4b3-5acd-483d-b713-33181aac5ebb", projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994", type:RESULT, title:"THEN|AND <component> is enabled",                               template: '[action:select:step-results] the [ui-id:select:component-ids] is enabled',                                               titleTextEmbedding: []},
    {id:"6865fe53-194b-48ec-bdb8-548010001fad", projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994", type:RESULT, title:"THEN|AND I see <number> items in <component> list",             template: '[action:select:step-results] is see [lengths:text:number] items in the [ui-id:select:component-ids] list',               titleTextEmbedding: []},
    {id:"a3b52ab8-2952-4f43-9158-e7ad4393ff4a", projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994", type:RESULT, title:"THEN|AND I see an error message <text>",                        template: '[action:select:step-results] is see an error message [error:text:string] in the [ui-id:select:component-ids] component', titleTextEmbedding: []},
]

export const mockStepTokens: StepToken[] = [
    {id: "a7a46643-ae0c-4288-9c02-ccd8aa87e8db", key: "roles"               , projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994"},
    {id: "82a42f84-08c3-41e3-a585-469b17d6f4fc", key: "routes"              , projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994"},
    {id: "03e70aa7-8922-45e7-8ac5-1b818237fc94", key: "step-preconditions"  , projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994"},
    {id: "8cbb8d1d-661b-45f6-91fa-34a5b21f447f", key: "step-actions"        , projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994"},
    {id: "6923823a-ae69-4c09-b39c-4a0191878e56", key: "step-results"        , projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994"},
    {id: "21554b35-df84-4d20-a568-90e959115d3a", key: "component-ids"       , projectId: "708af4a5-9cf8-43ba-9dc3-14407f510994"}
]

export const mockStepTokenOptions: StepTokenOption[] = [
    // ROLES
    {id: "901dde1d-0821-42d7-9b0d-61db59523e39", status: StepTokenOptionStatus.PUBLISHED, stepTokenId: "a7a46643-ae0c-4288-9c02-ccd8aa87e8db", value: "UNAUTHORIZED", valueTextEmbedding: []},
    {id: "398aa058-8a5b-4678-bb06-add85e2ef727", status: StepTokenOptionStatus.PUBLISHED, stepTokenId: "a7a46643-ae0c-4288-9c02-ccd8aa87e8db", value: "ADMIN", valueTextEmbedding: []},
    {id: "3820de97-a72f-42c6-8395-28a1c1069044", status: StepTokenOptionStatus.PUBLISHED, stepTokenId: "a7a46643-ae0c-4288-9c02-ccd8aa87e8db", value: "EDITOR", valueTextEmbedding: []},
    {id: "656033e5-963d-40ba-af09-e6b1d8b81db6", status: StepTokenOptionStatus.PUBLISHED, stepTokenId: "a7a46643-ae0c-4288-9c02-ccd8aa87e8db", value: "VIEWER", valueTextEmbedding: []},

    // ROUTES
    {id: "ca1dcef6-3ce7-4b99-8f7b-070ce2b2a588", status: StepTokenOptionStatus.PUBLISHED, stepTokenId: "82a42f84-08c3-41e3-a585-469b17d6f4fc", value: "HOME", valueTextEmbedding: []},
    {id: "b1a7824c-8e02-4fe7-b635-18f83c612597", status: StepTokenOptionStatus.PUBLISHED, stepTokenId: "82a42f84-08c3-41e3-a585-469b17d6f4fc", value: "STANDARD_SEARCH", valueTextEmbedding: []},
    {id: "2b96c5e4-96b4-48bd-a8ec-ec97529c9c3f", status: StepTokenOptionStatus.PUBLISHED, stepTokenId: "82a42f84-08c3-41e3-a585-469b17d6f4fc", value: "OPTIONS", valueTextEmbedding: []},

    // STEP PRECONDITIONS
    {id: "6567b2ef-bc6a-4309-9fd5-43720fab357c", status: StepTokenOptionStatus.PUBLISHED, stepTokenId: "03e70aa7-8922-45e7-8ac5-1b818237fc94", value: "GIVEN", valueTextEmbedding: []},
    {id: "8e80debf-726f-4890-a530-d7de8cf7edbf", status: StepTokenOptionStatus.PUBLISHED, stepTokenId: "03e70aa7-8922-45e7-8ac5-1b818237fc94", value: "AND", valueTextEmbedding: []},

    // STEP ACTIONS
    {id: "2e44e9d3-d9d4-4d01-9246-93403ed4867d", status: StepTokenOptionStatus.PUBLISHED, stepTokenId: "8cbb8d1d-661b-45f6-91fa-34a5b21f447f", value: "WHEN", valueTextEmbedding: []},
    {id: "38632698-5b3b-4a49-a1de-3f1a19947c41", status: StepTokenOptionStatus.PUBLISHED, stepTokenId: "8cbb8d1d-661b-45f6-91fa-34a5b21f447f", value: "AND", valueTextEmbedding: []},

    // STEP RESULTS
    {id: "44080df0-bdc8-4063-8572-7b80971bc5e9", status: StepTokenOptionStatus.PUBLISHED, stepTokenId: "6923823a-ae69-4c09-b39c-4a0191878e56", value: "THEN", valueTextEmbedding: []},
    {id: "00361e19-786d-4934-9e63-3bf45794de31", status: StepTokenOptionStatus.PUBLISHED, stepTokenId: "6923823a-ae69-4c09-b39c-4a0191878e56", value: "AND", valueTextEmbedding: []},

    // COMPONENT IDS
    {id: "c3ce4f3a-753c-4c43-bcd3-77cd3715db9a", status: StepTokenOptionStatus.PUBLISHED, stepTokenId: "21554b35-df84-4d20-a568-90e959115d3a", value: "STANDARD_SEARCH_VALUE", valueTextEmbedding: []},
    {id: "ab36fca4-7baa-4907-9e51-f4eedeb644d3", status: StepTokenOptionStatus.PUBLISHED, stepTokenId: "21554b35-df84-4d20-a568-90e959115d3a", value: "STANDARD_SEARCH_SUBMIT", valueTextEmbedding: []},
    {id: "cac3e1d4-9212-41ae-8733-f3084b6cee03", status: StepTokenOptionStatus.PUBLISHED, stepTokenId: "21554b35-df84-4d20-a568-90e959115d3a", value: "STANDARD_SEARCH_RESULTS", valueTextEmbedding: []},
    {id: "9eb3a311-c1e0-47a6-8cf3-e3b2ff9d88fe", status: StepTokenOptionStatus.PUBLISHED, stepTokenId: "21554b35-df84-4d20-a568-90e959115d3a", value: "STANDARD_EDITOR_TITLE", valueTextEmbedding: []},
    {id: "a31248a7-c974-4213-8233-354afee08c2f", status: StepTokenOptionStatus.PUBLISHED, stepTokenId: "21554b35-df84-4d20-a568-90e959115d3a", value: "STANDARD_EDITOR_SUBTITLE", valueTextEmbedding: []},
]