
import React, { useState, useEffect} from "react"
import {
    CaretSortIcon,
} from "@radix-ui/react-icons"
import {
    type ColumnDef,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

import { SortableTable } from "../../../lib/ui/SortableTable"
import WithQuery from "../WithQuery"
import { GetExercisesDocument } from "@/src/graphql/generated"

export type Exercise = {
    id: string,
    name: string,
    bodyPart: string,
    category: string,
    aliases: string[],
    iconUrl: string,
}

const columns: ColumnDef<Exercise>[] = [
    {
        accessorKey: "iconUrl",
        header: ({ table }) => (<></>),
        cell: ({ row }) => {
            return <img src={row.original.iconUrl} alt={row.getValue("name")} className="w-[55px] object-cover" />
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
                    Name
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
        accessorKey: "bodyPart",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Body Part
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("bodyPart")}</div>,
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Category
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("category")}</div>,
    },
    {
        accessorKey: "aliases",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Aliases
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            let aliases = row.getValue("aliases") as string[];
            
            if (aliases.length >= 3) {
                aliases = [...aliases.slice(0, 1), `+${aliases.length - 2} more`]
            }

            return (
                <div className="flex gap-2">
                    {
                        aliases.map((alias, index) => (
                            <span key={index} className="border px-3 py-0.5 rounded-md text-xs font-medium">{alias}</span>
                        ))
                    }
                </div>
            )
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {},
    },
]

function ExercisesTable({ data, actions }: { data: { exercises?: Exercise[] }, actions: any }) {

    const [response, setResponse] = useState<any>();

    useEffect(() => {
        if (data) {
            setResponse(data.exercises);
        }
    }, [data]);

    if (actions) {
        // update the actions column
        columns.at(-1)!.cell = actions;
    }

    return (
        <SortableTable
            data={response}
            columns={columns}
            hiddenColumns={["aliases", "category"]}
            filter={{
                title: "exercises",
                columnName: "name"
            }}
        />
    )
}

export default WithQuery(ExercisesTable, {
    query: GetExercisesDocument,
});