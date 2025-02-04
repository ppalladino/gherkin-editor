export const dynamic = 'force-dynamic' 

import { NextResponse } from 'next/server'
import { StepToken as ModelType } from '@/_types'
import { 
    getStepToken as getRecord, 
    updateStepToken as updateRecord, 
    deleteStepToken as deleteRecord 
} from '@/_db'
 
const modelName = 'Step Token'

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params
    return NextResponse.json<{data: {stepToken: ModelType | null}}>({
        data: { stepToken: getRecord(id) }
    })
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    // const { id } = params;

    try {
        const body: ModelType = await request.json();

        const updatedModel = {
            ...body
        };

        const savedModel = await updateRecord(updatedModel);

        if (savedModel) {
            return NextResponse.json<{ data: { stepTemplate: ModelType } }>({
                data: { stepTemplate: savedModel },
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
        const wasDeleted = await deleteRecord(id)

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