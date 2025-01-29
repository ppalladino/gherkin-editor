export const dynamic = 'force-dynamic' 

import { NextResponse } from 'next/server'
import { GetStepTokenOptionsResponse } from '@/_types'
import { getStepTokenOptions } from '@/_lib/db'
 
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params
    return NextResponse.json<GetStepTokenOptionsResponse>({
        data: { stepTokenOptions: getStepTokenOptions(id) }
    })
}