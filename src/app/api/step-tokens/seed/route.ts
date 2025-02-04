export const dynamic = 'force-static'

import { NextResponse } from 'next/server'
import { getStepTokens, insertStepToken } from '@/_db'
import { mockStepTokens } from "@/_mocks/data"

export async function POST(request: Request) {
    const existingStepTokens = getStepTokens()
    if (existingStepTokens.length > 0) {
        return NextResponse.json(
            {
                error: 'Step tokens already exist, can not seed the database',
            },
            { status: 400 }
        );
    }

    for (const stepToken of mockStepTokens) {
        const updatedStepToken = {
            ...stepToken,
        };

        const savedStepToekn = insertStepToken(updatedStepToken)
        console.log(`!!! Seeded Step Toekn: ${savedStepToekn.id}`)
    }

    return NextResponse.json(null, { status: 200 });
}