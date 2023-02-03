import { Address, beginCell, storeStateInit } from 'ton-core';
import { jettonContractAddress } from '../tact/address';
import { SampleJetton } from '../tact/output/jetton_SampleJetton';

(async () => {
    let jetton = SampleJetton.fromAddress(jettonContractAddress);
})().catch(e => console.error(e));