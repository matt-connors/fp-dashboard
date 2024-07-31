import React from "react"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";


export function TabHeader({ tabs, buttons }: { tabs: { title: string, content: React.ReactNode }[], buttons?: React.ReactNode }) {
    return (
        <Tabs defaultValue={tabs[0].title.toLowerCase()}>
            <div className="flex items-center pb-2">
                <TabsList className="bg-[hsl(240_5.58%_94%)]">
                    {
                        tabs.map((tab) => (
                            <TabsTrigger className="font-medium text-sm px-5" value={tab.title.toLowerCase()}>{tab.title}</TabsTrigger>
                        ))
                    }
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                    {buttons && buttons}
                </div>
            </div>
            {
                tabs.map((tab, index) => (
                    <TabsContent value={tab.title.toLowerCase()}>{tab.content}</TabsContent>
                ))
            }
        </Tabs>
    );
}
