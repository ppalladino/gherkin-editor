export const dynamic = 'force-static'

import { NextResponse } from 'next/server'
import { getStepTokenOptions, insertStepTokenOption } from '@/_db'
import { getTextEmbedding } from '@/_lib/textEmbedding'
import { mockStepTokenOptions } from "@/_mocks/data"

export async function POST(request: Request) {
    const existingStepTokenOptionss = getStepTokenOptions()
    if (existingStepTokenOptionss.length > 0) {
        return NextResponse.json(
            {
                error: 'Step token options already exist, can not seed the database',
            },
            { status: 400 }
        );
    }

    for (const stepTokenOption of mockStepTokenOptions) {
        const valueTextEmbedding = await getTextEmbedding(stepTokenOption.value)
        const updatedStepTokenOption = {
            ...stepTokenOption,
            valueTextEmbedding
        };

        const savedTokenOption = insertStepTokenOption(updatedStepTokenOption)
        console.log(`!!! Seeded Step Token Option: ${savedTokenOption.id}`)
    }

    return NextResponse.json(null, { status: 200 });
}