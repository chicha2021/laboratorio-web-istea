const showCartNav = document.querySelectorAll('.show-cart')[0];
const showCartBtn = document.querySelectorAll('.show-cart')[1];
const sidebar = document.getElementById("cart-sidebar");
const cartList = document.getElementById("cart-list");
const totalDisplay = document.getElementById("cart-total");
const qtyCart = document.getElementById("qty-cart");
const closeCartBtn = document.getElementById("close-cart");

const getCartFromStorage = () => JSON.parse(localStorage.getItem("cart-list")) || [];

showCartBtn.addEventListener("click", () => {
  showCart();
});

showCartNav.addEventListener("click", () => {
  showCart();
});

closeCartBtn.addEventListener("click", () => {
  sidebar.classList.remove("visible");
});

const showCart = () => {
  sidebar.classList.toggle("visible");
  renderCart();
};

document.addEventListener("click", (event) => {
  const isClickInsideSidebar = sidebar.contains(event.target);
  const isClickOnCartBtn = showCartBtn.contains(event.target);
  const isClickOnCartNav = showCartNav.contains(event.target);

  if (!isClickInsideSidebar && !isClickOnCartBtn && !isClickOnCartNav) {
    sidebar.classList.remove("visible");
  }
});


const renderCart = () => {
  let cart = getCartFromStorage();
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = "<p>No hay productos en el carrito.</p>";
  } else {
    cart.forEach(product => {
      const isDisabled = product.quantity <= 1 ? "disabled" : "";
      const card = document.createElement("div");
      card.className = "cart-card";
      card.innerHTML = `
        
          <div class="cart-card-img" style="display: flex; align-items: center;">
            <img src="${product.image}" alt="${product.title}" style="width: 80px; height: auto; margin-right: 10px;">
          </div>
          <div class="cart-card-info" style="margin-top: 10px;">
            <div>
              <strong>${product.title}</strong><br>
              <p>Total: <strong>$${(product.price * product.quantity).toFixed(2)}</p>
            </div>
            <div class="quantity-control d-flex justify-content-end" style="display: inline-flex; align-items: center; gap: 5px; margin-bottom: 10px;">
              <button data-id="${product.id}" class="btn-minus btn btn-sm btn-secondary" style="width: 30px; height: 30px; display: flex; justify-content: center; align-items: center;" onclick="changeQuantity(${product.id}, -1)" ${isDisabled}>-</button>
              <p><span style="min-width: 20px; text-align: center;">${product.quantity}</span></p>
              <button class="btn btn-sm btn-primary" style="width: 30px; height: 30px; display: flex; justify-content: center; align-items: center;" onclick="changeQuantity(${product.id}, 1)">+</button>
            <button class="btn btn-sm btn-danger" style="width: 30px; height: 30px; display: flex; justify-content: center; align-items: center;" onclick="removeProduct(${product.id})">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1V2.5a.5.5 0 0 0 .5.5H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V3h1.5a.5.5 0 0 0 0-1V2a1 1 0 0 0-1-1H10.5a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1H2.5z"/>
              </svg>
            </button>
            </div>
          </div>
      `;
      cartList.appendChild(card);
    });
  }

  updateTotal();
  updateCartQtyBadge();
  updateCartButtons(cart);
}

window.changeQuantity = (id, plusOrMinus) => {
  let cart = getCartFromStorage();
  const product = cart.find(p => p.id === id);
  if (!product) return;

  product.quantity += plusOrMinus;
  if (product.quantity < 1) {
    product.quantity = 1;
  }
  updateCartStorage(cart);
  renderCart();
};

window.removeProduct = (id) => {
  let cart = getCartFromStorage();
  const index = cart.findIndex(product => product.id === id);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  updateCartStorage(cart);
  renderCart();
};

window.removeAllProducts = () => {
  removeCartStorage();
  renderCart();
  showToast("Ha eliminado todos los productos del carrito", "danger");
  closeSidebar();
};

window.checkout = () => {
  removeCartStorage();
  renderCart();
  showToast("Ha finalizado la compra", "success");
  closeSidebar();
};

const closeSidebar = () => {
  sidebar.classList.remove("visible");
}

const updateCartStorage = (cart) => {
  localStorage.setItem("cart-list", JSON.stringify(cart));
};

const removeCartStorage = () => {
  localStorage.removeItem("cart-list");
}

const updateTotal = () => {
  let cart = getCartFromStorage();
  const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
  
  const totalDisplay = document.querySelector("#cart-total"); 
  totalDisplay.textContent = `$${total.toFixed(2)}`;

  if (cart.length === 0) {
    totalDisplay.textContent = "$0.00";
  }
};

const updateCartButtons = (cart) => {
  const btnRemoveAll = document.getElementById("btn-remove-all");
  const btnCheckout = document.getElementById("btn-checkout");

  const hasProducts = cart.length > 0;

  btnRemoveAll.disabled = !hasProducts;
  btnCheckout.disabled = !hasProducts;
}

const updateCartQtyBadge = () => {
  let cart = getCartFromStorage();
  const totalQty = cart.reduce((sum, p) => sum + p.quantity, 0);
  if (totalQty > 0) {
    qtyCart.style.display = 'inline-block';
    qtyCart.textContent = totalQty;
  } else {
    qtyCart.style.display = 'none';
  }
}

const showToast = (message, color) => {
  const toast = document.getElementById('toast');
  if(color === 'success') {
    toast.classList.add("bg-success", "text-white");
  } else if (color === 'danger') {
    toast.classList.add("bg-danger", "text-white");
  }
  toast.querySelector('.toast-body').textContent = message;
  const bsToast = new bootstrap.Toast(toast, {
    delay: 3000
  });
  bsToast.show();
}