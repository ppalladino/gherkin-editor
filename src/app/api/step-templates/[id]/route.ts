export const dynamic = 'force-dynamic' 

import { NextResponse } from 'next/server'
import { GetStepTemplateResponse } from '@/_types'
import { getStepTemplate } from '@/_lib/db'
 
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params
    return NextResponse.json<GetStepTemplateResponse>({
        data: { stepTemplate: getStepTemplate(id) }
    })
}