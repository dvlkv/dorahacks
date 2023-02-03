import { TupleBuilder, TupleReader } from 'ton-core';
import { nftCollectionAddress } from '../contract/address';
import { client4 } from './client';


(async () => {
    let { last: { seqno } } = await client4.getLastBlock();

    let args = new TupleBuilder();
    args.writeNumber(0);
    
    let result = await client4.runMethod(
        seqno, 
        nftCollectionAddress, 
        'get_nft_address_by_index',
        args.build()
    );
    let reader = new TupleReader(result.result);

    let nftAddress = reader.readAddress();

    console.log('nftAddress', nftAddress.toString());
})().catch(e => console.error(e));