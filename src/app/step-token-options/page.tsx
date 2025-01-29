"use client"

import { useEffect } from 'react';
import { Flex } from "@chakra-ui/react";
import { useGetAllStepTokenOptionsQuery } from '@/_services';
import Spinner from "@/_components/Spinner";
import ErrorContent from "@/_components/ErrorContent";
import StepTokenOptionsTable from './_components/StepTokenOptionsTable';
import { toaster } from "@/components/ui/toaster"

export default function StepTokenOptionsPage() {
    const { data, error, isLoading } = useGetAllStepTokenOptionsQuery(undefined)

    useEffect(() => {
        if (error) {
            toaster.create({
                title: `Error Loading Step Token Options`,
                description: JSON.stringify(error),
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
            data && <StepTokenOptionsTable stepTokenOptions={data.data.stepTokenOptions}/>
        }
      </Flex>
    );
}