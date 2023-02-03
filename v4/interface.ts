import { simpleNftCollectionAddress } from '../contract/address';
import { NftCollection } from '../contract/NftCollection';
import { client4 } from './client';

(async () => {
    let nftContractSource = NftCollection.fromAddress(simpleNftCollectionAddress);
    let nftCollection = client4.open(nftContractSource);

    let state = await nftCollection.getContractState();
    console.log({
        ...state,
        contentRoot: state.contentRoot.hash().toString('base64'),
        nftItemCode: state.nftItemCode.hash().toString('base64'),
    });
})().catch(e => console.error(e));