import book_names from '../../data/book_names.json'

const ridlistText = (ridlist, requested_texts_set, db) => {
	return new Promise((resolve, reject) => {
		let ridlistResponse = {}
		const cursor = db.collection("verse_data").find({ rid: { $in: ridlist } })
		console.log("busy processing cursor")
		cursor.each((err, doc) => {
			if (doc != null) {
				ridlistResponse[doc["rid"]] = {}
				if (requested_texts_set.has("wlc"))
					ridlistResponse[doc["rid"]]["wlc"] = doc["wlc"]
				if (requested_texts_set.has("net"))
					ridlistResponse[doc["rid"]]["net"] = doc["net"]
				if (requested_texts_set.has("lxx"))
					ridlistResponse[doc["rid"]]["lxx"] = doc["lxx"]
			} else {
				resolve(ridlistResponse)
			}
		})
	})

}

const chapterText = (params, db) => {
	let requested_texts = new Set(params["texts"] || [])
	if (!requested_texts.has("wlc") && 
			!requested_texts.has("net") && 
			!requested_texts.has("lxx"))
		requested_texts.add("wlc")

	const ref = params.reference
	const minv = book_names[ref.book] * 10000000 + ref.chapter * 1000
	const maxv = book_names[ref.book] * 10000000 + (ref.chapter+1) * 1000
	return new Promise((resolve, reject) => {
		ridlistText(Array.from({length: maxv-minv}, (v, k) => k+minv), requested_texts, db).then((texts) => {
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
