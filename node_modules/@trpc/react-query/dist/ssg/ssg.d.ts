import type { DehydratedState, DehydrateOptions, InfiniteData } from '@tanstack/react-query';
import type { AnyRouter, inferHandlerInput, inferProcedureOutput } from '@trpc/server';
import type { CreateServerSideHelpersOptions } from '../server/types';
/**
 * Create functions you can use for server-side rendering / static generation
 * @deprecated use `createServerSideHelpers` instead
 */
export declare function createSSGHelpers<TRouter extends AnyRouter>(opts: CreateServerSideHelpersOptions<TRouter>): {
    prefetchQuery: <TPath extends string & keyof TRouter["_def"]["queries"], TProcedure extends TRouter["_def"]["queries"][TPath]>(path: TPath, ...args: inferHandlerInput<TProcedure>) => Promise<void>;
    prefetchInfiniteQuery: <TPath_1 extends string & keyof TRouter["_def"]["queries"], TProcedure_1 extends TRouter["_def"]["queries"][TPath_1]>(path: TPath_1, ...args: inferHandlerInput<TProcedure_1>) => Promise<void>;
    fetchQuery: <TPath_2 extends string & keyof TRouter["_def"]["queries"], TProcedure_2 extends TRouter["_def"]["queries"][TPath_2], TOutput extends inferProcedureOutput<TProcedure_2>>(path: TPath_2, ...args: inferHandlerInput<TProcedure_2>) => Promise<TOutput>;
    fetchInfiniteQuery: <TPath_3 extends string & keyof TRouter["_def"]["queries"], TProcedure_3 extends TRouter["_def"]["queries"][TPath_3], TOutput_1 extends inferProcedureOutput<TProcedure_3>>(path: TPath_3, ...args: inferHandlerInput<TProcedure_3>) => Promise<InfiniteData<TOutput_1>>;
    dehydrate: (opts?: DehydrateOptions) => DehydratedState;
    queryClient: import("@tanstack/react-query").QueryClient;
};
//# sourceMappingURL=ssg.d.ts.map