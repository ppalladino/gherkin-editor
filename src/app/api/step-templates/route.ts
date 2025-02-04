export const dynamic = 'force-static'

import { NextResponse } from 'next/server'
import { StepTemplate } from '@/_types'
import { getTextEmbedding } from '@/_lib/textEmbedding'
import { 
    getStepTemplates as getRecords, 
    insertStepTemplate as insertModel 
} from '@/_db'

 
export async function GET() {
    const stepTemplates = getRecords();
    return NextResponse.json<{data: { stepTemplates: StepTemplate[]}}>({
        data: { stepTemplates }
    })
}

export async function POST(
    request: Request
) {
    const body: StepTemplate = await request.json();

    const titleTextEmbedding = await getTextEmbedding(body.title)
    const updatedStepTemplate = {
        ...body,
        titleTextEmbedding,
    };

    const stepTemplate = insertModel(updatedStepTemplate)
    return NextResponse.json<{data: { stepTemplate: StepTemplate}}>({
        data: { stepTemplate: updatedStepTemplate }
    })
}