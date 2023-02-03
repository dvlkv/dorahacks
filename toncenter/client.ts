// Ton Center HTTP API

import { TonClient } from 'ton';

export const toncenter = new TonClient({
    endpoint: 'https://toncenter.com/api/v2/jsonRPC',
});