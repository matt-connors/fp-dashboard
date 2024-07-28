import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React from "react";


function LongBreadCrumb({ data }: { data: { title: string, slug: string }[] }) {
    let first = data[0];
    let last = data[data.length - 1];
    let secondLast = data[data.length - 2];

    return (
        <>
            {/* First breadcrumb as normal */}
            <BreadcrumbItem key={first.slug}>
                <BreadcrumbLink href={first.slug}>{first.title}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {/* Other breacrumbs as dropdown */}
            <BreadcrumbItem>
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                        <BreadcrumbEllipsis className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        {data.slice(1, -2).map(({ title, slug }) => (
                            <DropdownMenuItem key={slug}>
                                <BreadcrumbLink href={slug}>{title}</BreadcrumbLink>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </BreadcrumbItem>
            {/* Second to last breadcrumb as normal */}
            <BreadcrumbItem key={secondLast.slug}>
                <BreadcrumbLink href={secondLast.slug}>{secondLast.title}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {/* Last breadcrumb as normal */}
            <BreadcrumbItem key={last.slug}>
                <BreadcrumbLink href={last.slug}>{last.title}</BreadcrumbLink>
            </BreadcrumbItem>
        </>
    )
}

function ShortBreadCrumb({ data }: { data: { title: string, slug: string }[] }) {
    return data.map(({ title, slug }, index) => (
        <>
            <BreadcrumbItem key={slug}>
                <BreadcrumbLink href={slug}>{title}</BreadcrumbLink>
            </BreadcrumbItem>
            {index < data.length - 1 && <BreadcrumbSeparator key={slug + index} />}
        </>
    ))
}

export function BreadcrumbTemplate({ data }: { data: { title: string, slug: string }[] }) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {
                    data.length > 3
                        ? <LongBreadCrumb data={data} />
                        : <ShortBreadCrumb data={data} />
                }
            </BreadcrumbList>
        </Breadcrumb>
    )
}
