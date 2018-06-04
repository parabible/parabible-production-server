import book_names from '../../data/book_names.json'
import { _wordsThatMatchQuery } from './term-search'

const ridlistText = (ridlist, requestedTextsSet, db) => {
	return new Promise((resolve, reject) => {
		let ridlistResponse = {}
		const cursor = db.collection("verse_data").find({ rid: { $in: ridlist } })
		cursor.each((err, doc) => {
			if (err)
				console.log("ERROR", err)
			if (doc != null) {
				ridlistResponse[doc["rid"]] = {}
				if (requestedTextsSet.has("wlc"))
					ridlistResponse[doc["rid"]]["wlc"] = doc["wlc"]
				if (requestedTextsSet.has("net"))
					ridlistResponse[doc["rid"]]["net"] = doc["net"]
				if (requestedTextsSet.has("lxx"))
					ridlistResponse[doc["rid"]]["lxx"] = doc["lxx"]
			} else {
				resolve(ridlistResponse)
			}
		})
	})
}

const chapterText = (params, db) => {
	const ref = params.reference

	let requestedTexts = new Set(params["texts"] || [])
	if (!requestedTexts.has("wlc") && 
			!requestedTexts.has("net") && 
			!requestedTexts.has("lxx") && 
			!requestedTexts.has("sbl"))
		requestedTexts.add("net")

	let highlights = {}
	if (params.hasOwnProperty("search_terms")) {
		params.search_terms.forEach(st => {
			highlights[st.uid] = _wordsThatMatchQuery(st.data, [ref.book], ref.chapter)
		})
	}


	
	const minv = book_names[ref.book] * 10000000 + ref.chapter * 1000
	const maxv = book_names[ref.book] * 10000000 + (ref.chapter+1) * 1000
	return new Promise((resolve, reject) => {
		ridlistText(Array.from({length: maxv-minv}, (v, k) => k+minv), requestedTexts, db).then((texts) => {
			const returnVal = {
				"reference": params.reference,
				"text": texts
			}
			if (Object.keys(highlights).length > 0)
				returnVal["highlights"] = highlights
			resolve(returnVal)
		}).catch((err) => {
			reject(err)
		})
	})
}
export { ridlistText, chapterText }
