import { mergeDepChain } from "./mergeDepChain";

export function mergeDepChains(chains: string[][]): string[][] {
    return chains.reduce((mergedChains, chain) => {
        let merged = false;
        for (let i = 0; i < mergedChains.length; i++) {
            const mergedChain = mergeDepChain(mergedChains[i], chain);
            if (mergedChain.length === 1) {
                mergedChains[i] = mergedChain[0];
                merged = true;
                break;
            }
        }
        if (mergedChains.length==0 || !merged) {
            mergedChains.push(chain);
        }
        if(merged) mergedChains = mergeDepChains(mergedChains)
        return mergedChains;
    }, [] as string[][]);
}