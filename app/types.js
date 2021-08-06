const database = require('./database')
const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull } = require('graphql');

// book type definition
const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'represents a book',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
        author: {
            type: AuthorType,
            resolve: (book) => database.authors.find(a => a.id === book.authorId)
        }
    })
})

// author type definition
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'represents an author',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        books: {
            type: new GraphQLList(BookType),
            resolve: (author) => database.books.filter(b => b.authorId === author.id)
        }
    })
})

// root query type definition
const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root Query Type',
    fields: () => ({
        book: {
            type: BookType,
            description: 'represents a book',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (_, args) => database.books.find(b => b.id === args.id)
        },
        books: {
            type: new GraphQLList(BookType),
            description: 'list of the all books',
            resolve: () => database.books
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: 'list of the all authors',
            resolve: () => database.authors
        },
        author: {
            type: AuthorType,
            description: 'represents a author',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (_, args) => database.authors.find(b => b.id === args.id)
        }
    })
})

// root query type definition
const RootMutationType = new GraphQLObjectType({
    name: 'RootMutationType',
    description: 'Root Mutation Type',
    fields: () => ({
        addBook: {
            type: BookType,
            description: 'add a book',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                authorId: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: (_, args) => {
                const book = {
                    id: database.books.length + 1,
                    name: args.name,
                    authorId: args.authorId
                }
                database.books.push(book)
                return book
            }
        },
        addAuthor: {
            type: AuthorType,
            description: 'add an author',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (_, args) => {
                const author = {
                    id: database.authors.length + 1,
                    name: args.name,
                }
                database.authors.push(author)
                return author
            }
        }
    })
})

module.exports = {
    RootQueryType,
    RootMutationType,
    BookType,
    AuthorType
}