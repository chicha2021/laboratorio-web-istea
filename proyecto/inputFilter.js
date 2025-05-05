import { getProductsFromFakeApi } from "./getProducts.js";

const filter = document.querySelector("#input-filter");
const form = document.querySelector("#search");

export const inputFilter = async () => {
  let data = await getProductsFromFakeApi();

  const handleSearch = () => {
    let value = filter.value.toLowerCase();
    let cardLists = document.querySelector("#productos-container");

    cardLists.innerHTML = "";

    let filterCards = data.filter((p) => {
      return (
        p.title.toLowerCase().includes(value) ||
        p.category.toLowerCase().includes(value)
      );
    });

    filterCards.forEach((p) => {
      const card = document.createElement("li");
      card.classList.add("card");

      card.innerHTML = `
        <div class="card" style="display:flex; align-items:center;">
          <img src=${p.image} class="card-img-top" alt=${p.title} >
          <div class="card-body">
            <h5 class="card-title">$ ${p.price}</h5>
            <p class="card-text">${p.title} </p>
            <a href="#" class="btn btn-primary">Buy</a>
          </div>
        </div>
      `;
      cardLists.appendChild(card);
      cardLists.classList.add("cards-container");
    });
  };

  
  form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    handleSearch();     
  });
};