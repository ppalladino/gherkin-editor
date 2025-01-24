export const dynamic = 'force-static'

import { NextResponse } from 'next/server'
import { GetStepTemplatesResponse } from '@/_types'
import { getAllStepTemplates } from '@/_lib/db'
 
export async function GET() {
    // Return a specific step template

    // const stepTemplates = getAllStepTemplates()
    // return NextResponse.json<GetStepTemplatesResponse>({
    //     data: { stepTemplates }
    // })
}