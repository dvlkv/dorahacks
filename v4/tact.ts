import { Address, beginCell, storeStateInit } from 'ton-core';
import { jettonContractAddress } from '../tact/address';
import { SampleJetton } from '../tact/output/jetton_SampleJetton';
import { client4 } from './client';

const address = Address.parse('EQA-daKmzkx5nLMKT465D_-uyhwgBTEucMeyvfGLfzHoWspv');

(async () => {
    let jettonContractSource = SampleJetton.fromAddress(jettonContractAddress);
    let jettonContract = client4.open(jettonContractSource);

    console.log('Owner:', await jettonContract.getOwner());
    console.log('Your wallet:', await jettonContract.getGetWalletAddress(address));
    let jettonData = await jettonContract.getGetJettonData();
    console.log('Jetton data:', {
        totalSupply: jettonData.totalSupply.toString(),
        mintable: jettonData.mintable,
        contentHash: jettonData.content?.hash().toString('base64'),
        walletCodeHash: jettonData.walletCode.hash().toString('base64'),
    });
})().catch(e => console.error(e));