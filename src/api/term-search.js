import { arrayDiff, arrayIntersect } from '../util/util'
import { uniqueValuePerArray } from '../util/uniqueValuePerArray'
import { ridlistText } from './chapter-text'

import word_data from '../../data/word_data_map'
import tree_data from '../../data/tree_data'
import range_node_data from '../../data/range_node_data'
import book_names from '../../data/book_names'

const doLog = true
const consoleLog = (...debug) => {
	if (doLog) {
		console.log(...debug)
	}
}

const heatUpVerseWords = (verse_words, hot_set, lukewarm_set) => {
	return verse_words.map(accentUnit => 
		accentUnit.map(w => {
			if (hot_set.has(w["wid"]))
				w["temperature"] = 2
			else if (lukewarm_set.has(w["wid"]))
				w["temperature"] = 1
			return w
		})
	)
}

const _doFilter = (filter, wordNodes, chapterFilter=0) => {
	if (filter.length > 0) {
		const chapterOffset = chapterFilter * 1000
		const ridFilter = filter.map(f => book_names[f] * 10000000 + chapterOffset)

		const extent = chapterFilter === 0 ? 10000000 : 1000
		return wordNodes.filter(w => {
			const rid = tree_data[w].verse
			return ridFilter.reduce((a, v) => a || v <= rid && rid < v + extent, false)
		})
	}
	else {
		return wordNodes
	}
}
const _wordsThatMatchQuery = (query, filter, chapterFilter=0) => {
	let query_matches = []
	Object.keys(query).forEach((k) => {
		const v = query[k].normalize()
		query_matches.push(_doFilter(filter, word_data[k][v], chapterFilter))
	})
	return arrayIntersect(...query_matches)
}
const _queryForWids = ({queryArray, search_range, search_filter}) => {
	let word_matches = []
	let exclusions = []
	let current_match = -1
	let starttime = process.hrtime()
	queryArray.forEach((query) => {
		// consoleLog("BENCHMARK Q: foreach cycle ", process.hrtime(starttime))
		const query_matches = _wordsThatMatchQuery(query.data, search_filter)

		if (query.invert)
			exclusions.push(...query_matches)
		else
			word_matches.push(query_matches)
	})
	consoleLog("BENCHMARK Q: done with foreach", process.hrtime(starttime))

	const sr_matches = word_matches.map(m => m.map(n => tree_data[n][search_range]))
	const sr_exclusions = exclusions.map(m => tree_data[m][search_range])
	const match_intersection = arrayIntersect(...sr_matches)
	const range_matches = arrayDiff(match_intersection, sr_exclusions)

	const range_matches_with_unique_limit = range_matches.map(r => {
		const word_match_indices = sr_matches.map((q, qi) => q.reduce((a, e, i) => (e === r) ? a.concat(word_matches[qi][i]) : a, []))
		const should_include = uniqueValuePerArray(word_match_indices) !== false ? word_match_indices : false
		return {
			sr_node: r,
			matching_word_nodes: should_include
		}
	}).filter(m => m.matching_word_nodes !== false)
	consoleLog("BENCHMARK Q: done intersecting", process.hrtime(starttime))
	consoleLog("RESULTS:", range_matches_with_unique_limit.length)
	return range_matches_with_unique_limit
	// return { word_matches, range_matches }
}

const termSearch = (params, db)=> {
	return new Promise((resolve, reject) => {
		// let starttime = process.hrtime()
		// consoleLog("BENCHMARK: starting now", process.hrtime(starttime))
		const matches = _queryForWids({
			queryArray: params["query"],
			search_range: params["search_range"] || "clause",
			search_filter: params["search_filter"] || []
		})
		// consoleLog("BENCHMARK: getting matching word sets", process.hrtime(starttime))
		const words_in_matching_ranges_set = new Set(matches.reduce((c, m) => c.concat(...range_node_data[m.sr_node]["wids"]), []))
		const all_word_matches = matches.reduce((c,n) => c.concat(...n.matching_word_nodes), [])
		const actual_matching_words_set = new Set(arrayIntersect(all_word_matches, words_in_matching_ranges_set))

		// Allowed texts
		const paramTexts = params["texts"] || []
		const allowedTexts = ["wlc", "net", "lxx"]
		let textsToReturn = allowedTexts.filter(f => paramTexts.indexOf(f) !== -1)
		if (textsToReturn.length === 0)
			textsToReturn = ["wlc", "net"]

		// consoleLog("BENCHMARK: now formulating final data", process.hrtime(starttime))
		const ridmatches = matches.reduce((c, n) => c.concat(...range_node_data[n.sr_node]["rids"]), [])
		ridlistText(ridmatches, new Set(textsToReturn), db).then((ridMatchText) => {
			Object.keys(ridMatchText).forEach(rid => {
				ridMatchText[rid]["wlc"] = heatUpVerseWords(
					ridMatchText[rid]["wlc"],
					actual_matching_words_set,
					words_in_matching_ranges_set
				)
			})
			// consoleLog("BENCHMARK: results now being processed", process.hrtime(starttime))
			const match_result_data = matches.map((m) => {
				const ridTextObject = {}
				range_node_data[m.sr_node]["rids"].forEach(rid => {
					ridTextObject[rid] = ridMatchText[rid]
				})
				return {
					"node": m.sr_node,
					"verses": range_node_data[m.sr_node]["rids"],
					"text": ridTextObject
				}
			})

			const response = {
				"length": match_result_data.length,
				"results": match_result_data
			}
			resolve(response)
			// consoleLog("BENCHMARK: done", process.hrtime(starttime))
		}).catch()
	})
}

const collocationSearch = (params)=> {
	const grouping_key = "voc_utf8"
	return new Promise((resolve, reject) => {
		// TODO: the syntax of _queryForWids has changed since this line...
		// !!!!!!!!!!!!!!
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

export { termSearch, collocationSearch, _wordsThatMatchQuery }