import { getProductsFromFakeApi } from "./getProducts.js"

let products = [];
const container = document.getElementById("productos-container");

(async () => {
    try {
        products = await getProductsFromFakeApi();
    } catch (error) {
        return "Hubo un error al traer los productos"
    };
})();

setTimeout(() => {
    if (products.length > 0) {
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
        document.getElementById("grow-id").remove();
    };
}, 1000)
