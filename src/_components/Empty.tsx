"use client"

import { EmptyState } from "@/components/ui/empty-state"
import { FaGhost } from 'react-icons/fa'

interface EmptyProps {
    title: string;
    description: string;
}

export default function Empty({
    title = "Nothing to See Here.",
    description = "This data is empty. Sorry."
}: EmptyProps) {
    return (
        <EmptyState
            color="brand.50"
            icon={<FaGhost color="#F4F8F5"/>}
            title={title}
            description={description}
        >
        </EmptyState>
    );
}