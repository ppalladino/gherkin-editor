export const dynamic = 'force-static'

import { NextResponse } from 'next/server'
import { GetAllStepTokenOptionsResponse } from '@/_types'
import { getAllStepTokenOpions } from '@/_db'
 
export async function GET() {
    // Inline delay function
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(500);

    const stepTokenOptions = getAllStepTokenOpions()

    return NextResponse.json<GetAllStepTokenOptionsResponse>({
        data: { stepTokenOptions }
    })
}