
import React, { useState, useEffect } from "react"
import {
    CaretSortIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
    type ColumnDef,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

import { SortableTable } from "../../../lib/ui/SortableTable"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { getMutationData } from "@/src/lib/utils/graphql"
import { RemoveExerciseFromProgramDocument } from "@/src/graphql/generated"
import { EditExercisePopup } from "../EditExercisePopup"
import { useToast } from "@/components/ui/use-toast"

const programId = window.location.pathname.split('/').pop() || '';

export type ProgramExercise = {
    order?: number,
    duration?: number,
    reps?: number,
    sets?: number,
    notes?: string,
    exercise: {
        id: string,
        name: string,
        bodyPart: string,
        aliases: string[],
        iconUrl: string,
        category: string
    }
}

const columns: ColumnDef<ProgramExercise>[] = [
    {
        accessorKey: "iconUrl",
        header: ({ table }) => (<></>),
        cell: ({ row }) => {
            return <img src={row.original.exercise.iconUrl} className="w-[55px] object-cover" />
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Exercise Name
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.original.exercise.name}</div>,
    },
    {
        accessorKey: "reps",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Reps
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("reps")}</div>,
    },
    {
        accessorKey: "sets",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Sets
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("sets")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {

            const { toast } = useToast();

            /**
             * Delete an exercise from a program
             */
            const deleteExerciseFromProgram = async () => {
                const response = await getMutationData(RemoveExerciseFromProgramDocument, {
                    programId,
                    exerciseId: parseInt(row.original.exercise.id),
                });
                if (response) {
                    toast({
                        title: "Exercise Deleted",
                        description: "The exercise has been removed from the program.",
                    });
                }
            }

            return (
                <div className="flex gap-6 items-center">
                    <EditExercisePopup
                        fields={[
                            {
                                type: "text",
                                label: "Reps",
                                placeholder: "Reps",
                                zod: (z: any) => z.any(),
                            },
                            {
                                type: "text",
                                label: "Sets",
                                placeholder: "Sets",
                                zod: (z: any) => z.any(),
                            },
                            {
                                type: "text",
                                label: "Notes",
                                placeholder: "Notes",
                                zod: (z: any) => z.any()
                            }
                        ]}
                        defaultValues={({
                            Reps: row.original.reps,
                            Sets: row.original.sets,
                            Notes: row.original.notes,
                        })}
                        programId={parseInt(programId)}
                        exerciseId={parseInt(row.original.exercise.id)}
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <DotsHorizontalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={deleteExerciseFromProgram}>Delete Exercise</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]

export function EditProgramTable({ data }: { data: { exercises: ProgramExercise[] } }) {

    const [response, setResponse] = useState<any>();

    useEffect(() => {
        if (data) {
            setResponse(data);
        }
    }, [data]);

    return (
        <SortableTable
            data={response}
            columns={columns}
            filter={{
                title: "exercises",
                columnName: "name"
            }}
        />
    )
}