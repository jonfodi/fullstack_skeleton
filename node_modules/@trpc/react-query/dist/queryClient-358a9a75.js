'use strict';

var reactQuery = require('@tanstack/react-query');

/**
 * @internal
 */ const getQueryClient = (config)=>config.queryClient ?? new reactQuery.QueryClient(config.queryClientConfig);

exports.getQueryClient = getQueryClient;
