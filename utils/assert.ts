export function assert(x: boolean): asserts x {
    if (x !== true) {
        throw new Error('Expected to be true');
    }
}