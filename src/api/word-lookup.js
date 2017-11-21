const to_exclude = new Set([
	"wid",
	"trailer_utf8"
])

const wordLookup = (params, db) => {
	return new Promise((resolve, reject) => {
		// validate param
		if (!params.hasOwnProperty("wid")) {
			reject({"error": "Invalid request, needs an object like { wid: n }."})
		}
		else if (!Number.isInteger(params.wid) || params.wid < 1) {
			reject({"error": "Invalid wid, must be a positive integer."})
		}
		else {
			const cursor = db.collection("word_data").findOne({ wid: params.wid }, (err, doc) => {
				if (err) {
					console.log("error with wid lookup")
					reject(err)
				}
				if (!doc || !doc.hasOwnProperty("features")) {
					console.log("no doc:", doc)
					reject("wid not found")
				}
				let features = doc["features"]
				to_exclude.forEach(e => {
					if (features.hasOwnProperty(e))
						delete features[e]
				})
				resolve({
					"wid": params.wid,
					"results": features
				})
			})
		}
	})
}
export { wordLookup }