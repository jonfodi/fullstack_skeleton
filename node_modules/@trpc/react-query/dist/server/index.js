'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var shared = require('@trpc/server/shared');
var reactQuery = require('@tanstack/react-query');
var client = require('@trpc/client');
var server = require('@trpc/server');
var getArrayQueryKey = require('../getArrayQueryKey-4bdb5cc2.js');
require('react');
var queryClient = require('../queryClient-358a9a75.js');

/**
 * Create functions you can use for server-side rendering / static generation
 * @deprecated use `createServerSideHelpers` instead
 */ function createSSGHelpers(opts) {
    const queryClient$1 = queryClient.getQueryClient(opts);
    const resolvedOpts = (()=>{
        if ('router' in opts) {
            const { transformer , ctx , router  } = opts;
            return {
                serialize: transformer ? ('input' in transformer ? transformer.input : transformer).serialize : (obj)=>obj,
                query: (queryOpts)=>{
                    return server.callProcedure({
                        procedures: router._def.procedures,
                        path: queryOpts.path,
                        rawInput: queryOpts.input,
                        ctx,
                        type: 'query'
                    });
                }
            };
        }
        const { client: client$1  } = opts;
        const untypedClient = client$1 instanceof client.TRPCUntypedClient ? client$1 : client.getUntypedClient(client$1);
        return {
            query: (queryOpts)=>untypedClient.query(queryOpts.path, queryOpts.input),
            serialize: (obj)=>untypedClient.runtime.transformer.serialize(obj)
        };
    })();
    const prefetchQuery = async (...pathAndInput)=>{
        return queryClient$1.prefetchQuery({
            queryKey: getArrayQueryKey.getArrayQueryKey(pathAndInput, 'query'),
            queryFn: ()=>resolvedOpts.query({
                    path: pathAndInput[0],
                    input: pathAndInput[1]
                })
        });
    };
    const prefetchInfiniteQuery = async (...pathAndInput)=>{
        return queryClient$1.prefetchInfiniteQuery({
            queryKey: getArrayQueryKey.getArrayQueryKey(pathAndInput, 'infinite'),
            queryFn: ()=>resolvedOpts.query({
                    path: pathAndInput[0],
                    input: pathAndInput[1]
                })
        });
    };
    const fetchQuery = async (...pathAndInput)=>{
        return queryClient$1.fetchQuery({
            queryKey: getArrayQueryKey.getArrayQueryKey(pathAndInput, 'query'),
            queryFn: ()=>resolvedOpts.query({
                    path: pathAndInput[0],
                    input: pathAndInput[1]
                })
        });
    };
    const fetchInfiniteQuery = async (...pathAndInput)=>{
        return queryClient$1.fetchInfiniteQuery({
            queryKey: getArrayQueryKey.getArrayQueryKey(pathAndInput, 'infinite'),
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
        const before = reactQuery.dehydrate(queryClient$1, opts);
        const after = resolvedOpts.serialize(before);
        return after;
    }
    return {
        prefetchQuery,
        prefetchInfiniteQuery,
        fetchQuery,
        fetchInfiniteQuery,
        dehydrate: _dehydrate,
        queryClient: queryClient$1
    };
}

/**
 * Create functions you can use for server-side rendering / static generation
 * @see https://trpc.io/docs/client/nextjs/server-side-helpers
 */ function createServerSideHelpers(opts) {
    const helpers = createSSGHelpers(opts);
    return shared.createFlatProxy((key)=>{
        if (key === 'queryClient') {
            return helpers.queryClient;
        }
        if (key === 'dehydrate') {
            return helpers.dehydrate;
        }
        return shared.createRecursiveProxy((opts)=>{
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

exports.createServerSideHelpers = createServerSideHelpers;
