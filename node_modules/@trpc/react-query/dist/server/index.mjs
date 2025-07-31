import { createFlatProxy, createRecursiveProxy } from '@trpc/server/shared';
import { dehydrate } from '@tanstack/react-query';
import { TRPCUntypedClient, getUntypedClient } from '@trpc/client';
import { callProcedure } from '@trpc/server';
import { g as getArrayQueryKey } from '../getArrayQueryKey-86134f8b.mjs';
import 'react';
import { g as getQueryClient } from '../queryClient-4d766c0c.mjs';

/**
 * Create functions you can use for server-side rendering / static generation
 * @deprecated use `createServerSideHelpers` instead
 */ function createSSGHelpers(opts) {
    const queryClient = getQueryClient(opts);
    const resolvedOpts = (()=>{
        if ('router' in opts) {
            const { transformer , ctx , router  } = opts;
            return {
                serialize: transformer ? ('input' in transformer ? transformer.input : transformer).serialize : (obj)=>obj,
                query: (queryOpts)=>{
                    return callProcedure({
                        procedures: router._def.procedures,
                        path: queryOpts.path,
                        rawInput: queryOpts.input,
                        ctx,
                        type: 'query'
                    });
                }
            };
        }
        const { client  } = opts;
        const untypedClient = client instanceof TRPCUntypedClient ? client : getUntypedClient(client);
        return {
            query: (queryOpts)=>untypedClient.query(queryOpts.path, queryOpts.input),
            serialize: (obj)=>untypedClient.runtime.transformer.serialize(obj)
        };
    })();
    const prefetchQuery = async (...pathAndInput)=>{
        return queryClient.prefetchQuery({
            queryKey: getArrayQueryKey(pathAndInput, 'query'),
            queryFn: ()=>resolvedOpts.query({
                    path: pathAndInput[0],
                    input: pathAndInput[1]
                })
        });
    };
    const prefetchInfiniteQuery = async (...pathAndInput)=>{
        return queryClient.prefetchInfiniteQuery({
            queryKey: getArrayQueryKey(pathAndInput, 'infinite'),
            queryFn: ()=>resolvedOpts.query({
                    path: pathAndInput[0],
                    input: pathAndInput[1]
                })
        });
    };
    const fetchQuery = async (...pathAndInput)=>{
        return queryClient.fetchQuery({
            queryKey: getArrayQueryKey(pathAndInput, 'query'),
            queryFn: ()=>resolvedOpts.query({
                    path: pathAndInput[0],
                    input: pathAndInput[1]
                })
        });
    };
    const fetchInfiniteQuery = async (...pathAndInput)=>{
        return queryClient.fetchInfiniteQuery({
            queryKey: getArrayQueryKey(pathAndInput, 'infinite'),
            queryFn: ()=>resolvedOpts.query({
                    path: pathAndInput[0],
                    input: pathAndInput[1]
                })
        });
    };
    function _dehydrate(opts = {
        shouldDehydrateQuery () {
            // makes sure to serialize errors
            return true;
        }
    }) {
        const before = dehydrate(queryClient, opts);
        const after = resolvedOpts.serialize(before);
        return after;
    }
    return {
        prefetchQuery,
        prefetchInfiniteQuery,
        fetchQuery,
        fetchInfiniteQuery,
        dehydrate: _dehydrate,
        queryClient
    };
}

/**
 * Create functions you can use for server-side rendering / static generation
 * @see https://trpc.io/docs/client/nextjs/server-side-helpers
 */ function createServerSideHelpers(opts) {
    const helpers = createSSGHelpers(opts);
    return createFlatProxy((key)=>{
        if (key === 'queryClient') {
            return helpers.queryClient;
        }
        if (key === 'dehydrate') {
            return helpers.dehydrate;
        }
        return createRecursiveProxy((opts)=>{
            const args = opts.args;
            const pathCopy = [
                key,
                ...opts.path
            ];
            const utilName = pathCopy.pop();
            const fullPath = pathCopy.join('.');
            const helperKey = `${utilName}Query`;
            //     ^?
            const fn = helpers[helperKey];
            return fn(fullPath, ...args);
        });
    });
}

export { createServerSideHelpers };
