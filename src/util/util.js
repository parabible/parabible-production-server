const convertSetToArray = (s) => {
	let retArr = []
	s.forEach(v => retArr.push(v))
	return retArr
}

const setDiff = (setA, setB) => {
	return new Set([...setA].filter(x => !setB.has(x)))
}
const arrayDiff = (arrA, arrB) => {
	let a = new Set(arrA)
	let b = new Set(arrB)
	return convertSetToArray(setDiff(a,b))
}

function setIntersect(...sets) {
	if (!sets.length) return new Set();
	const i = sets.reduce((m, s, i) => s.size < sets[m].size ? i : m, 0);
	const [smallest] = sets.splice(i, 1);
	const res = new Set();
	for (let val of smallest)
		if (sets.every(s => s.has(val)))
			 res.add(val);
	
	return res
}
function arrayIntersect(...arrays) {
	let sets = arrays.map(a => new Set(a))
	return convertSetToArray(setIntersect(...sets))
}


export { arrayIntersect, arrayDiff, setIntersect, setDiff, convertSetToArray }
