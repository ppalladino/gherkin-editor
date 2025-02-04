export const dynamic = 'force-dynamic' 

import { NextResponse } from 'next/server'
import { Project, ProjectAggregate } from '@/_types'
import { 
    getProject, getStepTemplates, getStepTokens, getStepTokenOptions
} from '@/_db'
 
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params
    // const project = getProject(id) 
    const project = undefined;                      // TODO: get project and filter the items below
    const stepTemplates = getStepTemplates()        // TODO: filter these by project
    const stepTokens = getStepTokens()              // TODO: filter these by project
    const stepTokenOptions = getStepTokenOptions()  // TODO: filter thise by project

    const stepTokensAggregate = stepTokens.map(
        (stepToken) => {
      
            const matchingStepTokenOptions = stepTokenOptions.filter(
                (o) => {return o.stepTokenId === stepToken.id}
            )

            return {
                ...stepToken,
                stepTokenOptions: matchingStepTokenOptions
            }
        }
    )

    let projectAggregate: ProjectAggregate = {
        project,
        stepTemplates: stepTemplates,
        stepTokens: stepTokens,
        stepTokenOptions: stepTokenOptions,
        stepTokensAggregate: stepTokensAggregate
    }

    return NextResponse.json<{data: {projectAggregate: ProjectAggregate | null}}>({
        data: { projectAggregate }
    })
}