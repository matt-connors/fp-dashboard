import { Button } from "@/components/ui/button";
import { CommandSearch } from "@/src/lib/ui/CommandSearch";
import { DialogPopup } from "@/src/lib/ui/DialogPopup";
import React from "react";

export function AssignProgramPopup({ programId }: { programId: string }) {
    return (
        <DialogPopup
            title="Assign Program"
            description="Assign this program to a client by searching their name."
            button={(
                <Button variant="secondary" className="px-3 h-6">
                    <span className="text-xs">Assign</span>
                </Button>
            )}>
            <div>
                <CommandSearch
                    className="w-full"
                    data={[
                        { title: 'Matt Connors', slug: '/assign/m' }
                    ]} />
            </div>
        </DialogPopup>
    );
}