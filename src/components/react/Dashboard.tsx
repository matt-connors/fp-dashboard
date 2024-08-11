import React, { useState, useEffect } from 'react';

import { SummaryCardGrid } from "@/src/lib/ui/SummaryCard";
import { ClientTable, type Client } from "@/src/components/react/tables/ClientTable";

import { Card } from "@/components/ui/card";

import {
    UsersRound,
    Store
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
        if (data && data.trainerWithClients) {
            // set the response to be an array of objects with a title and slug to populate the CommandSearch
            setResponse(data.trainerWithClients);
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
                        value: `${response.users.length}`
                    },
                    {
                        icon: Store,
                        title: "Your Business",
                        value: `${response.businessName}`
                    }
                ]}
            />
        </>
    )
}

export default WithQuery(ClientInfo, {
    query: GetClientsDocument,
});