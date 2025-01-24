export const dynamic = 'force-static'

import { NextResponse } from 'next/server'
import { GetStepTemplatesResponse } from '@/_types'
import { getAllStepTemplates, deleteAllStepTemplates } from '@/_lib/db'
 
export async function GET() {
    const stepTemplates = getAllStepTemplates()

    return NextResponse.json<GetStepTemplatesResponse>({
        data: { stepTemplates }
    })
}

export async function DELETE() {
    deleteAllStepTemplates()
    return NextResponse.json({ message: 'All step templates deleted' })
}