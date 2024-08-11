// import { client } from '../../components/react/Interface';
import type { DocumentNode } from 'graphql';

import { createClient, fetchExchange, cacheExchange } from 'urql';
import { retryExchange } from '@urql/exchange-retry';

import { GraphqlUrl } from '../consts';

const options = {
    initialDelayMs: 1000,
    maxDelayMs: 15000,
    randomDelay: true,
    maxNumberAttempts: 3,
    retryIf: (err: any) => err && err.response.status !== 401
};

export const client = createClient({
    url: import.meta.env.VITE_API_URL || GraphqlUrl,
    exchanges: [
        cacheExchange,
        retryExchange(options),
        fetchExchange
    ],
    suspense: true
});

/**
 * Execute a query without react and return the data.
 */
export function getQueryData(document: DocumentNode, options: { [key: string]: any }) {
    return new Promise((resolve, reject) => {
        client.query(document, options)
            .subscribe(({ data, error }) => {
                // Redirect to login if the user is not authenticated
                if (error && error.response.status === 401) {
                    window.location.href = '/login';
                }
                if (data) {
                    resolve(data as typeof document);
                }
                reject('No data returned from query');
            });
    })
}

/**
 * Execute a mutation without react and return the data.
 */
export function getMutationData(document: DocumentNode, options: { [key: string]: any }) {
    return new Promise((resolve, reject) => {
        client.mutation(document, options)
            .subscribe(({ data }) => {
                if (data) {
                    resolve(data as typeof document);
                }
                reject('No data returned from mutation');
            });
    });
}