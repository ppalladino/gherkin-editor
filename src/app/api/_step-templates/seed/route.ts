export const dynamic = 'force-static'

import { NextResponse } from 'next/server'
import { GetStepTemplatesResponse, StepTemplateTypes } from '@/_types'
import { getAllStepTemplates, insertStepTemplate } from '@/_db'
import { getTextEmbedding } from '@/_lib/textEmbedding'

const {PRECONDITION, ACTION, RESULT} = StepTemplateTypes;



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