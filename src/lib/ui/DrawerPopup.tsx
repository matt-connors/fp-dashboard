import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { Button } from "@/components/ui/button"

import React from "react"

export function DrawerPopup({ title, description, button, children }: { title: string, description: string, button: React.ReactNode, children: React.ReactNode }) {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                {button}
            </DrawerTrigger>
            <DrawerContent className="mx-4">
                <div className="max-w-[85rem] mx-auto w-full px-8">
                    <DrawerHeader>
                        <DrawerTitle>{title}</DrawerTitle>
                        <DrawerDescription>{description}</DrawerDescription>
                    </DrawerHeader>
                </div>
                <div className="p-8 max-h-[80vh] overflow-y-scroll max-w-[85rem] mx-auto w-full">
                    {children}
                </div>
            </DrawerContent>
        </Drawer>
    )
}