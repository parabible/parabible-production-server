const removeValue = (value) => {
	return (array_to_purge) => {
		const to_return = array_to_purge.slice()
		const index = to_return.indexOf(value)
		if (index > -1)
			to_return.splice(index, 1)
		return to_return
	}
}

const uniqueValuePerArray = (arrays) => {
	if (arrays.length === 1) {
		return arrays[0].length > 0 ? arrays[0][0] : false
	}
	else {
		const array_slice = arrays.slice(1)
		for (let i in arrays[0]) {
			const test_value = arrays[0][i]
			const trial_array = array_slice.map(removeValue(test_value))
			const trial = uniqueValuePerArray(trial_array)
			if (trial !== false) {
				return test_value + " " + trial
			}
		}
		return false
	}
}

export { uniqueValuePerArray }