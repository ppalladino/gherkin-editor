export const dynamic = 'force-dynamic' 

import { NextResponse } from 'next/server'
import { StepTokenOption as ModelType } from '@/_types'
import { 
    getStepTokenOption as getRecord, 
    updateStepTokenOption as updateRecord, 
    deleteStepTokenOption as deleteRecord 
} from '@/_db'
import { getTextEmbedding } from '@/_lib/textEmbedding'
 
const modelName = 'Step Token Option'

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params
    return NextResponse.json<{data: {stepTokenOption: ModelType | null}}>({
        data: { stepTokenOption: getRecord(id) }
    })
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    // const { id } = params;

    try {
        const body: ModelType = await request.json();

        const valueTextEmbedding = await getTextEmbedding(body.value)
        const updatedStepTokenOption = {
            ...body,
            valueTextEmbedding
        };

        const savedModel = await updateRecord(updatedStepTokenOption);

        if (savedModel) {
            return NextResponse.json<{ data: { stepTokenOption: ModelType } }>({
                data: { stepTokenOption: savedModel },
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