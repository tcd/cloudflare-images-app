/**
 * Used to manually block async code. Must use with `await`
 *
 * @param {number} ms - milliseconds to block
 *
 * @example
 * // block for 5 seconds
 * await sleep(5_000)
 */
export const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
