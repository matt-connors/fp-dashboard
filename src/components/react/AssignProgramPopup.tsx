import { Button } from "@/components/ui/button";
import { CommandSearch } from "@/src/lib/ui/CommandSearch";
import { DialogPopup } from "@/src/lib/ui/DialogPopup";
import React, { useEffect, useState } from "react";
import WithQuery from "./WithQuery";
import { GetClientsDocument } from "@/src/graphql/generated";

export function AssignProgramPopup({ data, programId }: {
    data: {
        trainerWithClients: {
            users: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
                country: string;
            }[]
        }
    },
    programId: string;
}) {

    const [response, setResponse] = useState<any>();

    useEffect(() => {
        // ensure data is available
        if (data && data.trainerWithClients && data.trainerWithClients.users) {
            // set the response to be an array of objects with a title and slug to populate the CommandSearch
            setResponse(
                data.trainerWithClients.users.map(client => ({
                    title: `${client.firstName} ${client.lastName}`,
                    slug: `/assign/${client.id}:${programId}`
                }))
            );
        }
    }, [data]);

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
                    data={response} />
            </div>
        </DialogPopup>
    );
}

export default WithQuery(AssignProgramPopup, {
    query: GetClientsDocument,
    variables: {},
});