const { ApolloServer, gql } = require("apollo-server");

const { products, categories, reviews } = require("./data");

const typeDefs = gql`
    type Query {
        arrayOfStrings: [String!]! #return array of strings! and can't be null
        products: [Product!]!
        product(id: String!): Product
        categories: [Category!]!
        category(id: ID!): Category
    }

    type Product {
        id: ID!
        name: String!
        description: String!
        quantity: Int!
        image: String!
        price: Float!
        onSale: Boolean!
        category: Category
    }

    type Category {
        id: ID!
        name: String!
        products: [Product!]
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
        categories: (parent, args, context) => {
            return categories;
        },
        category: (parent, args, context) => {
            const { id } = args;

            return categories.find((category) => category.id === id);
        },
    },

    Category: {
        products: (parent, args, context) => {
            const { id } = parent;

            return products.filter((product) => product.categoryId === id);
        },
    },

    Product: {
        category: (parent, args, context) => {
            const { categoryId } = parent;

            return categories.find((category) => category.id === categoryId);
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const port = process.env.PORT || 4040;

server.listen(port);
