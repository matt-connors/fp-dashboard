import * as React from "react"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import { useToast } from "@/components/ui/use-toast"

export function InputOTPControlled({ subtitle, onComplete }: { subtitle: string, onComplete: (value: string) => Promise<{ success: boolean }> }) {
    const [value, setValue] = React.useState("");
    const [disabled, setDisabled] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const { toast } = useToast()

    const handleOnChange = async (value: string) => {
        setValue(value);
        // If the value is 6 characters long, call the onComplete function
        if (value.length === 6) {
            // Disable the input after 6 characters to let the user know that the input is complete
            setDisabled(true);
            // Call the onComplete function
            const { success } = await onComplete(value);
            // If the submission was not successful, clear the input and enable it again
            if (!success) {
                setValue("");
                setDisabled(false);
                // Show an error toast
                toast({
                    title: "Error",
                    description: "The code you entered is incorrect. Please try again.",
                    duration: 5000,
                    variant: "destructive",
                });
                // Focus the input again
                setTimeout(() => {
                    inputRef.current?.focus()
                }, 100)
            }
        }
    }

    return (
        <div className="space-y-2">
            <InputOTP
                maxLength={6}
                value={value}
                onChange={handleOnChange}
                disabled={disabled}
                ref={inputRef}
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
            <div className="text-center text-sm">
                {value === "" ? (
                    <>{subtitle}</>
                ) : (
                    <>You entered: {value}</>
                )}
            </div>
        </div>
    )
}
