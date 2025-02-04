export const dynamic = 'force-static'

import { NextResponse } from 'next/server'
import { StepTokenOption } from '@/_types'
import { 
    getStepTokenOptions as getRecords, 
    insertStepTokenOption as insertModel 
} from '@/_db'
import { getTextEmbedding } from '@/_lib/textEmbedding'

 
export async function GET() {
    const stepTokenOptions = getRecords();
    return NextResponse.json<{data: { stepTokenOptions: StepTokenOption[]}}>({
        data: { stepTokenOptions }
    })
}

export async function POST(
    request: Request
) {
    const body: StepTokenOption = await request.json();

    const valueTextEmbedding = await getTextEmbedding(body.value)
    const updatedStepTokenOption = {
        ...body,
        valueTextEmbedding
    };

    const savedStepTokenOption = insertModel(updatedStepTokenOption)
    return NextResponse.json<{data: { stepToken: StepTokenOption}}>({
        data: { stepToken: savedStepTokenOption }
    })
}