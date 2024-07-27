import React, { useState, useRef, useEffect, Suspense, useMemo } from 'react';
import WithQuery from './WithQuery';
import { GetUserDocument } from '../../graphql/generated';

const App = ({ data }: any) => {

    const [response, setResponse] = useState<any>();

    useEffect(() => {
        if (data) {
            setResponse(data);
        }
    }, [data]);


    return (
        <div>
            <h1>Test</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <div>{JSON.stringify(response)}</div>
            </Suspense>
        </div>
    )
};

export default WithQuery(App, {
    query: GetUserDocument,
    variables: {
        userId: '659c9b25-8ebc-4c3a-b1b2-ab1da83522f0'
    }
});