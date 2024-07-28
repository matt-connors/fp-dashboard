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
} from "@/components/ui/command";

import React from "react";
import clsx from "clsx";

export function CommandSearch({ data }: { data: { title: string, slug: string }[] }) {
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
            open && "rounded-b-none shadow-none border-b-[0]"
        )}>
            <CommandInput
                placeholder="Search..."
                onValueChange={handleValueChange}
                className="py-1 h-[34px]"
            />
            {
                <CommandList className={clsx(
                    "absolute top-[calc(100%_-_1px)] left-[-1px] right-[0] border rounded-lg rounded-t-none shadow-sm w-[calc(100%_+_2px)]",
                    !open && "hidden"
                )}>
                    {open &&
                        filteredCommands.length > 0 &&
                        filteredCommands.map((command) => (
                            <CommandItem key={command.slug} value={command.slug}>
                                {command.title}
                            </CommandItem>
                        ))}
                </CommandList>
            }
        </Command>
    );
}
