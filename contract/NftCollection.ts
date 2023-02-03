import { Address, Cell, Contract, ContractABI, contractAddress, ContractProvider, TupleBuilder } from 'ton-core';
import { Maybe } from 'ton-core/dist/utils/maybe';
import { assert } from '../utils/assert';
import { parseNftCollectionState } from './parseState';

export class NftCollection implements Contract {
    address: Address;
    init?: Maybe<{ code: Cell; data: Cell; }>;
    abi?: Maybe<ContractABI>;

    private constructor(address: Address, init?: Maybe<{ code: Cell; data: Cell; }>) {
        this.address = address;
        this.init = init;
    }

    static fromAddress(address: Address) {
        return new NftCollection(address);
    }

    static fromInit(init: { code: Cell; data: Cell; }) {
        return new NftCollection(contractAddress(0, init), init);
    }

    async getCollectionData(provider: ContractProvider) {
        let { stack } = await provider.get('get_collection_data', []);
        return {
            nextItemIndex: stack.readBigNumber(),
            contentRoot: stack.readCell(),
            owner: stack.readAddress(),
        };
    }

    async getNftAddressByIndex(provider: ContractProvider, index: number) {
        let args = new TupleBuilder();
        args.writeNumber(index);
        let { stack } = await provider.get('get_nft_address_by_index', args.build());
        return stack.readAddress();
    }

    async getNftContent(provider: ContractProvider, index: number, individualContent: Cell) {
        let args = new TupleBuilder();
        args.writeNumber(index);
        args.writeCell(individualContent);

        let { stack } = await provider.get('get_nft_content', args.build());
        return stack.readCell();
    }

    async getContractState(provider: ContractProvider)  {
        let state = await provider.getState();

        assert(state.state.type === 'active');
        assert(!!state.state.data);
        let dataCell = Cell.fromBoc(state.state.data)[0];

        return parseNftCollectionState(dataCell);
    }
}