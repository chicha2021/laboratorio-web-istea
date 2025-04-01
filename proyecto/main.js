import { getProductsFromFakeApi } from "./getProducts.js"

let products = [];
const container = document.getElementById("productos-container");

(async () => {
    try {
        products = await getProductsFromFakeApi();
        console.log(products)
    } catch (error) {
        return "Hubo un error al traer los productos"
    };
})();

setTimeout(() => {
    products.forEach(product => {
        const card = document.createElement("li");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card" style="display:flex; align-items:center;">
                <img src=${product.image} class="card-img-top" alt=${product.title} >
                <div class="card-body">
                <h5 class="card-title">$ ${product.price}</h5>
                <p class="card-text">${product.title} </p>
                <a href="#" class="btn btn-primary">Buy</a>
                </div>
            </div>
        `;
        container.appendChild(card);
        container.classList.add('cards-container');
    });
}, 1000)
