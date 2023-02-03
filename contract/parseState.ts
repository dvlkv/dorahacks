import { Cell } from 'ton-core';

// ;; storage scheme
// ;; default#_ royalty_factor:uint16 royalty_base:uint16 royalty_address:MsgAddress = RoyaltyParams;
// ;; storage#_ owner_address:MsgAddress next_item_index:uint64
// ;;           ^[collection_content:^Cell common_content:^Cell]
// ;;           nft_item_code:^Cell
// ;;           royalty_params:^RoyaltyParams
// ;;           = Storage;


export function parseRoyaltyParams(cell: Cell) {
    let cs = cell.beginParse();
    return {
        royaltyFactor: cs.loadUint(16),
        royaltyBase: cs.loadUint(16),
        royaltyAddress: cs.loadAddress(),
    };
}

export function parseNftCollectionState(dataCell: Cell) {
    let cs = dataCell.beginParse();
    return {
        owner: cs.loadAddress(),
        nextItemIdx: cs.loadUintBig(64),
        contentRoot: cs.loadRef(),
        nftItemCode: cs.loadRef(),
        royaltyParams: parseRoyaltyParams(cs.loadRef()),
    };
}