import { nftCollectionAddress } from '../contract/address';
import { toncenter } from './client';

(async () => {
    let { stack } = await toncenter.callGetMethod(
        nftCollectionAddress, 
        'get_collection_data'
    );
    let nextItemIndex = stack.readBigNumber();
    let contentRoot = stack.readCell();
    let owner = stack.readAddress();

    console.log('nextItemIndex', nextItemIndex.toString());
    console.log('contentRoot', contentRoot);
    console.log('owner', owner);
})().catch(e => console.error(e));