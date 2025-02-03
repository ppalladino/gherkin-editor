export const dynamic = 'force-dynamic' 

import { NextResponse } from 'next/server'
import { Project } from '@/_types'
import { 
    getProject as getRecord, 
    updateProject as updateRecord, 
    deleteProject as deleteRecord 
} from '@/_db'
 
const modelName = 'Project'

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params
    return NextResponse.json<{data: {project: Project | null}}>({
        data: { project: getRecord(id) }
    })
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    try {
        const body = await request.json();

        const project: Project = {
            id,
            ...body,
        };

        const updatedModel = await updateRecord(project);

        if (updatedModel) {
            return NextResponse.json<{ data: { project: Project } }>({
                data: { project: updatedModel },
            }, { status: 200 });
        } else {
            return NextResponse.json<{ error: string }>({
                error: `${modelName} not found`,
            }, { status: 404 });
        }
    } catch (error) {
        console.error(`Error updating ${modelName}:`, error);
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
        const wasDeleted = await deleteRecord(id) // Use await if deleteOrganization is async

        if (wasDeleted) {
            return NextResponse.json<{ data: { success: boolean } }>({
                data: { success: true },
            }, { status: 200 })
        } else {
            return NextResponse.json<{ error: string }>({
                error: `${modelName} not found`,
            }, { status: 404 })
        }
    } catch (error) {
        console.error(`Error deleting ${modelName}:`, error)
        return NextResponse.json<{ error: string }>({
            error: 'Internal Server Error',
        }, { status: 500 })
    }
}