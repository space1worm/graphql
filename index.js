const { ApolloServer, gql } = require("apollo-server");

const { products, categories, reviews } = require("./data");

const typeDefs = gql`
    type Query {
        arrayOfStrings: [String!]! #return array of strings! and can't be null
        products: [Product!]!
        product(id: String!): Product
    }

    type Product {
        id: ID!
        name: String!
        description: String!
        quantity: Int!
        image: String!
        price: Float!
        onSale: Boolean!
    }
`;

const resolvers = {
    Query: {
        arrayOfStrings: () => {
            return ["1", "2", "3"];
        },
        products: () => {
            return products;
        },
        product: (parent, args, context) => {
            const { id } = args;

            return products.find((product) => product.id === id);
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const port = process.env.PORT || 4040;

server.listen(port);
