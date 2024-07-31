import { BreadcrumbTemplate } from '../../lib/ui/Breadcrumb';
import { CommandSearch } from '../../lib/ui/CommandSearch';
import { AccountDropdown } from '../../lib/ui/AccountDropdown';

import React from "react";

export default function Header() {

    const [primaryPath, ...path] = new URL(window.location.href).pathname.split('/').filter(Boolean);

    const breadcrumbData = path.map((slug, index, array) => ({
        // Make the first character of the path uppercase for the breadcrumb title
        title: slug.charAt(0).toUpperCase() + slug.slice(1),
        // Add the primary path (i.e trainer or client) to the remaining path
        slug: `/${primaryPath}/${array.slice(0, index + 1).join('/')}`
    }));

    return (
        <header className="flex justify-between sticky top-0 z-30 h-14 items-center gap-4 border-b bg-background px-4 pl-8 py-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent">
            <BreadcrumbTemplate data={[
                { title: 'Dashboard', slug: '/' },
                ...breadcrumbData
            ]} />
            <div className="flex items-center gap-5">
                <CommandSearch data={[
                    { title: 'Clients', slug: '/clients' }
                ]} />
                <AccountDropdown />
            </div>
        </header>
    )
}
