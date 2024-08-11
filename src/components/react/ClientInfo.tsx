import React, { useState, useEffect } from 'react';

import { SummaryCardGrid } from "@/src/lib/ui/SummaryCard";
import { ClientTable, type Client } from "@/src/components/react/tables/ClientTable";

import { Card } from "@/components/ui/card";

import {
    UsersRound,
} from "lucide-react";
import WithQuery from './WithQuery';
import { GetClientsDocument } from '@/src/graphql/generated';

function ClientInfo({ data }: {
    data: {
        trainerWithClients: {
            users: Client[]
        }
    },
    programId: string;
}) {

    const [response, setResponse] = useState<any>();

    useEffect(() => {
        // ensure data is available
        if (data && data.trainerWithClients && data.trainerWithClients.users) {
            // set the response to be an array of objects with a title and slug to populate the CommandSearch
            setResponse(data.trainerWithClients.users);
        }
    }, [data]);

    if (!response) {
        return null;
    }

    return (
        <>
            <SummaryCardGrid
                data={[
                    {
                        icon: UsersRound,
                        title: "Active Clients",
                        value: `${response.length}`
                    },
                ]}
            />
            <Card className="px-8 pb-2">
                <h2 className="flex-1 shrink-0 whitespace-nowrap text-xl font-medium tracking-tight sm:grow-0 pt-6">Clients</h2>
                <p className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5 pb-2">View and manage your clients</p>
                <ClientTable data={response} />
            </Card>
        </>
    )
}

export default WithQuery(ClientInfo, {
    query: GetClientsDocument,
});