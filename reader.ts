import { Cell, Slice, TupleItem, Address, beginCell } from 'ton-core';
import { Maybe } from 'ton-core/dist/utils/maybe';

interface TupleBuilder {
    writeNumber(v?: Maybe<bigint | number>): void;
    writeBoolean(v?: Maybe<boolean>): void;
    writeBuffer(v?: Maybe<Buffer | null | undefined>): void;
    writeString(v?: Maybe<string>): void; 
    writeCell(v?: Maybe<Cell | Slice>): void;
    writeSlice(v?: Maybe<Cell | Slice>): void;
    writeBuilder(v?: Maybe<Cell | Slice>): void;
    writeTuple(v?: Maybe<TupleItem[]>): void;
    writeAddress(v?: Maybe<Address>): void;
    build(): TupleItem[];
}

interface TupleReader {
    constructor(items: TupleItem[]): TupleReader;

    get remaining(): number;

    peek(): TupleItem;
    pop(): TupleItem;
    skip(num: number): TupleReader;

    readBigNumber(): bigint;
    readBigNumberOpt(): bigint | null;
    readNumber(): number;
    readNumberOpt(): number | null;
    readBoolean(): boolean;
    readBooleanOpt(): boolean | null;
    readAddress(): Address;
    readAddressOpt(): Address | null;
    readCell(): Cell;
    readCellOpt(): Cell | null;
    readTuple(): TupleReader;
    readTupleOpt(): TupleReader | null;
    readBuffer(): Buffer;
    readBufferOpt(): Buffer | null;
    readString(): string;
    readStringOpt(): string | null;
}