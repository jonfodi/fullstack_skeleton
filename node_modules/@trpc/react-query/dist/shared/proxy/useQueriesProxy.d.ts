import type { TRPCClient, TRPCClientError } from '@trpc/client';
import type { AnyProcedure, AnyQueryProcedure, AnyRouter, Filter, inferProcedureInput } from '@trpc/server';
import type { inferTransformedProcedureOutput } from '@trpc/server/shared';
import type { TrpcQueryOptionsForUseQueries } from '../../internals/useQueries';
type GetQueryOptions<TProcedure extends AnyProcedure, TPath extends string> = <TData = inferTransformedProcedureOutput<TProcedure>>(input: inferProcedureInput<TProcedure>, opts?: TrpcQueryOptionsForUseQueries<TPath, inferProcedureInput<TProcedure>, inferTransformedProcedureOutput<TProcedure>, TData, TRPCClientError<TProcedure>>) => TrpcQueryOptionsForUseQueries<TPath, inferProcedureInput<TProcedure>, inferTransformedProcedureOutput<TProcedure>, TData, TRPCClientError<TProcedure>>;
/**
 * @internal
 */
export type UseQueriesProcedureRecord<TRouter extends AnyRouter, TPath extends string = ''> = {
    [TKey in keyof Filter<TRouter['_def']['record'], AnyQueryProcedure | AnyRouter>]: TRouter['_def']['record'][TKey] extends AnyRouter ? UseQueriesProcedureRecord<TRouter['_def']['record'][TKey], `${TPath}${TKey & string}.`> : GetQueryOptions<TRouter['_def']['record'][TKey], `${TPath}${TKey & string}`>;
};
/**
 * Create proxy for `useQueries` options
 * @internal
 */
export declare function createUseQueriesProxy<TRouter extends AnyRouter>(client: TRPCClient<TRouter>): UseQueriesProcedureRecord<TRouter, "">;
export {};
//# sourceMappingURL=useQueriesProxy.d.ts.map