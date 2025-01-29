"use client"

import { useEffect } from 'react';
import { Flex } from "@chakra-ui/react";
import { useGetAllStepTemplatesQuery } from '@/_services';
import Spinner from "@/_components/Spinner";
import ErrorContent from "@/_components/ErrorContent";
import StepTemplatesTable from './_components/StepTemplatesTable';
import { toaster } from "@/components/ui/toaster"

export default function StepTemplatesPage() {
    const { data, error, isLoading } = useGetAllStepTemplatesQuery(undefined)

    useEffect(() => {
        if (error) {
            // Customize the error message based on your error structure
            // const errorMessage = `${error.status} ${error.data}`
            const errorMessage = JSON.stringify(error)

            
            toaster.create({
                title: `Error loading Step Templates`,
                description: errorMessage,
                type: 'error',
            })
        }
    }, [error])

    return (
      <Flex flex="1">
        
        {
            isLoading && <Spinner />
        }
        {
            error && <ErrorContent />
        }
        {
            data && <StepTemplatesTable stepTemplates={data.data.stepTemplates}/>
        }
        

      </Flex>
    );
}