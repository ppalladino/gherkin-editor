export const dynamic = 'force-dynamic' 

import { NextResponse } from 'next/server'
import { Organization } from '@/_types'
import { getOrganization, deleteOrganization, updateOrganization } from '@/_db'
 
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params
    return NextResponse.json<{data: {organization: Organization | null}}>({
        data: { organization: getOrganization(id) }
    })
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    try {
        // Parse the request body as JSON
        const body = await request.json();

        const organization: Organization = {
            id,
            ...body,
        };

        const updatedOrganization = await updateOrganization(organization);

        if (updatedOrganization) {
            return NextResponse.json<{ data: { organization: Organization } }>({
                data: { organization: updatedOrganization },
            }, { status: 200 });
        } else {
            return NextResponse.json<{ error: string }>({
                error: 'Organization not found',
            }, { status: 404 });
        }
    } catch (error) {
        console.error('Error updating organization:', error);
        return NextResponse.json<{ error: string }>({
            error: 'Internal Server Error',
        }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params

    try {
        const wasDeleted = await deleteOrganization(id) // Use await if deleteOrganization is async

        if (wasDeleted) {
            return NextResponse.json<{ data: { success: boolean } }>({
                data: { success: true },
            }, { status: 200 })
        } else {
            return NextResponse.json<{ error: string }>({
                error: 'Organization not found',
            }, { status: 404 })
        }
    } catch (error) {
        console.error('Error deleting organization:', error)
        return NextResponse.json<{ error: string }>({
            error: 'Internal Server Error',
        }, { status: 500 })
    }
}