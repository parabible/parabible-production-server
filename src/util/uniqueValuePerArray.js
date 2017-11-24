const removeValue = (value) => {
	return (array_to_purge) => {
		const to_return = array_to_purge.slice()
		const index = to_return.indexOf(value)
		if (index > -1)
			to_return.splice(index, 1)
		return to_return
	}
}

const fastConcatArrays = (arrays) => {
	// Can be done like this: [].concat(...arrays) but it's slightly slower
	let result = []
	for (let i = 0; i < arrays.length; i++) {
		const a = arrays[i]
		for(var j = 0; j < a.length; j++)
			result.push(a[j])
	}
	return result
}
const trimArrayBySize = (arraysSortedBySize) => {
	// If arrays.length >= arrays[-1].length then arrays[-1]
	// can satisfy the uniqueness requirement so we can ignore in tests
	if (arraysSortedBySize.length === 0) {
		return arraysSortedBySize
	}
	else if (arraysSortedBySize[arraysSortedBySize.length - 1].length >= arraysSortedBySize.length) {
		arraysSortedBySize.pop()
		return trimArrayBySize(arraysSortedBySize)
	}
	else {
		return arraysSortedBySize
	}
}
const bruteForceUniques = (arrays) => {
	if (arrays.length === 1) {
		return arrays[0].length > 0
	}
	else {
		const array_slice = arrays.slice(1)
		for (let i in arrays[0]) {
			const test_value = arrays[0][i]
			const trial_array = array_slice.map(removeValue(test_value))
			const trial = bruteForceUniques(trial_array)
			if (trial !== false) {
				return true
			}
		}
		return false
	}
}
const uniqueValuePerArray = (arrays) => {
	if (arrays.length === 1) {
		return arrays[0].length > 0
	}
	else {
		const sortedArrays = arrays.slice().sort((a, b) => a.length > b.length)
		const trimmedArrays = trimArrayBySize(sortedArrays)
		if (trimmedArrays.length === 0) {
			//The arrays have enough matches to guarantee a possible combination
			return true
		}
		else if (trimmedArrays.length === 1) {
			// Only one array remains - if this array has any values, it is possible, otherwise it's not - this array should definitely have a length > 0
			return trimmedArrays[0].length > 0
		}
		// if the union of the arrays is not >= the number of arrays in the set,
		// there's no way for each to have a unique value assigned
		const uniqueSet = new Set(fastConcatArrays(trimmedArrays))
		if (uniqueSet.size < trimmedArrays.length)
			return false
		return bruteForceUniques(trimmedArrays)
	}
}

export { uniqueValuePerArray }