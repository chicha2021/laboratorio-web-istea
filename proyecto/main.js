import { getProductsFromFakeApi } from "./getProducts.js";
import { inputFilter } from "./inputFilter.js";
import { openProductModal } from "./openProductModal.js";
import { showToast } from './getToast.js'
import { renderCart } from "./getShoppingCart.js";

let products = [];
const container = document.getElementById("productos-container");

const getCartFromStorage = () => JSON.parse(localStorage.getItem("cart-list")) || [];

const updateCartStorage = (cart) => {
  localStorage.setItem("cart-list", JSON.stringify(cart));
};

const updateCartQtyBadge = () => {
  const cart = getCartFromStorage();
  const productsInCart = cart.reduce((sum, p) => sum + p.quantity, 0);
  const qtyCart = document.querySelector('#qty-cart');
  if (productsInCart > 0) {
    qtyCart.style.display = 'inline-block';
    qtyCart.textContent = productsInCart;
  } else {
    qtyCart.style.display = 'none';
  }
};

export const addToCart = (product) => {
  let cart = getCartFromStorage();
  const index = cart.findIndex(p => p.id === product.id);

  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartStorage(cart);
  renderCart();
  showToast("Se ha agregado el producto al carrito", "success");
};

export const renderCards = (products) => {
  products.forEach(product => {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `
        <div class="card" style="display:flex; align-items:center;">
            <img src=${product.image} class="card-img-top" alt=${product.title} >
            <div class="card-body">
                <h5 class="card-title">$ ${product.price}</h5>
                <p class="card-text">${product.title.substring(0,40)} </p>
                <p class="credit-price">Hasta 6 cuotas de $${(product.price / 6).toFixed(2)} </p>
            </div>
            <div class="button-container">
                    <span class="cart-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                    </svg>
                    </span>
                    <span class="cart-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="gray" class="bi bi-cart3" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg>
                    </span>
                <button href="#" class="btn btn-primary button">Comprar</button>
            </div>
        </div>
    `;
    container.appendChild(card);
    container.classList.add('cards-container');
    const cartButtons = card.querySelectorAll('.cart-button');
    cartButtons[1].addEventListener('click', () => addToCart(product));

    card.addEventListener('click', (e) => {
      if (e.target.closest('.cart-button') || e.target.closest('button')) return;
      openProductModal(product, addToCart);
    });
});
};

(async () => {
  updateCartQtyBadge();
    try {
        products = await getProductsFromFakeApi();
    } catch (error) {
        return "Hubo un error al traer los productos"
    };
})();

setTimeout(() => {
    if (products.length > 0) {
        renderCards(products);
        document.getElementById("grow-id").remove();
    };
}, 1000);