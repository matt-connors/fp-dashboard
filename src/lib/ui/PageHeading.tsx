import React from "react";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function goBack() {
    window.history.back();
}

export function PageHeading({ title, includeBackButton = false }: { title: string, includeBackButton?: boolean }) {
    return (
        <div className="pt-3 flex items-center gap-4">
            {includeBackButton && (
                <Button variant="outline" size="icon" className="h-7 w-7 border-solid" onClick={goBack}>
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Button>
            )}
            <div>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-medium tracking-tight sm:grow-0">{title}</h1>
                
            </div>
        </div>
    );
}