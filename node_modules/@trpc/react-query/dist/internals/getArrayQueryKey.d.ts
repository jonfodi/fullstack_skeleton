import type { GetQueryProcedureInput } from './getQueryKey';
export type QueryType = 'any' | 'infinite' | 'query';
export type QueryKey = [
    string[],
    {
        input?: unknown;
        type?: Exclude<QueryType, 'any'>;
    }?
];
export type QueryKeyKnown<TInput, TType extends Exclude<QueryType, 'any'>> = [
    string[],
    {
        input?: GetQueryProcedureInput<TInput>;
        type: TType;
    }?
];
/**
 * To allow easy interactions with groups of related queries, such as
 * invalidating all queries of a router, we use an array as the path when
 * storing in tanstack query. This function converts from the `.` separated
 * path passed around internally by both the legacy and proxy implementation.
 * https://github.com/trpc/trpc/issues/2611
 **/
export declare function getArrayQueryKey(queryKey: unknown[] | string | [string, ...unknown[]] | [string], type: QueryType): QueryKey;
//# sourceMappingURL=getArrayQueryKey.d.ts.map