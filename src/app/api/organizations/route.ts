export const dynamic = 'force-static'

import { NextResponse } from 'next/server'
import { Organization } from '@/_types'
import { getOrganizations, insertOrganization } from '@/_db'
 
export async function GET() {
    const organizations = getOrganizations();
    return NextResponse.json<{data: { organizations: Organization[]}}>({
        data: { organizations }
    })
}

export async function POST(
    request: Request
) {
    const body = await request.json();
    const {id, name} = body;

    const savedOrganization = insertOrganization({id, name} as Organization)
    return NextResponse.json<{data: { organization: Organization}}>({
        data: { organization: savedOrganization }
    })
}