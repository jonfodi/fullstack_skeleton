import type { AnyRouter } from '@trpc/server';
import type { CreateReactQueryHooks } from '../hooks/createRootHooks';
/**
 * Create proxy for decorating procedures
 * @internal
 */
export declare function createReactProxyDecoration<TRouter extends AnyRouter, TSSRContext = unknown>(name: string, hooks: CreateReactQueryHooks<TRouter, TSSRContext>): unknown;
//# sourceMappingURL=decorationProxy.d.ts.map