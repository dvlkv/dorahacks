import { TupleBuilder } from 'ton';
import { nftCollectionAddress } from '../contract/address';
import { toncenter } from './client';

(async () => {
    let args = new TupleBuilder();
    args.writeNumber(0);
    
    let { stack } = await toncenter.callGetMethod(
        nftCollectionAddress, 
        'get_nft_address_by_index',
        args.build(),
    );
    let nftAddress = stack.readAddress();

    console.log('nftAddress', nftAddress.toString());
})().catch(e => console.error(e));