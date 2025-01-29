export const dynamic = 'force-static'

import { NextResponse } from 'next/server'
import { GetStepTemplatesResponse } from '@/_types'
import { updateStepTemplate, getStepTemplate } from '@/_lib/db'
import { getTextEmbedding } from '@/_lib/textEmbedding'
 
export async function PATCH(request: Request) {
    const stepTemplate = await request.json()
    const textEmbedding = await getTextEmbedding(stepTemplate.title)
    const updatedStepTemplate = {
        ...stepTemplate,
        textEmbedding,
    };
    updateStepTemplate(updatedStepTemplate)

    const selectedStepTemplate = getStepTemplate(stepTemplate.id);


    return NextResponse.json<GetStepTemplatesResponse>({
        data: { stepTemplate: selectedStepTemplate }
    })
}