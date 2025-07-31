import type { QueryClientConfig } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
/**
 * @internal
 */
export type CreateTRPCReactQueryClientConfig = {
    queryClient?: QueryClient;
    queryClientConfig?: never;
} | {
    queryClientConfig?: QueryClientConfig;
    queryClient?: never;
};
/**
 * @internal
 */
export declare const getQueryClient: (config: CreateTRPCReactQueryClientConfig) => QueryClient;
//# sourceMappingURL=queryClient.d.ts.map