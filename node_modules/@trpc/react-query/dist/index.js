'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var client = require('@trpc/client');
var createHooksInternal = require('./createHooksInternal-d1a331c0.js');
var shared = require('@trpc/server/shared');
var React = require('react');
require('@tanstack/react-query');
require('./getArrayQueryKey-4bdb5cc2.js');

/**
 * @internal
 */ function createHooksInternalProxy(trpc) {
    return shared.createFlatProxy((key)=>{
        if (key === 'useContext' || key === 'useUtils') {
            return ()=>{
                const context = trpc.useUtils();
                // create a stable reference of the utils context
                return React.useMemo(()=>{
                    return createHooksInternal.createReactQueryUtilsProxy(context);
                }, [
                    context
                ]);
            };
        }
        if (trpc.hasOwnProperty(key)) {
            return trpc[key];
        }
        return createHooksInternal.createReactProxyDecoration(key, trpc);
    });
}
function createTRPCReact(opts) {
    const hooks = createHooksInternal.createHooksInternal(opts);
    const proxy = createHooksInternalProxy(hooks);
    return proxy;
}

// interop:
/**
 * @deprecated use `createTRPCReact` instead
 */ function createReactQueryHooks(opts) {
    const trpc = createHooksInternal.createHooksInternal(opts);
    const proxy = createHooksInternalProxy(trpc);
    return {
        ...trpc,
        proxy
    };
}

exports.getQueryKey = createHooksInternal.getQueryKey;
exports.createReactQueryHooks = createReactQueryHooks;
exports.createTRPCReact = createTRPCReact;
Object.keys(client).forEach(function (k) {
  if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return client[k]; }
  });
});
