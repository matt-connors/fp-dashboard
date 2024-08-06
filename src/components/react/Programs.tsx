import React from "react";

import { TabHeader } from "@/src/lib/ui/TabHeader";
import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";

import ProgramsLibraryTable, { type Program } from "@/src/components/react/tables/ProgramsLibraryTable";
import MyProgramsTable from "@/src/components/react/tables/MyProgramsTable";

/**
 * The tab for the My Programs page
 */
function MyPrograms() {
    return (
        <Card className="px-8 pb-2">
            <h2 className="flex-1 shrink-0 whitespace-nowrap text-xl font-medium tracking-tight sm:grow-0 pt-6">
                My Programs
            </h2>
            <p className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5 pb-2">
                Manage and create custom programs
            </p>
            <MyProgramsTable />
        </Card>
    )
}

/**
 * The tab for the Program Library page
 */
function ProgramsLibrary() {
    return (
        <Card className="px-8 pb-2">
            <h2 className="flex-1 shrink-0 whitespace-nowrap text-xl font-medium tracking-tight sm:grow-0 pt-6">
                Programs Library
            </h2>
            <p className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5 pb-2">
                View and assign programs from our library
            </p>
            <ProgramsLibraryTable />
        </Card>
    )
}

export function Programs() {
    return (
        <TabHeader
            tabs={[
                { title: "My Programs", content: <MyPrograms /> },
                { title: "Program Library", content: <ProgramsLibrary /> },
            ]}
            buttons={(
                <Button size="sm" className="h-7 gap-1">
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap text-sm">
                        Create Program
                    </span>
                </Button>
            )}
        />
    )
}