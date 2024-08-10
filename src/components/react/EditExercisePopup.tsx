import { Button } from "@/components/ui/button";
import { DialogPopup } from "@/src/lib/ui/DialogPopup";
import React, { useEffect, useState } from "react";
import { InputForm } from "@/src/lib/ui/Form";
import { getMutationData } from "@/src/lib/utils/graphql";
import { useToast } from "@/components/ui/use-toast";
import { UpdateProgramExerciseDocument } from "@/src/graphql/generated";

export function EditExercisePopup({ fields, defaultValues, programId, exerciseId }: { fields: any, defaultValues: any, programId: number, exerciseId: number }) {

    const { toast } = useToast();

    /**
     * Handle the form submission
     */
    const handleSubmit = async (data: any) => {
        const response = await getMutationData(UpdateProgramExerciseDocument, {
            programId,
            exerciseId,
            sets: parseInt(data.Sets),
            reps: parseInt(data.Reps),
            notes: parseInt(data.Notes),
        });
        if (response) {
            toast({
                title: 'Exercise updated',
                description: 'The exercise has been updated',
            });
            window.location.reload();
        }
    }

    return (
        <DialogPopup
            title="Edit Exercise"
            description="Edit the exercise details"
            button={(
                <Button variant="secondary" className="px-3 h-6">
                    <span className="text-xs">Edit</span>
                </Button>
            )}>
            <div>
                <InputForm
                    fields={fields}
                    defaultValues={defaultValues}
                    onSubmit={handleSubmit}
                />
            </div>
        </DialogPopup>
    );
}
