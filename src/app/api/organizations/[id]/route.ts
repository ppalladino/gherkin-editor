export const dynamic = 'force-dynamic' 

import { NextResponse } from 'next/server'
import { Organization } from '@/_types'
import { getOrganization, deleteOrganization, updateOrganization } from '@/_db'
 
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    // Ensure params is properly awaited - destructure after await
    const { id } = await params
    
    try {
        const organization = await getOrganization(id);
        
        return NextResponse.json<{data: {organization: Organization | null}}>({
            data: { organization }
        });
    } catch (error) {
        console.error('Error fetching organization:', error);
        return NextResponse.json<{ error: string }>({
            error: 'Internal Server Error',
        }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    // Access id directly from params object
    const { id } = await params

    try {
        // Parse the request body as JSON
        const body = await request.json();

        const organization: Organization = {
            id,
            ...body,
        };

        const updatedOrganization = await updateOrganization(organization);
        
        return NextResponse.json<{ data: { organization: Organization } }>({
            data: { organization: updatedOrganization },
        }, { status: 200 });
    } catch (error) {
        console.error('Error updating organization:', error);
        
        // Check if error is due to not found
        if (error instanceof Error && error.message === 'Organization not found.') {
            return NextResponse.json<{ error: string }>({
                error: 'Organization not found',
            }, { status: 404 });
        }
        
        return NextResponse.json<{ error: string }>({
            error: 'Internal Server Error',
        }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    // Access id directly from params object
    const { id } = await params

    try {
        const wasDeleted = await deleteOrganization(id);

        return NextResponse.json<{ data: { success: boolean } }>({
            data: { success: true },
        }, { status: 200 });
    } catch (error) {
        console.error('Error deleting organization:', error);
        
        // If error message indicates not found
        if (error instanceof Error && error.message.includes('not found')) {
            return NextResponse.json<{ error: string }>({
                error: 'Organization not found',
            }, { status: 404 });
        }
        
        return NextResponse.json<{ error: string }>({
            error: 'Internal Server Error',
        }, { status: 500 });
    }
}