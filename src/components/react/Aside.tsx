import clsx from "clsx";
import React from "react";

export function Aside({ menuItems }: { menuItems: { title: string, icon: any, slug: string }[] }) {
    return (
        <aside className="fixed left-[0] top-[0] bg-background h-full w-[240px] p-3 pt-0">
            <div className="pl-3 mb-[8px] py-4">
                <div className="h-[37px] flex items-center">
                    <span className="text-md">Fitness Platform</span>
                </div>
            </div>
            <nav className="h-full">
                <ul>
                    {menuItems.map(({ title, icon, slug }) => {
                        let Icon = icon;

                        let [type, primaryPath] = window.location.pathname.split('/').filter(Boolean);
                        let slugPrimaryPath = slug.split('/')[1];
                        let isActive = primaryPath === slugPrimaryPath || (!primaryPath && slugPrimaryPath === "");
                        return (
                            <li key={slug}>
                                <a href={`/${type}${slug}`} className={clsx(
                                    "flex items-center gap-3 py-1.5 px-3 rounded-md",
                                    isActive && "bg-primary text-white"
                                )}>
                                    {icon && <Icon className="h-4 w-4 font-medium text-md" />}
                                    <span>{title}</span>
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </aside>
    )

}