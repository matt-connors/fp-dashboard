import React from 'react';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function SummaryCard({ chunk, title, value, icon }: { chunk: number, title: string, value: string, icon?: any}) {

    const Icon = icon;

    return (
        <Card x-chunk={"dashboard-01-chunk-" + chunk}>
            <CardHeader
                className="flex flex-row items-center justify-between space-y-0 pb-2"
            >
                <CardTitle className="text-sm font-medium text-muted-foreground">{ title }</CardTitle>
                { icon && <Icon className="h-4 w-4 text-muted-foreground" /> }
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-medium leading-none">{ value }</div>
                {/* <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                </p> */}
            </CardContent>
        </Card>
    )
}

export function SummaryCardGrid({ data }: { data: { title: string, value: string, icon?: any }[] }) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.map((card, index) => (
                <SummaryCard key={index} {...card} chunk={index} />
            ))}
        </div>
    )
}