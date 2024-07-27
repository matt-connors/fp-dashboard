import React, { Suspense } from 'react';

import { Provider } from 'urql';
import { client } from '../../lib/utils/graphql';

const UrqlProvider = ({ children }: any) => {
    return <Provider value={client}>{children}</Provider>;
};

export default function App({ children }: any) {
    return (
        <UrqlProvider>
            <Suspense fallback={<div>Loading...</div>}>
                {children}
            </Suspense>
        </UrqlProvider>
    );
}