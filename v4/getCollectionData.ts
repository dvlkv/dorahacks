import { TupleReader } from 'ton-core';
import { nftCollectionAddress } from '../contract/address';
import { client4 } from './client';


(async () => {
    let { last: { seqno } } = await client4.getLastBlock();

    let result = await client4.runMethod(seqno, nftCollectionAddress, 'get_collection_data');
    let reader = new TupleReader(result.result);

    let nextItemIndex = reader.readBigNumber();
    let contentRoot = reader.readCell();
    let owner = reader.readAddress();

    console.log('nextItemIndex', nextItemIndex.toString());
    console.log('contentRoot', contentRoot);
    console.log('owner', owner);
})().catch(e => console.error(e));