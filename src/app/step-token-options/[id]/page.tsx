"use client"

import { useEffect, Usable } from 'react';
import { use } from "react";
import { Flex } from "@chakra-ui/react";
import { useGetStepTokenOptionsQuery } from '@/_services';
import Spinner from "@/_components/Spinner";
import ErrorContent from "@/_components/ErrorContent";
import StepTokenOptionsEditor from './_components/StepTokenOptionsEditor';
import { toaster } from "@/components/ui/toaster"

interface EditStepTokenOptionsPageProps {
    params: Usable<{id: string}>;
}

export default function EditStepTokenOptionsPage({params}: EditStepTokenOptionsPageProps) {
    const { id } = use<{id: string}>(params);
    const { data: loadData, error: loadError, isLoading: isLoadingLoading } = useGetStepTokenOptionsQuery(id)

    useEffect(() => {
        if (loadError) {
            toaster.create({
                title: `Error Loading Step Token Options`,
                description: JSON.stringify(loadError),
                type: 'error',
            })
        }
    }, [loadError])

    return (
        <Flex flex="1">
        {
            isLoadingLoading && <Spinner />
        }
        {
            loadError && <ErrorContent />
        }
        {
            loadData && <StepTokenOptionsEditor stepTokenOptions={loadData.data.stepTokenOptions}/>
        }
      </Flex>
    )
}