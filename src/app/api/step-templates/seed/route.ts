export const dynamic = 'force-static'

import { NextResponse } from 'next/server'
import { GetStepTemplatesResponse, StepTemplateTypes } from '@/_types'
import { getStepTemplates, insertStepTemplate } from '@/_db'
import { getTextEmbedding } from '@/_lib/textEmbedding'
import { mockStepTemplates } from "@/_mocks/data"

export async function POST(request: Request) {
    const existingStepTemplates = getStepTemplates()
    if (existingStepTemplates.length > 0) {
        return NextResponse.json(
            {
                error: 'Step templates already exist, can not seed the database',
            },
            { status: 400 }
        );
    }

    for (const stepTemplate of mockStepTemplates) {
        const titleTextEmbedding = await getTextEmbedding(stepTemplate.title)
        const updatedStepTemplate = {
            ...stepTemplate,
            titleTextEmbedding,
        };

        const savedTemplate = insertStepTemplate(updatedStepTemplate)
        console.log(`!!! Seeded Step Template: ${savedTemplate.id}`)
    }

    return NextResponse.json(null, { status: 200 });
}