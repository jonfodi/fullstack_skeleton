import type { CancelOptions, InfiniteData, InvalidateOptions, InvalidateQueryFilters, Query, RefetchOptions, RefetchQueryFilters, ResetOptions, SetDataOptions, Updater } from '@tanstack/react-query';
import type { TRPCClientError } from '@trpc/client';
import type { AnyQueryProcedure, AnyRouter, DeepPartial, Filter, inferProcedureInput, ProtectedIntersection } from '@trpc/server';
import type { inferTransformedProcedureOutput } from '@trpc/server/shared';
import type { DecoratedProxyTRPCContextProps, TRPCContextState, TRPCFetchInfiniteQueryOptions, TRPCFetchQueryOptions } from '../../internals/context';
import type { QueryKeyKnown } from '../../internals/getArrayQueryKey';
type DecorateProcedure<TProcedure extends AnyQueryProcedure> = {
    /**
     * @link https://tanstack.com/query/v4/docs/reference/QueryClient#queryclientfetchquery
     */
    fetch(input: inferProcedureInput<TProcedure>, opts?: TRPCFetchQueryOptions<inferProcedureInput<TProcedure>, TRPCClientError<TProcedure>, inferTransformedProcedureOutput<TProcedure>>): Promise<inferTransformedProcedureOutput<TProcedure>>;
    /**
     * @link https://tanstack.com/query/v4/docs/reference/QueryClient#queryclientfetchinfinitequery
     */
    fetchInfinite(input: inferProcedureInput<TProcedure>, opts?: TRPCFetchInfiniteQueryOptions<inferProcedureInput<TProcedure>, TRPCClientError<TProcedure>, inferTransformedProcedureOutput<TProcedure>>): Promise<InfiniteData<inferTransformedProcedureOutput<TProcedure>>>;
    /**
     * @link https://tanstack.com/query/v4/docs/reference/QueryClient#queryclientprefetchquery
     */
    prefetch(input: inferProcedureInput<TProcedure>, opts?: TRPCFetchQueryOptions<inferProcedureInput<TProcedure>, TRPCClientError<TProcedure>, inferTransformedProcedureOutput<TProcedure>>): Promise<void>;
    /**
     * @link https://tanstack.com/query/v4/docs/reference/QueryClient#queryclientprefetchinfinitequery
     */
    prefetchInfinite(input: inferProcedureInput<TProcedure>, opts?: TRPCFetchInfiniteQueryOptions<inferProcedureInput<TProcedure>, TRPCClientError<TProcedure>, inferTransformedProcedureOutput<TProcedure>>): Promise<void>;
    /**
     * @link https://tanstack.com/query/v4/docs/react/reference/QueryClient#queryclientensurequerydata
     */
    ensureData(input: inferProcedureInput<TProcedure>, opts?: TRPCFetchQueryOptions<inferProcedureInput<TProcedure>, TRPCClientError<TProcedure>, inferTransformedProcedureOutput<TProcedure>>): Promise<inferTransformedProcedureOutput<TProcedure>>;
    /**
     * @link https://tanstack.com/query/v4/docs/reference/QueryClient#queryclientinvalidatequeries
     */
    invalidate(input?: DeepPartial<inferProcedureInput<TProcedure>>, filters?: Omit<InvalidateQueryFilters, 'predicate'> & {
        predicate?: (query: Query<inferProcedureInput<TProcedure>, TRPCClientError<TProcedure>, inferProcedureInput<TProcedure>, QueryKeyKnown<inferProcedureInput<TProcedure>, inferProcedureInput<TProcedure> extends {
            cursor?: any;
        } | void ? 'infinite' : 'query'>>) => boolean;
    }, options?: InvalidateOptions): Promise<void>;
    /**
     * @link https://tanstack.com/query/v4/docs/reference/QueryClient#queryclientrefetchqueries
     */
    refetch(input?: inferProcedureInput<TProcedure>, filters?: RefetchQueryFilters, options?: RefetchOptions): Promise<void>;
    /**
     * @link https://tanstack.com/query/v4/docs/reference/QueryClient#queryclientcancelqueries
     */
    cancel(input?: inferProcedureInput<TProcedure>, options?: CancelOptions): Promise<void>;
    /**
     * @link https://tanstack.com/query/v4/docs/reference/QueryClient#queryclientresetqueries
     */
    reset(input?: inferProcedureInput<TProcedure>, options?: ResetOptions): Promise<void>;
    /**
     * @link https://tanstack.com/query/v4/docs/reference/QueryClient#queryclientsetquerydata
     */
    setData(
    /**
     * The input of the procedure
     */
    input: inferProcedureInput<TProcedure>, updater: Updater<inferTransformedProcedureOutput<TProcedure> | undefined, inferTransformedProcedureOutput<TProcedure> | undefined>, options?: SetDataOptions): void;
    /**
     * @link https://tanstack.com/query/v4/docs/reference/QueryClient#queryclientsetquerydata
     */
    setInfiniteData(input: inferProcedureInput<TProcedure>, updater: Updater<InfiniteData<inferTransformedProcedureOutput<TProcedure>> | undefined, InfiniteData<inferTransformedProcedureOutput<TProcedure>> | undefined>, options?: SetDataOptions): void;
    /**
     * @link https://tanstack.com/query/v4/docs/reference/QueryClient#queryclientgetquerydata
     */
    getData(input?: inferProcedureInput<TProcedure>): inferTransformedProcedureOutput<TProcedure> | undefined;
    /**
     * @link https://tanstack.com/query/v4/docs/reference/QueryClient#queryclientgetquerydata
     */
    getInfiniteData(input?: inferProcedureInput<TProcedure>): InfiniteData<inferTransformedProcedureOutput<TProcedure>> | undefined;
};
/**
 * this is the type that is used to add in procedures that can be used on
 * an entire router
 */
type DecorateRouter = {
    /**
     * Invalidate the full router
     * @link https://trpc.io/docs/v10/useContext#query-invalidation
     * @link https://tanstack.com/query/v4/docs/react/guides/query-invalidation
     */
    invalidate(input?: undefined, filters?: InvalidateQueryFilters, options?: InvalidateOptions): Promise<void>;
};
/**
 * @internal
 */
export type DecoratedProcedureUtilsRecord<TRouter extends AnyRouter> = DecorateRouter & {
    [TKey in keyof Filter<TRouter['_def']['record'], AnyQueryProcedure | AnyRouter>]: TRouter['_def']['record'][TKey] extends AnyRouter ? DecoratedProcedureUtilsRecord<TRouter['_def']['record'][TKey]> & DecorateRouter : DecorateProcedure<TRouter['_def']['record'][TKey]>;
};
export type CreateReactUtilsProxy<TRouter extends AnyRouter, TSSRContext> = ProtectedIntersection<DecoratedProxyTRPCContextProps<TRouter, TSSRContext>, DecoratedProcedureUtilsRecord<TRouter>>;
/**
 * @internal
 */
export declare function createReactQueryUtilsProxy<TRouter extends AnyRouter, TSSRContext>(context: TRPCContextState<AnyRouter, unknown>): ProtectedIntersection<DecoratedProxyTRPCContextProps<TRouter, TSSRContext>, DecoratedProcedureUtilsRecord<TRouter>>;
export {};
//# sourceMappingURL=utilsProxy.d.ts.map