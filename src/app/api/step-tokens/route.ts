export const dynamic = 'force-static'

import { NextResponse } from 'next/server'
import { StepToken } from '@/_types'
import { 
    getStepTokens as getRecords, 
    insertStepToken as insertModel 
} from '@/_db'

 
export async function GET() {
    const stepTokens = getRecords();
    return NextResponse.json<{data: { stepTokens: StepToken[]}}>({
        data: { stepTokens }
    })
}

export async function POST(
    request: Request
) {
    const body: StepToken = await request.json();

    const updatedStepToken = {
        ...body
    };

    const savedStepToken = insertModel(updatedStepToken)
    return NextResponse.json<{data: { stepToken: StepToken}}>({
        data: { stepToken: savedStepToken }
    })
}