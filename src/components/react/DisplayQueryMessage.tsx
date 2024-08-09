import React, { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

// get the query string from the URL
const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get("message");
const variant = urlParams.get("variant") as "default" | "destructive";

export function DisplayQueryMessage() {

    const { toast } = useToast();

    useEffect(() => {
        if (message) {
            toast({
                title: variant === "destructive" ? "Error" : "Success",
                description: message,
                duration: 5000,
                variant: variant || "destructive"
            });
        }
    }, [message, toast]);

    return null;
}