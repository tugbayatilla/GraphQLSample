const express = require('express');
const { GraphQLSchema } = require('graphql');
const expressGraphQL = require('express-graphql');
const app = express()
const types = require('./app/types')

// schema definition
const schema = new GraphQLSchema({
    query: types.RootQueryType, // <--- to query
    mutation: types.RootMutationType // <-- to put,delete,update
})

// routing
app.use('/graphql', expressGraphQL.graphqlHTTP({
    schema: schema,
    graphiql: true
}))

// starting server
app.listen(5000., () => { console.log('Server is running...') })
