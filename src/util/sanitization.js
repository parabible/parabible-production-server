import { text_id, chapters_per_book } from '../../data/text_data'

const book_names = new Set(Object.keys(chapters_per_book))

const isKindOfInteger = n => ((n%1)===0)

const sanitiseReference = reference => {
    if (!("book" in reference)) {
        throw({
            "error": "Your reference doesn't have a 'book' value.",
            "options": Object.keys(chapters_per_book)
        })
    }
    if (!book_names.has(reference.book)){
        throw({
            "error": "Your reference doesn't have a valid 'book' value.",
            "options": Object.keys(chapters_per_book)
        })
    }
    if (!("chapter" in reference)) {
        throw({
            "error": "Your reference doesn't have a 'chapter' value.",
            "options": "You should have an integer: 0 < n < (number of chapters in `book`)"
        })
    }
    if (!isKindOfInteger(reference.chapter)) {
        throw({
            "error": `Your chapter reference "${reference.chapter}" is not an integer.`,
            "options": "You should have an integer: 0 < n < (number of chapters in `book`)"
        })
    }
    if (reference.chapter < 0 || reference.chapter > chapters_per_book[reference.book]) {
        throw({
            "error": `Your chapter reference "${reference.chapter}" is not in the range of ${reference.book} (${chapters_per_book[reference.book]}).`,
            "options": "You should have an integer: 0 < n < (number of chapters in `book`)"
        })
    }
    reference.chapter = +reference.chapter
    return reference
}

const sanitiseTextsAndGetIds = texts => {
    const textsAreAllValid = texts.reduce((a, v) => a && text_id[v] > 0)
    if (!textsAreAllValid) {
        throw({
            "error": "The `texts` parameter must be an array of strings.",
            "options": Object.keys(text_id)
        })
    }
    return texts.map(v => ({name: v, id: text_id[v]}))
}

const sanitiseNodes = nodes => {                            
    const nodeArray = []
    try {
        nodes.forEach(n => nodeArray.push(+n))
        return nodeArray
    }
    catch (e) {
        throw({ "error": "The `nodes` parameter must be an array of integers." })
    }
}

export { sanitiseTextsAndGetIds, sanitiseNodes, sanitiseReference }