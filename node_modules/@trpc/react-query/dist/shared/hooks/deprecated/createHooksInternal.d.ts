import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter, inferProcedureClientError, inferProcedureInput, inferProcedureOutput, ProcedureRecord } from '@trpc/server';
import type { inferObservableValue } from '@trpc/server/observable';
import type { inferTransformedProcedureOutput } from '@trpc/server/shared';
import type { TRPCContextState } from '../../../internals/context';
import type { TRPCUseQueries } from '../../../internals/useQueries';
import type { CreateTRPCReactOptions } from '../../types';
import type { CreateClient, TRPCProvider, UseDehydratedState, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult, UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCSubscriptionOptions } from '../types';
type inferInfiniteQueryNames<TObj extends ProcedureRecord> = {
    [TPath in keyof TObj]: inferProcedureInput<TObj[TPath]> extends {
        cursor?: any;
    } ? TPath : never;
}[keyof TObj];
type inferProcedures<TObj extends ProcedureRecord> = {
    [TPath in keyof TObj]: {
        input: inferProcedureInput<TObj[TPath]>;
        output: inferTransformedProcedureOutput<TObj[TPath]>;
    };
};
/**
 * Hack to infer the type of `createReactQueryHooks`
 * @link https://stackoverflow.com/a/59072991
 */
declare class GnClass<TRouter extends AnyRouter, TSSRContext = unknown> {
    fn(): {
        Provider: TRPCProvider<TRouter, TSSRContext>;
        createClient: CreateClient<TRouter>;
        useContext: () => TRPCContextState<TRouter, TSSRContext>;
        useUtils: () => TRPCContextState<TRouter, TSSRContext>;
        useQuery: <TPath extends string & keyof TRouter["_def"]["queries"], TQueryFnData = inferProcedures<TRouter["_def"]["queries"]>[TPath]["output"], TData = inferProcedures<TRouter["_def"]["queries"]>[TPath]["output"]>(pathAndInput: [path: TPath, ...args: import("@trpc/server").ProcedureArgs<import("@trpc/server").inferProcedureParams<TRouter["_def"]["queries"][TPath]>>], opts?: UseTRPCQueryOptions<TPath, inferProcedures<TRouter["_def"]["queries"]>[TPath]["input"], TQueryFnData, TData, TRPCClientErrorLike<TRouter>, TQueryFnData> | undefined) => UseTRPCQueryResult<TData, TRPCClientErrorLike<TRouter>>;
        useQueries: TRPCUseQueries<TRouter>;
        useMutation: <TPath_1 extends string & keyof TRouter["_def"]["mutations"], TContext = unknown>(path: TPath_1 | [TPath_1], opts?: UseTRPCMutationOptions<inferProcedures<TRouter["_def"]["mutations"]>[TPath_1]["input"], TRPCClientErrorLike<TRouter>, inferProcedures<TRouter["_def"]["mutations"]>[TPath_1]["output"], TContext> | undefined) => UseTRPCMutationResult<inferProcedures<TRouter["_def"]["mutations"]>[TPath_1]["output"], TRPCClientErrorLike<TRouter>, inferProcedures<TRouter["_def"]["mutations"]>[TPath_1]["input"], TContext>;
        useSubscription: <TPath_2 extends string & keyof TRouter["_def"]["subscriptions"], TOutput extends inferObservableValue<inferProcedureOutput<TRouter["_def"]["subscriptions"][TPath_2]>>>(pathAndInput: [path: TPath_2, ...args: import("@trpc/server").ProcedureArgs<import("@trpc/server").inferProcedureParams<TRouter["_def"]["subscriptions"][TPath_2]>>], opts: UseTRPCSubscriptionOptions<inferObservableValue<inferProcedureOutput<TRouter["_def"]["subscriptions"][TPath_2]>>, inferProcedureClientError<TRouter["_def"]["subscriptions"][TPath_2]>>) => void;
        useDehydratedState: UseDehydratedState<TRouter>;
        useInfiniteQuery: <TPath_3 extends inferInfiniteQueryNames<TRouter["_def"]["queries"]> & string>(pathAndInput: [path: TPath_3, input: Omit<inferProcedures<TRouter["_def"]["queries"]>[TPath_3]["input"], "cursor">], opts?: UseTRPCInfiniteQueryOptions<TPath_3, inferProcedures<TRouter["_def"]["queries"]>[TPath_3]["input"], inferProcedures<TRouter["_def"]["queries"]>[TPath_3]["output"], TRPCClientErrorLike<TRouter>> | undefined) => UseTRPCInfiniteQueryResult<inferProcedures<TRouter["_def"]["queries"]>[TPath_3]["output"], TRPCClientErrorLike<TRouter>>;
    };
}
type returnTypeInferer<TType> = TType extends (a: Record<string, string>) => infer U ? U : never;
type fooType<TRouter extends AnyRouter, TSSRContext = unknown> = GnClass<TRouter, TSSRContext>['fn'];
/**
 * Infer the type of a `createReactQueryHooks` function
 * @internal
 */
export type CreateReactQueryHooks<TRouter extends AnyRouter, TSSRContext = unknown> = returnTypeInferer<fooType<TRouter, TSSRContext>>;
/**
 * Create strongly typed react hooks
 * @internal
 * @deprecated
 */
export declare function createHooksInternal<TRouter extends AnyRouter, TSSRContext = unknown>(config?: CreateTRPCReactOptions<TRouter>): {
    Provider: TRPCProvider<TRouter, TSSRContext>;
    createClient: CreateClient<TRouter>;
    useContext: () => TRPCContextState<TRouter, TSSRContext>;
    useUtils: () => TRPCContextState<TRouter, TSSRContext>;
    useQuery: <TPath extends string & keyof TRouter["_def"]["queries"], TQueryFnData = inferProcedures<TRouter["_def"]["queries"]>[TPath]["output"], TData = inferProcedures<TRouter["_def"]["queries"]>[TPath]["output"]>(pathAndInput: [path: TPath, ...args: import("@trpc/server").ProcedureArgs<import("@trpc/server").inferProcedureParams<TRouter["_def"]["queries"][TPath]>>], opts?: UseTRPCQueryOptions<TPath, inferProcedures<TRouter["_def"]["queries"]>[TPath]["input"], TQueryFnData, TData, TRPCClientErrorLike<TRouter>, TQueryFnData> | undefined) => UseTRPCQueryResult<TData, TRPCClientErrorLike<TRouter>>;
    useQueries: TRPCUseQueries<TRouter>;
    useMutation: <TPath_1 extends string & keyof TRouter["_def"]["mutations"], TContext = unknown>(path: TPath_1 | [TPath_1], opts?: UseTRPCMutationOptions<inferProcedures<TRouter["_def"]["mutations"]>[TPath_1]["input"], TRPCClientErrorLike<TRouter>, inferProcedures<TRouter["_def"]["mutations"]>[TPath_1]["output"], TContext> | undefined) => UseTRPCMutationResult<inferProcedures<TRouter["_def"]["mutations"]>[TPath_1]["output"], TRPCClientErrorLike<TRouter>, inferProcedures<TRouter["_def"]["mutations"]>[TPath_1]["input"], TContext>;
    useSubscription: <TPath_2 extends string & keyof TRouter["_def"]["subscriptions"], TOutput extends inferObservableValue<inferProcedureOutput<TRouter["_def"]["subscriptions"][TPath_2]>>>(pathAndInput: [path: TPath_2, ...args: import("@trpc/server").ProcedureArgs<import("@trpc/server").inferProcedureParams<TRouter["_def"]["subscriptions"][TPath_2]>>], opts: UseTRPCSubscriptionOptions<inferObservableValue<inferProcedureOutput<TRouter["_def"]["subscriptions"][TPath_2]>>, inferProcedureClientError<TRouter["_def"]["subscriptions"][TPath_2]>>) => void;
    useDehydratedState: UseDehydratedState<TRouter>;
    useInfiniteQuery: <TPath_3 extends inferInfiniteQueryNames<TRouter["_def"]["queries"]> & string>(pathAndInput: [path: TPath_3, input: Omit<inferProcedures<TRouter["_def"]["queries"]>[TPath_3]["input"], "cursor">], opts?: UseTRPCInfiniteQueryOptions<TPath_3, inferProcedures<TRouter["_def"]["queries"]>[TPath_3]["input"], inferProcedures<TRouter["_def"]["queries"]>[TPath_3]["output"], TRPCClientErrorLike<TRouter>> | undefined) => UseTRPCInfiniteQueryResult<inferProcedures<TRouter["_def"]["queries"]>[TPath_3]["output"], TRPCClientErrorLike<TRouter>>;
};
export {};
//# sourceMappingURL=createHooksInternal.d.ts.map