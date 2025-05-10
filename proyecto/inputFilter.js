import { getProductsFromFakeApi } from "./getProducts.js";
import { addToCart } from "./main.js";
import { renderCards } from "./main.js";

const filter = document.querySelector("#input-filter");
const form = document.querySelector("#search");
const btnRefresh = document.querySelector("#close-no-results");

const getProducts = async () => {
  await inputFilter();
};


const handleSearch = (data) => {
  let value = filter.value.toLowerCase();
  let cardLists = document.querySelector("#productos-container");

  cardLists.innerHTML = "";
  let filterCards = data.filter((p) => {
    return (
      p.title.toLowerCase().includes(value) ||
      p.category.toLowerCase().includes(value)
    );
  });
  if (filterCards.length === 0) {
    document.querySelector("#no-results").style.display = "block";
    return;
  } else {
    document.querySelector("#no-results").style.display = "none";
  }
  renderCards(filterCards);
};


export const inputFilter = async () => {
  try {
    let data = await getProductsFromFakeApi();
    handleSearch(data);
  } catch (error) {
    document.querySelector("#error-login").style.display = "block";
  } finally {
    document.getElementById("grow-id")?.remove();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault(); 
  getProducts();     
});

filter.addEventListener("input", async () => {
  if (filter.value === "") {
    await getProducts();
  }
});

filter.addEventListener("search", async () => {
  await getProducts();
});
