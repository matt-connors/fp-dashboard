import {
    CalendarIcon,
    EnvelopeClosedIcon,
    FaceIcon,
    GearIcon,
    PersonIcon,
    RocketIcon,
} from "@radix-ui/react-icons"

import {
    Command,
    CommandInput,
    CommandItem,
    CommandList,
    CommandEmpty,
    CommandGroup
} from "@/components/ui/command";

import React from "react";
import clsx from "clsx";

export function CommandSearch({ data, className }: { data: { title: string, slug: string }[], className?: string }) {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");

    const handleValueChange = (value: string) => {
        setInputValue(value);
        setOpen(!!value);
    };

    const filteredCommands = data.filter(command =>
        command.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    return (
        <Command className={clsx(
            "rounded-lg border shadow-md w-[300px] shadow-sm relative overflow-visible",
            open && "rounded-b-none shadow-none border-b-[0]",
            className
        )}>
            <CommandInput
                placeholder="Search..."
                onValueChange={handleValueChange}
                className="py-1 h-[34px]"
            />
            {
                <CommandList className={clsx(
                    "absolute top-[calc(100%_-_1px)] left-[-1px] right-[0] border rounded-lg rounded-t-none shadow-sm w-[calc(100%_+_2px)] bg-popover",
                    !open && "hidden"
                )}>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Results">
                        {open &&
                            filteredCommands.length > 0 &&
                            filteredCommands.map((command) => (
                                <CommandItem value={command.title} className="pointer-events-all">
                                    <a href={command.slug} className="flex items-center cursor-pointer w-full h-full">
                                        {command.title}
                                    </a>
                                </CommandItem>
                            ))}
                    </CommandGroup>

                </CommandList>
            }
        </Command>
    );
}
