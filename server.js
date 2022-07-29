const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => {
            return "hello";
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const port = process.env.PORT || 4040;

server.listen(port);
