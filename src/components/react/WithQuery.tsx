import { type UseQueryArgs } from 'urql'

import React, { useCallback, useEffect, useState } from 'react';
import { getQueryData } from '../../lib/utils/graphql';
import { showError } from '../../lib/utils/errors';
import type { DocumentNode } from 'graphql';

/**
 * Pass a query to a component as a prop.
 */
function WithQuery(WrappedComponent: React.FC<{ data: any }>, query: UseQueryArgs) {

    const Wrapper = ({ ...props }) => {

        const [data, setData] = useState(null);

        const getData = useCallback(async () => {
            const response: any = await getQueryData(query.query as DocumentNode, query.variables as any);
            if (response.error) {
                showError({
                    title: 'Network Error',
                    description: 'There was an error retrieving necessary data from our server. Please try refreshing the page or contact support if the problem persists.'
                });
            }
            if (response) {
                setData(response);
            }
        }, [query, data]);

        useEffect(() => {
            getData();
        }, [getData]);

        return <WrappedComponent data={data} {...props} />;
    };

    return Wrapper;
}

export default WithQuery;
