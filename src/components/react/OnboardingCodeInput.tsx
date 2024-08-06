import React from "react";

import { InputOTPControlled } from "@/src/lib/ui/EnterCode";

export function OnboardingCodeInput() {

    const handleComplete = async (value: string): Promise<{ success: boolean }> => {

        // Check the code
        return { success: false };
    }

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-medium">Join your trainer</h1>
            <p className="text-sm text-center text-muted-foreground pb-4 pt-2">Enter the code that your trainer has provided you below.</p>
            <InputOTPControlled
                subtitle="Enter the 6-digit code"
                onComplete={handleComplete}
            />
        </div>
    )
}