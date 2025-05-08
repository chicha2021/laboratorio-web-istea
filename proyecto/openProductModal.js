export function openProductModal(product, addToCart) {
    const modal = document.getElementById("product-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalImage = document.getElementById("modal-image");
    const closeModal = document.getElementById("close-modal");
    const closeButton = document.getElementById("close-button");
    const addToCartBtn = document.getElementById("add-to-cart-btn");
  
    modalTitle.textContent = product.title;
    modalDescription.textContent = product.description;
    modalImage.src = product.image;
    modalImage.alt = product.title;
  
    modal.style.display = "block";
  
    addToCartBtn.onclick = () => {
      addToCart(product);
      modal.style.display = "none";
    };
  
    closeModal.onclick = () => modal.style.display = "none";
    closeButton.onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
      if (event.target === modal) modal.style.display = "none";
    };
  }