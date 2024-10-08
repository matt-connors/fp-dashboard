
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

export type Client = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    country: string;
}

const columns: ColumnDef<Client>[] = [
    {
        accessorKey: "firstName",
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
        cell: ({ row }) => <div>{row.original.firstName + ' ' + row.original.lastName}</div>,
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "country",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Country
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("country")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (<div></div>)
        },
    },
]

export function ClientTable({ data }: { data: Client[] }) {
    return (
        <SortableTable
            data={data}
            columns={columns}
            filter={{
                title: "names",
                columnName: "firstName"
            }}
        />
    )
}