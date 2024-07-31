
import * as React from "react"
import {
    CaretSortIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
    type ColumnDef,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SortableTable } from "../../../lib/ui/SortableTable"

export type Exercise = {
    id: string,
    name: string,
    bodypart: string,
    category: string,
    aliases: string[],
    icon_url: string,
    name_url: string
}

const columns: ColumnDef<Exercise>[] = [
    {
        accessorKey: "icon_url",
        header: ({ table }) => (<></>),
        cell: ({ row }) => {
            return <img src={`/images/exercises/${row.original.name_url}.png`} alt={row.getValue("name")} className="w-[55px] object-cover" />
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
        accessorKey: "bodypart",
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
        cell: ({ row }) => <div>{row.getValue("bodypart")}</div>,
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
        cell: ({ row }) => {
            
        },
    },
]

export function ExercisesTable({ data }: { data: Exercise[] }) {
    return (
        <SortableTable
            data={data}
            columns={columns}
            hiddenColumns={["aliases", "category"]}
            filter={{
                title: "exercises",
                columnName: "name"
            }}
        />
    )
}