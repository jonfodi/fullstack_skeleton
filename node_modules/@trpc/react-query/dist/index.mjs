export * from '@trpc/client';
import { c as createHooksInternal, a as createReactQueryUtilsProxy, b as createReactProxyDecoration } from './createHooksInternal-063195fc.mjs';
export { g as getQueryKey } from './createHooksInternal-063195fc.mjs';
import { createFlatProxy } from '@trpc/server/shared';
import { useMemo } from 'react';
import '@tanstack/react-query';
import './getArrayQueryKey-86134f8b.mjs';

/**
 * @internal
 */ function createHooksInternalProxy(trpc) {
    return createFlatProxy((key)=>{
        if (key === 'useContext' || key === 'useUtils') {
            return ()=>{
                const context = trpc.useUtils();
                // create a stable reference of the utils context
                return useMemo(()=>{
                    return createReactQueryUtilsProxy(context);
                }, [
                    context
                ]);
            };
        }
        if (trpc.hasOwnProperty(key)) {
            return trpc[key];
        }
        return createReactProxyDecoration(key, trpc);
    });
}
function createTRPCReact(opts) {
    const hooks = createHooksInternal(opts);
    const proxy = createHooksInternalProxy(hooks);
    return proxy;
}

// interop:
/**
 * @deprecated use `createTRPCReact` instead
 */ function createReactQueryHooks(opts) {
    const trpc = createHooksInternal(opts);
    const proxy = createHooksInternalProxy(trpc);
    return {
        ...trpc,
        proxy
    };
}

export { createReactQueryHooks, createTRPCReact };
