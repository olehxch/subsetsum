#### The Problem

Given an array of numbers arr and a number S, find 4 different numbers in arr that sum up to S.

Write a function that gets arr and S and returns an array with 4 indices of such numbers in arr, or null if no such combination exists.
Explain and code the most efficient solution possible, and analyze its runtime and space complexity.

Hints:
* Any solution of more than O(n^2) is not efficient enough. Please rate your peer feedback accordingly.
* The array is not sorted, and may hold any real number (positive, negative, zero, integer or fraction)

For Example:

```js
const a = [17, 2, 8, 34, 4, 0.5, 42, 6, 3, 7, 15, 14, 9]
S = 20
```

Solution should return:
```
2 + 8 + 4 + 6 = 20
3 + 7 + 6 + 4 = 20
2 + 8 + 3 + 7 = 20
3 + 9 + 6 + 2 = 20
```

#### Introduction
In computer science, the subset sum problem is an important problem in complexity theory and cryptography. The problem is this: given a set (or multiset) of integers, is there a non-empty subset whose sum is zero? For example, given the set {−7, −3, −2, 5, 8}, the answer is yes because the subset {−3, −2, 5} sums to zero. The problem is NP-complete.

#### General info
Main complexity depends on N (number of input numbers, e.g. array length) and P (precision, it's just a number of binary values which represents numbers as discrete values). (note: This N and P have different meaning than *NP problem* ). 

* When *N* is small - just use exhaustive search
* When *P* is small - use dynamic programming algorithms

![](http://i.stack.imgur.com/ia6VB.png)

#### Known solutions
* Recursion - Time O(2^n)  
* Table approach (Dynamic programming) - Time O(k*n) and Space O(k*n))
* Approximation O(n^2*k) time and O(n*k)
* Parallel solution (https://www.cs.rit.edu/~ark/654/team/15/report.pdf)

#### Current solution: Recursion
Run recursion solution in nodejs
```
node case_rec.js
```

Code:
```js
/**
 * Recursive approach
 * Time complexity - O(2^n)
 * Space complexity - O(n), take into account additional stack memory and memory for subsets
 */
const arr = [17, 2, 8, 34, 4, 0.5, 42, 6, 3, 7, 15, 14, 9]
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

```

Issues:
* It slowers down when n > 55

Notes:
* We can't do array preparations (filter or sort etc. array) before run algorithm because it increases time and memory consumption. Also array can include negative numbers which excludes filtering numbers bigger than target S.
* Node.js uses JavaScript VM and it is known that it badly works with *float* numbers - precision, number type convertions, overflows
* To calculate timings *hrtime* (high-precision timer) was used

This solution uses a recursive combinations of all possible sums and picking which are equal to S. This algorithm generates many branches with combinations and test them if they reach the target (S), so if N or S are big - it is better to use other algorithm.

#### Further reading
* http://www.cs.ust.hk/mjg_lib/Classes/COMP572_Fall07/Notes/SS_FPTAS.pdf
* https://eprint.iacr.org/2013/199.pdf
* http://scholarcommons.usf.edu/cgi/viewcontent.cgi?article=4842&context=ujmm
* https://www.cs.rit.edu/~ark/654/team/15/report.pdf
* http://www.cs.ucf.edu/~dmarino/ucf/cop3502/lec_biswas/recursion12.pdf

#### Links helped to find possible solutions
* https://en.wikipedia.org/wiki/Subset_sum_problem
* https://en.wikipedia.org/wiki/Dynamic_programming
* http://www.geeksforgeeks.org/backttracking-set-4-subset-sum
* http://k2code.blogspot.in/2012/01/given-integer-array-and-number-x-find.html
* http://www.geeksforgeeks.org/write-a-c-program-that-given-a-set-a-of-n-numbers-and-another-number-x-determines-whether-or-not-there-exist-two-elements-in-s-whose-sum-is-exactly-x
* https://en.wikipedia.org/wiki/Approximation_algorithm
* http://www.skorks.com/2011/02/algorithms-a-dropbox-challenge-and-dynamic-programming
