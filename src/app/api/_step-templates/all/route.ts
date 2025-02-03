export const dynamic = 'force-static'

import { NextResponse } from 'next/server'
import { GetStepTemplatesResponse } from '@/_types'
import { getAllStepTemplates, deleteAllStepTemplates } from '@/_db'
 
export async function GET() {
    // Inline delay function
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(500);

    const stepTemplates = getAllStepTemplates()

    return NextResponse.json<GetStepTemplatesResponse>({
        data: { stepTemplates }
    })
}

export async function DELETE() {
    deleteAllStepTemplates()
    return NextResponse.json({ message: 'All step templates deleted' })
}