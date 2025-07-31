import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';
import type { Observable } from '@trpc/server/observable';
import type { TRPCContextState } from '../../internals/context';
import type { TRPCUseQueries } from '../../internals/useQueries';
import type { CreateTRPCReactOptions } from '../types';
import type { CreateClient, TRPCProvider, UseDehydratedState, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult, UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCSubscriptionOptions } from './types';
/**
 * @internal
 */
export declare function createRootHooks<TRouter extends AnyRouter, TSSRContext = unknown>(config?: CreateTRPCReactOptions<TRouter>): {
    Provider: TRPCProvider<TRouter, TSSRContext>;
    createClient: CreateClient<TRouter>;
    useContext: () => TRPCContextState<TRouter, TSSRContext>;
    useUtils: () => TRPCContextState<TRouter, TSSRContext>;
    useQuery: (pathAndInput: [path: string, ...args: unknown[]], opts?: UseTRPCQueryOptions<unknown, unknown, unknown, unknown, TRPCClientErrorLike<TRouter>, unknown> | undefined) => UseTRPCQueryResult<unknown, TRPCClientErrorLike<TRouter>>;
    useQueries: TRPCUseQueries<TRouter>;
    useMutation: (path: string | [string], opts?: UseTRPCMutationOptions<unknown, TRPCClientErrorLike<TRouter>, unknown, unknown> | undefined) => UseTRPCMutationResult<unknown, TRPCClientErrorLike<TRouter>, unknown, unknown>;
    useSubscription: (pathAndInput: [
        path: string,
        ...args: unknown[]
    ], opts: UseTRPCSubscriptionOptions<Observable<unknown, unknown>, TRPCClientErrorLike<TRouter>>) => void;
    useDehydratedState: UseDehydratedState<TRouter>;
    useInfiniteQuery: (pathAndInput: [
        path: string,
        input: Record<any, unknown>
    ], opts?: UseTRPCInfiniteQueryOptions<unknown, unknown, unknown, TRPCClientErrorLike<TRouter>> | undefined) => UseTRPCInfiniteQueryResult<unknown, TRPCClientErrorLike<TRouter>>;
};
//# sourceMappingURL=createHooksInternal.d.ts.map