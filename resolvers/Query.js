exports.Query = {
    arrayOfStrings: () => {
        return ["1", "2", "3"];
    },
    products: (parent, { filter }, { products, reviews }) => {
        let filteredProducts = products;

        if (filter) {
            const { onSale, avgRating } = filter;

            if (onSale) {
                filteredProducts = filteredProducts.filter((product) => product.onSale);
            }

            if ([1, 2, 3, 4, 5].includes(avgRating)) {
                filteredProducts = filteredProducts.filter((product) => {
                    let numberOfReviews = 0;
                    let sumRating = 0;

                    sumRating = reviews.reduce((accumulator, currentValue) => {
                        if (currentValue.productId === product.id) {
                            numberOfReviews++;
                            return accumulator + currentValue.rating;
                        } else {
                            return accumulator;
                        }
                    }, 0);

                    const avgProductRating = sumRating / numberOfReviews;
                    return avgProductRating >= avgRating;
                });
            }
        }

        return filteredProducts;
    },
    product: (parent, args, { products }) => {
        const { id } = args;

        return products.find((product) => product.id === id);
    },
    categories: (parent, args, { categories }) => {
        return categories;
    },
    category: (parent, args, { categories }) => {
        const { id } = args;

        return categories.find((category) => category.id === id);
    },
};
