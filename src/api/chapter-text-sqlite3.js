import book_names from '../../data/book_names.json'
import sqlite3 from 'sqlite3'

const db = sqlite3.cached.Database('data/textfabric.db')

const ridlistText = (ridlist, requested_texts_set) => {
	return new Promise((resolve, reject) => {
		let ridlistResponse = {}

		let sql_get_parallel_text = "SELECT `rid`, `text` FROM `ParallelText` WHERE `rid` IN (" + ridlist.join(",") + ")"
		db.all(sql_get_parallel_text, (err, rows) => {
			if (err) {
				console.log(err)
				reject("failure on db.all sqlite3")
				return
			}

			rows.forEach(r => {
				ridlistResponse[r.rid] = {
					"net": r.text
				}
			})
			resolve(ridlistResponse)
		})
	})

}

const chapterText = (params) => {
	let requested_texts = new Set(params["texts"] || [])
	if (!requested_texts.has("wlc") && 
			!requested_texts.has("net") && 
			!requested_texts.has("lxx"))
		requested_texts.add("wlc")

	const ref = params.reference
	const minv = book_names[ref.book] * 10000000 + ref.chapter * 1000
	const maxv = book_names[ref.book] * 10000000 + (ref.chapter+1) * 1000
	return new Promise((resolve, reject) => {
		ridlistText(Array.from({length: maxv-minv}, (v, k) => k+minv), requested_texts).then((texts) => {
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
