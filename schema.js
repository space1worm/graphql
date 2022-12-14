const { gql } = require("apollo-server");

exports.typeDefs = gql`
    type Query {
        arrayOfStrings: [String!]! #return array of strings! and can't be null
        products(filter: ProductsInputFilter): [Product!]! #return array of Product Type! and can't be null
        product(id: String!): Product # return product with specific Id which cant be null and return value should Product Type or Null
        categories: [Category!]! #return array of Category Type! and can't be null
        category(id: ID!): Category #return category with specific Id which cant be null and return value should be Category type or Null
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
        reviews: [Review!]!
    }

    type Category {
        id: ID!
        name: String!
        products(filter: ProductsInputFilter): [Product!]
    }

    type Review {
        id: ID!
        date: String!
        title: String!
        comment: String!
        rating: Int!
    }

    input ProductsInputFilter {
        onSale: Boolean
        avgRating: Int
    }
`;
