const { ApolloServer } = require("apollo-server");

// temp DB
const { products, categories, reviews } = require("./db");

// Type Defs
const { typeDefs } = require("./schema");

// Resolvers
const { Query } = require("./resolvers/Query");
const { Category } = require("./resolvers/Category");
const { Product } = require("./resolvers/Product");

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Category,
        Product,
    },
    context: {
        products: products,
        categories: categories,
        reviews: reviews,
    },
});

const port = process.env.PORT || 4040;

server.listen(port);
