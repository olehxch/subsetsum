/**
 * Recursive approach
 * Time complexity - O(2^n)
 * Space complexity - O(n)
 */

const arr = [17, 2, 8, 34, 4, 0.5, 42, 6, 3, 7, 15, 14, 9]
// const arr = [17, 2, 8, 34, 4, 0.5, 42, 6, 3, 7, 15, 14, 9, 0.5, 4, 125, 0.3, -10, 8, 6, 47, 23, 65, 78, 2, 5, 8, 4, 23, 10, -5, -3, -0.57, 0.789, -5, -98, 0.657, -98.2, 4, 3, 2, 1, 4, 5, 4, 7, -6, 0, 78, 32]

const sum = 20

let result = null
function subset_sum(numbers, target, partial) {
    let s, n, remaining

    partial = partial || []
    s = partial.reduce( (a, b) => a + b, 0)

    if (s > target || partial.length > 4) return null
    
    // check if the partial sum is equals to target
    if (s === target && partial.length == 4) {
        if(!result) result = []
        result.push(partial)
        // console.log("%s=%s", partial.join("+"), target)
    }

    for (let i = 0; i < numbers.length; i++) {
        n = numbers[i]
        remaining = numbers.slice(i + 1)
        subset_sum(remaining, target, partial.concat([n]))
    }

    return result
}

// lets calculate time
const startTime = process.hrtime()
const res = subset_sum(arr, sum)
const diff = process.hrtime(startTime)

console.log(`Result:`, res)
console.log(`Time: ${ (diff[0] * 1e9 + diff[1]) / 1000000} ms`)
