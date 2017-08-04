import book_names from '../data/book_names.json'

const Reference = (r) => {
	
	return book_names[r.book]
}
export default Reference