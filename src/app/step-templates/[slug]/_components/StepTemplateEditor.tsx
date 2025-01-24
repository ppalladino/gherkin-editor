"use client"

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Table, Flex, Heading, Spacer, HStack, Button } from "@chakra-ui/react"
// import { EmptyState } from "@/components/ui/empty-state"
// import { getAllStepTemplates, seedStepTemplates, deleteAllStepTemplates } from '@/_services';
import { StepTemplate } from '@/_types';
// import { FaGhost } from "react-icons/fa"
// import { findById } from "@/_lib/utils";

interface StepTemplateEditorProps {
    stepTemplate: StepTemplate;
}

export default function StepTemplateEditor({
    stepTemplate
}: StepTemplateEditorProps ) {
    // const paramsResolved = await params;
    const stepTemplateId = stepTemplate.id;
    // const router = useRouter();

    // const [stepTemplates, setStepTemplates] = useState<StepTemplate[]>([]);
    
    // useEffect(() => {
    //     const loadAllStepTemplates = async () => {
    //       try {
    //         const data = await getAllStepTemplates();
    //         setStepTemplates(data);
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     };
    //     loadAllStepTemplates();
    //   }, []);

    return (
      <div>
        EDIT STEP TEMPLATE {stepTemplateId}
        
      </div>
    );
}