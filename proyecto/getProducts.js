
export const getProductsFromFakeApi = () => {
    const products = fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(products => products);
    return products;
};

