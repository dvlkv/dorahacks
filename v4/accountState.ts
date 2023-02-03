import { Cell } from 'ton-core';
import { simpleNftCollectionAddress } from '../contract/address';
import { parseNftCollectionState } from '../contract/parseState';
import { assert } from '../utils/assert';
import { client4 } from './client';

(async () => {
    let { last: { seqno } } = await client4.getLastBlock();
    
    let result = await client4.getAccount(
        seqno, 
        simpleNftCollectionAddress
    );
    assert(result.account.state.type === 'active');
    assert(result.account.state.data !== null);
    let cell = Cell.fromBase64(result.account.state.data);

    let state = parseNftCollectionState(cell);
    console.log({
        ...state,
        contentRoot: state.contentRoot.hash().toString('base64'),
        nftItemCode: state.nftItemCode.hash().toString('base64'),
    });
})().catch(e => console.error(e));