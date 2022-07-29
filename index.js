const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
    type Query {
        arrayOfStrings: [String!]! #return array of strings! and can't be null
    }
`;

const resolvers = {
    Query: {
        arrayOfStrings: () => {
            return ["1", "2", "3"];
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const port = process.env.PORT || 4040;

server.listen(port);
