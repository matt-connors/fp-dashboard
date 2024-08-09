
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
import AssignProgramPopup from "../AssignProgramPopup"
import WithQuery from "../WithQuery"
import { GetMyProgramsDocument } from "@/src/graphql/generated"

export type Program = {
    id: string,
    name: string,
    assignees: number,
    numberOfExercises: number,
}

const columns: ColumnDef<Program>[] = [
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
        accessorKey: "assignees",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Assignees
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("assignees")}</div>,
    },
    {
        accessorKey: "numberOfExercises",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Number of Exercises
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("numberOfExercises")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            let navigateToEditProgram = () => {
                window.location.assign('/trainer/programs/edit/' + row.original.id)
            }
            return (
                <div className="flex gap-6 items-center">
                    <AssignProgramPopup programId={row.original.id} />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <DotsHorizontalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={navigateToEditProgram}>Edit Program</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]

function MyProgramsTable({ data }: { data: { myPrograms: Program[] } }) {

    const [response, setResponse] = React.useState<any>();

    React.useEffect(() => {
        if (data) {
            setResponse(
                data.myPrograms.map((program: any) => ({
                    ...program,
                    numberOfExercises: program.programExercises.length,
                    assignees: program.userPrograms.length,
                }))
            );
        }
    }, [data]);

    return (
        <SortableTable
            data={response}
            columns={columns}
            filter={{
                title: "programs",
                columnName: "name"
            }}
        />
    )
}

export default WithQuery(MyProgramsTable, {
    query: GetMyProgramsDocument,
});