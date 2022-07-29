exports.Category = {
    products: (parent, { filter }, { products, reviews }) => {
        const { id } = parent;

        const categoryProduct = products.filter((product) => product.categoryId === id);

        let filteredCategoryProducts = categoryProduct;

        if (filter) {
            const { onSale, avgRating } = filter;

            if (onSale) {
                filteredCategoryProducts = filteredCategoryProducts.filter(
                    (product) => product.onSale
                );
            }

            if ([1, 2, 3, 4, 5].includes(avgRating)) {
                filteredCategoryProducts = filteredCategoryProducts.filter((product) => {
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
        return filteredCategoryProducts;
    },
};
