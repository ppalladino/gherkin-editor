export const dynamic = 'force-static'

import { NextResponse } from 'next/server'
import { GetStepTemplatesResponse, StepTemplateTypes } from '@/_types'
import { getAllStepTemplates, insertStepTemplate } from '@/_lib/db'
import { getTextEmbedding } from '@/_lib/textEmbedding'

const {PRECONDITION, ACTION, RESULT} = StepTemplateTypes;

const stepTemplates = [
    // {id: "stepTemplate1", type:PRECONDITION, title: "GIVEN I am a <role>", template: "GIVEN I am a [role:select:roles]"},
    // {id: "stepTemplate2", type:ACTION, title: "WHEN I navigate to <route>", template: "[action:select:step-actions] I navigate to [route:select:routes]"},
    // {id: "stepTemplate3", type:ACTION, title: "WHEN I input <text> into <field>", template: "[action:select:step-actions] I input [name:text:string] into the [ui-id:select:component-ids] field"},
    // {id: "stepTemplate4", type:ACTION, title: "WHEN I click <component>", template: "[action:select:step-actions] I click [ui-id:select:component-ids] button"},
    // {id: "stepTemplate5", type:ACTION, title: "WHEN I wait <seconds>", template: "[action:select:step-actions] I wait [wait-time:text:number] seconds"},
    // {id: "stepTemplate6", type:RESULT, title: "THEN I see <component>", template: "[action:select:step-outcomes] I see [ui-id:select:component-ids] component"},
    

            // {id: "stepTokenValues1", key: "roles", options: ["UNAUTHORIZED", "ADMIN", "EDITOR", "VIEWER"]},
            // {id: "stepTokenValues2", key: "routes", options: ["HOME", "STANDARD_SEARCH", "CONTACT"]},
            // {id: "stepTokenValues3", key: "step-preconditions", options: ["GIVEN", "AND"]},
            // {id: "stepTokenValues4", key: "step-actions", options: ["WHEN", "AND"]},
            // {id: "stepTokenValues5", key: "step-results", options: ["THEN", "AND"]},
            // {id: "stepTokenValues6", key: "component-ids", options: [
            //     "STANDARD_SEARCH_VALUE",
            //     "STANDARD_SEARCH_SUBMIT",
            //     "STANDARD_SEARCH_RESULTS",
            //     "STANDARD_EDITOR_TITLE",
            //     "STANDARD_EDITOR_SUBTITLE"
            //   ]
            // },


    // # Given
    {id:"0a16bdf6-d237-4980-a84f-e1ec7ec88d6f", type:PRECONDITION, title:"GIVEN|AND I am a <role> user",                            template: '[action:select:step-preconditions] I am a [role:select:roles] user', textEmbedding: []},
    // {id="21b40bd9-e082-4832-b125-871f411739fd", type=PRECONDITION, title="GIVEN the system has the following <entity> data", template: "GIVEN I am a [role:select:roles] user"},
    // {id:"64d5a1b7-e38a-4c4a-9dcb-94cf97ded83d", type:PRECONDITION, title:"GIVEN|AND I have navigated to <route> page", template: "GIVEN I am a [role:select:roles] user", textEmbedding: []},

    // # When / And
    {id:"eeb7be4f-fcc7-4396-babd-0ed27c0519bf", type:ACTION, title:"WHEN|AND I navigate to <route> page",                           template: '[action:select:step-actions] I navigate to [route:select:routes] page', textEmbedding: []},
    {id:"0813514a-5041-44b2-9672-5c71d694fb70", type:ACTION, title:"WHEN|AND I input <text> into <component> field",                template: '[action:select:step-actions] I input [name:text:string] into the [ui-id:select:component-ids] field', textEmbedding: []},
    {id:"aabac64d-dbba-4b7e-9f8b-3a1f596bcb72", type:ACTION, title:"WHEN|AND I clear <component> field",                            template: '[action:select:step-actions] I clear the [ui-id:select:component-ids] field', textEmbedding: []},
    {id:"7089964a-6d65-4ea1-9db4-19e4e277881f", type:ACTION, title:"WHEN|AND I click <component> button",                           template: '[action:select:step-actions] I click [ui-id:select:component-ids] button', textEmbedding: []},
    {id:"eb1d491e-ce6f-46b7-bc68-755a97125016", type:ACTION, title:"WHEN|AND I wait <number> seconds",                              template: '[action:select:step-actions] I wait [wait-time:text:number] seconds', textEmbedding: []},
    {id:"599462ac-2edc-4985-8178-e3596236889b", type:ACTION, title:"WHEN|AND I select <text> from <component> dropdown",            template: '[action:select:step-actions] I select the [option:text:string] option from the [ui-id:select:component-ids] dropdown', textEmbedding: []},
    {id:"380bb407-c48a-45c5-aaf8-47c565f72659", type:ACTION, title:"WHEN|AND I check <component> checkbox",                         template: '[action:select:step-actions] I check the [ui-id:select:component-ids] checkbox', textEmbedding: []},
    {id:"7e58fd16-0ed1-479e-97d8-fd76396c6bfd", type:ACTION, title:"WHEN|AND I uncheck <component> checkbox",                       template: '[action:select:step-actions] I un-check the [ui-id:select:component-ids] checkbox', textEmbedding: []},
    {id:"757d9df5-2526-4ada-bd7b-d10520ad4c8f", type:ACTION, title:"WHEN|AND I drag <component> to <component>",                    template: '[action:select:step-actions] I drag the [drag-ui-id:select:component-ids] to [drop-ui-id:select:component-ids]', textEmbedding: []},

    // # Then / And 
    {id:"53414dbb-c6b7-4f1a-a563-148283eb1f04", type:RESULT, title:"THEN|AND I see <component> component",                          template: '[action:select:step-results] I see the [ui-id:select:component-ids] component', textEmbedding: []},
    {id:"58be3a92-81bb-4cc9-99a5-6d11375c9589", type:RESULT, title:"THEN|AND I do NOT see <component> component",                   template: '[action:select:step-results] I see the [ui-id:select:component-ids] component', textEmbedding: []},
    {id:"eec5d136-d1ba-4c85-9712-6484df3ab79d", type:RESULT, title:"THEN|AND <component> component contains <text> text",           template: '[action:select:step-results] the [ui-id:select:component-ids] component contains [value:text:string] text', textEmbedding: []},
    {id:"af685208-542a-4876-92c4-f1c421e2c6fc", type:RESULT, title:"THEN|AND <component> component does not contain <text> text",   template: '[action:select:step-results] the [ui-id:select:component-ids] component does not contain [value:text:string] text', textEmbedding: []},
    {id:"10ac9533-e33a-47bd-9def-436bc953675b", type:RESULT, title:"THEN|AND <component> is checked",                               template: '[action:select:step-results] the [ui-id:select:component-ids] is checked', textEmbedding: []},
    {id:"56bc9064-b3e9-477d-9f51-53c274f85162", type:RESULT, title:"THEN|AND <component> is unchecked",                             template: '[action:select:step-results] the [ui-id:select:component-ids] is not checked', textEmbedding: []},
    {id:"aac3ff74-bb3b-4468-b168-3bdc99a9c8c0", type:RESULT, title:"THEN|AND <component> is disabled",                              template: '[action:select:step-results] the [ui-id:select:component-ids] is disabled', textEmbedding: []},
    {id:"08d5e4b3-5acd-483d-b713-33181aac5ebb", type:RESULT, title:"THEN|AND <component> is enabled",                               template: '[action:select:step-results] the [ui-id:select:component-ids] is enabled', textEmbedding: []},
    {id:"6865fe53-194b-48ec-bdb8-548010001fad", type:RESULT, title:"THEN|AND I see <number> items in <component> list",             template: '[action:select:step-results] is see [lengths:text:number] items in the [ui-id:select:component-ids] list', textEmbedding: []},
    {id:"a3b52ab8-2952-4f43-9158-e7ad4393ff4a", type:RESULT, title:"THEN|AND I see an error message <text>",                        template: '[action:select:step-results] is see an error message [error:text:string] in the [ui-id:select:component-ids] component', textEmbedding: []},
    // {id:"47ab77fe-d180-494a-be1d-eb3438833046", type:RESULT, title:"THEN|AND <component> has <attribute> = <freeText>", template: "GIVEN I am a [role:select:roles] user"},
]

export async function POST(request: Request) {
    const existingStepTemplates = getAllStepTemplates()
    if (existingStepTemplates.length > 0) {
        return NextResponse.json(
            {
                error: 'Step templates already exist, can not seed the database',
            },
            { status: 400 }
        );
    }

    for (const stepTemplate of stepTemplates) {
        const textEmbedding = await getTextEmbedding(stepTemplate.title)
        const updatedStepTemplate = {
            ...stepTemplate,
            textEmbedding,
        };
        insertStepTemplate(updatedStepTemplate)
    }

    // console.log("POST: seed step templates")
    // console.log(request)
    // console.log(request)
    // const stepTemplates = getAllStepTemplates()
    // return NextResponse.json<GetStepTemplatesResponse>({
    //     data: { stepTemplates }
    // })
    return NextResponse.json(null, { status: 200 });
}