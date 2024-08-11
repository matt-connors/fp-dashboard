import React, { useState, useEffect } from 'react';

import { Card, CardHeader } from "@/components/ui/card";
import { InputForm } from "@/src/lib/ui/Form";
import WithQuery from './WithQuery';
import { AddExerciseToProgramDocument, GetProgramDetailsDocument, RemoveExerciseFromProgramDocument, UpdateProgramDocument } from '@/src/graphql/generated';
import { EditProgramTable } from './tables/EditProgramTable';
import { Toaster } from '@/components/ui/toaster';
import { getMutationData } from '@/src/lib/utils/graphql';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { DialogPopup } from '@/src/lib/ui/DialogPopup';
import ExercisesTable from './tables/ExercisesTable';
import { DrawerPopup } from '@/src/lib/ui/DrawerPopup';

const programId = window.location.pathname.split('/').pop() || '';

export function EditProgram({ data }: {
    data: {
        program: {
            id: string,
            type: string,
            description: string,
            name: string,
            programExercises: {
                order?: number,
                duration?: number,
                reps?: number,
                sets?: number,
                notes?: string,
                exercise: {
                    id: string,
                    name: string,
                    bodyPart: string,
                    aliases: string[],
                    iconUrl: string,
                    category: string
                }
            }
        }
    },
    programId?: string;
}) {
    const [response, setResponse] = useState<any>();
    const [currentExercises, setCurrentExercises] = useState<any>();
    const { toast } = useToast();

    useEffect(() => {
        // ensure data is available
        if (data && data.program) {
            // set the response to be an array of objects with a title and slug to populate the CommandSearch
            setResponse(data.program);
            setCurrentExercises(data.program.programExercises);
        }
    }, [data]);

    if (!response) {
        return null;
    }

    /**
     * Handle the form submission
     */
    const handleSubmit = async (data: any) => {
        const response = await getMutationData(UpdateProgramDocument, {
            programId: parseInt(programId),
            name: data.Name,
            description: data.Description
        });
        if (response) {
            toast({
                title: 'Program updated',
                description: 'The program details have been updated',
            });
        }
    }

    return (
        <>
            <Card className="p-8">
                <InputForm
                    fields={[
                        {
                            label: 'Name',
                            type: 'text',
                            placeholder: 'Name',
                            zod: (z: any) => z.string().min(2, {
                                message: "Program name must be at least 2 characters.",
                            })
                        },
                        {
                            label: 'Description',
                            type: 'text',
                            placeholder: 'Description',
                            zod: (z: any) => z.string()
                        }
                    ]}
                    defaultValues={{
                        Name: response.name,
                        Description: response.description
                    }}
                    onSubmit={handleSubmit}
                />
            </Card>
            <Card className="px-8 pb-2">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="flex-1 shrink-0 whitespace-nowrap text-xl font-medium tracking-tight sm:grow-0 pt-6">Exercises</h2>
                        <p className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5 pb-2">Edit the exercises in this program</p>
                    </div>
                    <DrawerPopup
                        title="Add Exercise"
                        description="Add an exercise to this program"
                        button={(
                            <Button size="sm" className="h-7 gap-1">
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap text-sm">
                                    Add Exercise
                                </span>
                            </Button>
                        )}>
                        <div>
                            <ExercisesTable
                                actions={
                                    ({ row }: { row: { original: any } }) => {

                                        // Check if the exercise is in the program
                                        const isExerciseInProgram = currentExercises.some((exercise: any) => exercise.exercise.id === row.original.id);

                                        const [buttonText, setButtonText] = useState(
                                            // If the exercise is in the program, set the button text to 'Remove Exercise', otherwise set it to 'Add Exercise'
                                            isExerciseInProgram ? 'Remove Exercise' : 'Add Exercise'
                                        );
                                        const [variant, setVariant] = useState<any>(
                                            // If the exercise is in the program, set the variant to outline, otherwise set it to secondary
                                            isExerciseInProgram ? 'outline' : 'secondary'
                                        );
                                        const [disabled, setDisabled] = useState(false);

                                        const handleAddExercise = async () => {
                                            /**
                                             * Add an exercise to a program
                                             */
                                            if (variant === 'secondary') {
                                                // Disable the button
                                                setDisabled(true);
                                                // Send mutation to server 
                                                let response: any = await getMutationData(AddExerciseToProgramDocument, {
                                                    programId: parseInt(programId),
                                                    exerciseId: parseInt(row.original.id)
                                                });
                                                // Show message to user confirming the action
                                                if (response && response.addExercise) {
                                                    toast({
                                                        title: 'Program updated',
                                                        description: 'The exercise has been updated',
                                                    });
                                                    // Update the program exercises
                                                    setCurrentExercises([
                                                        ...currentExercises,
                                                        {
                                                            reps: '',
                                                            sets: '',
                                                            notes: '',
                                                            exercise: row.original
                                                        }
                                                    ]);
                                                    // add the exercise to the program
                                                    setButtonText('Remove Exercise');
                                                    setVariant('outline');
                                                }
                                                // Show error message to user if there was no response
                                                else {
                                                    toast({
                                                        title: 'Error',
                                                        description: 'There was an error updating the exercise',
                                                        variant: 'destructive'
                                                    });
                                                }
                                            }
                                            /**
                                             * Remove an exercise from a program
                                             */
                                            else {
                                                // disable the button
                                                setDisabled(true);
                                                // Send mutation to server 
                                                let response: any = await getMutationData(RemoveExerciseFromProgramDocument, {
                                                    programId: parseInt(programId),
                                                    exerciseId: parseInt(row.original.id)
                                                });
                                                if (response && response.removeExercise) {
                                                    toast({
                                                        title: 'Program updated',
                                                        description: 'The exercise has been updated',
                                                    });
                                                    // Update the program exercises
                                                    setCurrentExercises(
                                                        currentExercises.filter((exercise: any) => exercise.exercise.id !== row.original.id)
                                                    );
                                                    // remove the exercise from the program
                                                    setButtonText('Add Exercise');
                                                    setVariant('secondary');
                                                }
                                                // Show error message to user if there was no response
                                                else {
                                                    toast({
                                                        title: 'Error',
                                                        description: 'There was an error updating the exercise',
                                                        variant: 'destructive'
                                                    });
                                                }
                                            }
                                            // Enable the button
                                            setDisabled(false);
                                        }
                                        return (
                                            <div className="flex gap-6 items-center">
                                                <Button disabled={disabled} variant={variant} className="px-3 h-6" onClick={handleAddExercise}>
                                                    <span className="text-xs">{buttonText}</span>
                                                </Button>
                                            </div>
                                        )
                                    }
                                }
                            />
                        </div>
                    </DrawerPopup>
                </div>
                <EditProgramTable data={currentExercises} />
            </Card>
            <Toaster />
        </>
    );
}

export default WithQuery(EditProgram, {
    query: GetProgramDetailsDocument,
    variables: {
        programId: programId
    }
});