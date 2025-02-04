"use client"

import { useEffect, Usable } from 'react';
import { use } from "react";
import { Flex } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster"
import { StepTemplate } from '@/_types';
import { useGetStepTemplateQuery, usePatchStepTemplateMutation } from '@/_services';
import Spinner from "@/_components/Spinner";
import ErrorContent from "@/_components/ErrorContent";
import StepTemplateEditor from "./_components/StepTemplateEditor";

interface StepTemplatesEditPageProps {
    params: Usable<{id: string}>;
}

export default function StepTemplatesEditPage({params} : StepTemplatesEditPageProps) {
    const { id } = use<{id: string}>(params);
    const { data, error: isLoadingError, isLoading } = useGetStepTemplateQuery(id);

    const [
        updateStepTemplate, // This is the mutation trigger
        { 
            isLoading: isUpdating, 
            isSuccess: isUpdatingSuccess, 
            error: isUpdatingError
        }, // This is the destructured mutation result
      ] = usePatchStepTemplateMutation()

    const showError = (errorTitle: string, errorDescription: string) => {
        toaster.create({
            title: errorTitle,
            description: errorDescription,
            type: 'error',
        })
    }

    useEffect(() => {
        if (isLoadingError) {
            showError(
                `Error Loading Step Template`,
                JSON.stringify(isLoadingError)
            )
        }
    }, [isLoadingError])

    useEffect(() => {
        if (isUpdatingError) {
            showError(
                `Error Updating Step Template`,
                JSON.stringify(isUpdatingError)
            )
        }
    }, [isUpdatingError])

    useEffect(() => {
        if (isUpdatingSuccess) {            
            toaster.create({
                title: `Success!`,
                description: 'Step Template updated successfully',
                type: 'success',
            })
        }
    }, [isUpdatingSuccess])

    const handleSubmit = (submittedStepTemplate: StepTemplate) => {
        updateStepTemplate(submittedStepTemplate)
    }

    return (
        <Flex flex="1">
        {
            isLoading && <Spinner />
        }
        {
            isLoadingError && <ErrorContent />
        }
        {
            data && <StepTemplateEditor 
                        stepTemplate={data.data.stepTemplate} 
                        onSubmit={(submittedStepTempalte) => handleSubmit(submittedStepTempalte)}
                        isUpdating={isUpdating}
                    />
        }
        </Flex>
    )
}



// import { useEffect } from 'react';
// import { Flex } from "@chakra-ui/react";
// import { useGetAllStepTemplatesQuery } from '@/_services';
// import Spinner from "@/_components/Spinner";
// import ErrorContent from "@/_components/ErrorContent";
// import StepTemplatesTable from './_components/StepTemplatesTable';
// import { toaster } from "@/components/ui/toaster"

// export default function StepTemplatesPage() {
//     const { data, error, isLoading } = useGetAllStepTemplatesQuery(undefined)

//     useEffect(() => {
//         if (error) {
//             // Customize the error message based on your error structure
//             // const errorMessage = `${error.status} ${error.data}`
//             const errorMessage = JSON.stringify(error)

            
//             toaster.create({
//                 title: `Error loading Step Templates`,
//                 description: errorMessage,
//                 type: 'error',
//             })
//         }
//     }, [error])

//     return (
//       <Flex flex="1">
        
//         {
//             isLoading && <Spinner />
//         }
//         {
//             error && <ErrorContent />
//         }
//         {
//             data && <StepTemplatesTable stepTemplates={data.data.stepTemplates}/>
//         }
        

//       </Flex>
//     );
// }