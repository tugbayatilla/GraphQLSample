# GraphQLSmple

## Technology

- NodeJs
- Express

## Tools

- vscode

## Purpose

Writing books and authors sample application.

## Important Note

- we are using functions instead of object while defining fields in GraphQLObjectType, because of cross reference issue.
- if you define as function, everything will be compiled and will be ready to use.

> For example:

```js
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'represents an author',
    fields: () => ({ //<--- here, there are parentheses encapsulating object. 
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        books: {
            type: new GraphQLList(BookType),
            resolve: (author) => database.books.filter(b => b.authorId === author.id)
        }
    })
})
```

## Setup

> Run these commands in terminal at the same folder

```js
// creates package.json file
#> npm init 

// installs required packages
#> npm i express express-graphql graphql 

// install a package for development environment only to restart node after every save
#> npm i --save-dev nodemon 
```

> Change codes in package.json

```js
// from
 "main": "index.js",
// to 
 "main": "server.js",
```

```js
// from
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },

// to 

"scripts": {
    "devStart": "nodemon server.js"
  },
```

```js
// To start the dev environment
#> npm run devStart
```

```http
http://localhost:5000/graphql
```

```js
//--------Query-------------
{
  books {
    id,
    name,
    authorId
    author{
      id
      name
    }
  }
}
//--------Result-------------
{
  "data": {
    "books": [
      {
        "id": 1,
        "name": "Book1",
        "authorId": 1,
        "author": {
          "id": 1,
          "name": "Author 1"
        }
      },
      {
        "id": 2,
        "name": "Book2",
        "authorId": 2,
        "author": {
          "id": 2,
          "name": "Author 2"
        }
      },
    ...
    ]
  }
}
```

```js
//--------Query-------------
{
  authors {
    id
    name
    books {
      name
    }
  }
}
//--------Result-------------
{
  "data": {
    "authors": [
      {
        "id": 1,
        "name": "Author 1",
        "books": [
          {
            "name": "Book1"
          },
          {
            "name": "Book4"
          }
        ]
      },
      {
        "id": 2,
        "name": "Author 2",
        "books": [
          {
            "name": "Book2"
          },
          {
            "name": "Book5"
          },
          {
            "name": "Book6"
          }
        ]
      },
      ...
    ]
  }
}
```

```js
//--------Query-------------
{
  book(id: 1) {
    name
    author {
      name
    }
  }
}
//--------Result-------------
{
  "data": {
    "book": {
      "name": "Book1",
      "author": {
        "name": "Author 1"
      }
    }
  }
}
```

```js
//--------Query-------------
{
  author(id:2){
    name,
    books{
      name
    }
  }
}
//--------Result-------------
{
  "data": {
    "author": {
      "name": "Author 2",
      "books": [
        {
          "name": "Book2"
        },
        {
          "name": "Book5"
        },
        {
          "name": "Book6"
        }
      ]
    }
  }
}
```

```js
//--------Query-------------
mutation { // <-- you have to use mutation explicity here. default is query
  addBook(name: "New Book", authorId: 1) {
    id
    name
  }
}
//--------Result-------------
{
  "data": {
    "addBook": {
      "id": 11,
      "name": "New Book"
    }
  }
}
```

```js
//--------Query-------------
mutation {
  addAuthor(name: "New Author 1") {
    id
    name
  }
}
//--------Result-------------
{
  "data": {
    "addAuthor": {
      "id": 4,
      "name": "New Author 1"
    }
  }
}
```
