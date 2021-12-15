import { split, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { browser } from '$app/env';

export function createApolloClient() {
    const wsLink = browser
        ? new WebSocketLink({
            uri: 'ws://localhost:8080/v1/graphql',
            options: {
                reconnect: true
            }
        })
        : null;
    const httpLink = new HttpLink({
        uri: 'http://localhost:8080/v1/graphql'
    });
    const link = browser
        ? split(
            ({ query }) => {
                const definition = getMainDefinition(query);
                return (
                    definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
                );
            },
            wsLink,
            httpLink
        )
        : httpLink;

    const cache = new InMemoryCache();

    const client = new ApolloClient({
        link,
        cache
    });

    return client;
}
