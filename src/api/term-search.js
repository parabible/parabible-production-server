import { arrayDiff, arrayIntersect } from '../util/util'
import { ridlistText } from './chapter-text'

import word_data from '../../data/word_data_map'
import tree_data from '../../data/tree_data'
import range_node_data from '../../data/range_node_data'

const doLog = false
const consoleLog = (...debug) => {
	if (doLog) {
		console.log(...debug)
	}
}

const heatUpVerseWords = (verse_words, hot_set, lukewarm_set) => {
	return verse_words.map(w => {
		if (hot_set.has(w["wid"]))
			w["temperature"] = 2
		else if (lukewarm_set.has(w["wid"]))
			w["temperature"] = 1
		return w
	})
}

const _queryForWids = ({queryArray, search_range}) => {
	let word_matches = []
	let exclusions = []
	let current_match = -1
	let starttime = process.hrtime()
	queryArray.forEach((query) => {
		consoleLog("BENCHMARK Q: foreach cycle ", process.hrtime(starttime))
		let invert = false
		if ("invert" in query) {
			if (query["invert"] == "t") {
				invert = true
			}
			delete query["invert"]
		}
		let query_matches = []
		Object.keys(query).forEach((k) => {
			const v = query[k]
			query_matches.push(word_data[k][v])
		})
		const intersected_query_matches = arrayIntersect(...query_matches)
		if (invert)
			exclusions.push(...intersected_query_matches)
		else
			word_matches.push(intersected_query_matches)
	})
	consoleLog("BENCHMARK Q: done with foreach", process.hrtime(starttime))

	const sr_matches = word_matches.map(m => m.map(n => tree_data[n][search_range]))
	const sr_exclusions = exclusions.map(m => m.map(n => tree_data[n][search_range]))
	const match_intersection = arrayIntersect(...sr_matches)
	const range_matches = arrayDiff(match_intersection, sr_exclusions)
	consoleLog("BENCHMARK Q: done intersecting", process.hrtime(starttime))
	consoleLog("RESULTS:", range_matches.length)
	return { word_matches, range_matches }
}

const termSearch = (params, db)=> {
	return new Promise((resolve, reject) => {
		let starttime = process.hrtime()
		consoleLog("BENCHMARK: starting now", process.hrtime(starttime))
		const { word_matches, range_matches } = _queryForWids({
			queryArray: params["query"],
			search_range: params["search_range"] || "clause"
		})
		const words_in_matching_ranges_set = new Set(range_matches.reduce((c, m) => c.concat(...range_node_data[m]["wids"]), []))
		consoleLog("BENCHMARK: getting matching word sets", process.hrtime(starttime))
		const actual_matching_words_set = new Set(arrayIntersect(Array.prototype.concat(...word_matches), words_in_matching_ranges_set))

		consoleLog("BENCHMARK: now formulating final data", process.hrtime(starttime))
		const ridmatches = range_matches.reduce((c, n) => c.concat(...range_node_data[n]["rids"]), [])
		ridlistText(ridmatches, new Set(["wlc", "net"]), db).then((ridMatchText) => {
			consoleLog("BENCHMARK: results now being processed", process.hrtime(starttime))
			const match_result_data = range_matches.map((m) => {
				return {
					"node": m,
					"verses": range_node_data[m]["rids"],
					"text": range_node_data[m]["rids"].map(rid => ({[rid]: ridMatchText[rid]}))
				}
			})

			const response = {
				"length": match_result_data.length,
				"results": match_result_data
			}
			resolve(response)
			consoleLog("BENCHMARK: done", process.hrtime(starttime))
		}).catch()
	})
}

const collocationSearch = (params)=> {
	const grouping_key = "voc_utf8"
	return new Promise((resolve, reject) => {
		const { word_matches } = _queryForWids({
			queryArray: params["query"],
			search_range: params["search_range"]
		})
		// params["whitelist"] == ["Verb"]
		const word_match_morph= word_matches.map(wid => word_data[wid][grouping_key])
		const tally_match_data = word_match_morph.reduce((c, k) => {
			if (!c.hasOwnProperty(k))
				c[k] = 0
			c[k]++
			return c
		}, {})

		const response = {
			"length": Object.keys(tally_match_data).length,
			"results": tally_match_data
		}
		resolve(response)
	})
}

export { termSearch, collocationSearch }