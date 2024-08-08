import React, { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

// get the query string from the URL
const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get("message");

export function DisplayQueryMessage() {

    const { toast } = useToast();

    useEffect(() => {
        if (message) {
            toast({
                title: "Error",
                description: message,
                duration: 5000,
                variant: "destructive",
            });
        }
    }, [message, toast]);

    return null;
}