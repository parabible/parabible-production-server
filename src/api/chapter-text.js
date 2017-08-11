import book_names from '../../data/book_names.json'

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
	let requestedTexts = new Set(params["texts"] || [])
	console.log(requestedTexts)
	if (!requestedTexts.has("wlc") && 
			!requestedTexts.has("net") && 
			!requestedTexts.has("lxx"))
		requestedTexts.add("wlc")

	const ref = params.reference
	const minv = book_names[ref.book] * 10000000 + ref.chapter * 1000
	const maxv = book_names[ref.book] * 10000000 + (ref.chapter+1) * 1000
	return new Promise((resolve, reject) => {
		ridlistText(Array.from({length: maxv-minv}, (v, k) => k+minv), requestedTexts, db).then((texts) => {
			resolve({
				"reference": params.reference,
				"text": texts
			})
		}).catch((err) => {
			reject(err)
		})
	})
}
export { ridlistText, chapterText }
