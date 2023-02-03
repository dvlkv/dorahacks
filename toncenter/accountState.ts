import { Cell, TupleBuilder, TupleReader } from 'ton-core';
import { nftCollectionAddress, simpleNftCollectionAddress } from '../contract/address';
import { parseNftCollectionState } from '../contract/parseState';
import { toncenter } from './client';

function assert(x: boolean): asserts x {
    if (x !== true) {
        throw new Error('Expected string');
    }
}


(async () => {
    let result = await toncenter.getContractState(
        simpleNftCollectionAddress
    );

    assert(result.state === 'active');
    assert(result.data !== null);
    let cell = Cell.fromBoc(result.data)[0];

    let state = parseNftCollectionState(cell);
    console.log({
        ...state,
        contentRoot: state.contentRoot.hash().toString('base64'),
        nftItemCode: state.nftItemCode.hash().toString('base64'),
    });
})().catch(e => console.error(e));