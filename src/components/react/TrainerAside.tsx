import React from "react";

import {
    HomeIcon,
    UsersRound,
    Settings,
    Activity,
    ScrollText
} from "lucide-react";

import { Aside } from "./Aside";


export function TrainerAside() {
    return (
        <Aside
            menuItems={[
                {
                    title: "Dashboard",
                    icon: HomeIcon,
                    slug: "/",
                },
                {
                    title: "Clients",
                    icon: UsersRound,
                    slug: "/clients",
                },
                {
                    title: "Programs",
                    icon: ScrollText,
                    slug: "/programs",
                },
                {
                    title: "Exercises",
                    icon: Activity,
                    slug: "/exercises",
                },
            ]}
        />
    )
}