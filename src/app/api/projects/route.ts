export const dynamic = 'force-static'

import { NextResponse } from 'next/server'
import { Project } from '@/_types'
import { getProjects as getRecords, insertProject as insertModel } from '@/_db'
 
export async function GET() {
    const projects = getRecords();
    return NextResponse.json<{data: { projects: Project[]}}>({
        data: { projects }
    })
}

export async function POST(
    request: Request
) {
    const body = await request.json();

    const savedModel = insertModel(body as Project)
    return NextResponse.json<{data: { project: Project}}>({
        data: { project: savedModel }
    })
}