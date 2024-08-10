import React, { useState, useEffect } from 'react';

import { Card, CardHeader } from "@/components/ui/card";
import { InputForm } from "@/src/lib/ui/Form";
import WithQuery from './WithQuery';
import { GetProgramDetailsDocument, UpdateProgramDocument } from '@/src/graphql/generated';
import { EditProgramTable } from './tables/EditProgramTable';
import { Toaster } from '@/components/ui/toaster';
import { getMutationData } from '@/src/lib/utils/graphql';
import { useToast } from '@/components/ui/use-toast';

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
    const { toast } = useToast();

    useEffect(() => {
        // ensure data is available
        if (data && data.program) {
            // set the response to be an array of objects with a title and slug to populate the CommandSearch
            setResponse(data.program);
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
                <h2 className="flex-1 shrink-0 whitespace-nowrap text-xl font-medium tracking-tight sm:grow-0 pt-6">Exercises</h2>
                <p className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5 pb-2">Edit the exercises in this program</p>
                <EditProgramTable data={response.programExercises} />
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