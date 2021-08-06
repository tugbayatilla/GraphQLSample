const authors = [
    { id: 1, name: 'Author 1' },
    { id: 2, name: 'Author 2' },
    { id: 3, name: 'Author 3' }
]

const books = [
    { id: 1, name: 'Book1', authorId: 1 },
    { id: 2, name: 'Book2', authorId: 2 },
    { id: 3, name: 'Book3', authorId: 3 },
    { id: 4, name: 'Book4', authorId: 1 },
    { id: 5, name: 'Book5', authorId: 2 },
    { id: 6, name: 'Book6', authorId: 2 },
    { id: 7, name: 'Book7', authorId: 3 },
    { id: 8, name: 'Book8', authorId: 3 },
    { id: 9, name: 'Book9', authorId: 3 }
]

module.exports = {
    authors,
    books
}