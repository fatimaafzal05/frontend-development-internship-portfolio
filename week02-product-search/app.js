import { getProducts } from "./api.js";

const elements = {
  searchForm: document.querySelector("#search-form"),
  searchInput: document.querySelector("#search-input"),
  categoryFilter: document.querySelector("#category-filter"),
  sortFilter: document.querySelector("#sort-filter"),
  results: document.querySelector("#results"),
  resultCount: document.querySelector("#result-count"),
  loadingState: document.querySelector("#loading-state"),
  emptyState: document.querySelector("#empty-state"),
  errorState: document.querySelector("#error-state"),
  clearFilters: document.querySelector("#clear-filters"),
  retryButton: document.querySelector("#retry-button"),
};

let products = [];
let activeQuery = "";

const formatPrice = (price) => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format(price);

function showState({ loading = false, empty = false, error = false } = {}) {
  elements.loadingState.classList.toggle("hidden", !loading);
  elements.emptyState.classList.toggle("hidden", !empty);
  elements.errorState.classList.toggle("hidden", !error);
  elements.results.classList.toggle("hidden", loading || empty || error);
}

function populateCategories(items) {
  const categories = [...new Set(items.map(({ category }) => category))].sort();
  const options = categories.map((category) => {
    const label = category.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
    return `<option value="${category}">${label}</option>`;
  });

  elements.categoryFilter.insertAdjacentHTML("beforeend", options.join(""));
}

function getFilteredProducts() {
  const query = activeQuery.trim().toLowerCase();
  const selectedCategory = elements.categoryFilter.value;
  const sort = elements.sortFilter.value;

  const matchingProducts = products.filter((product) => {
    const { title, brand = "", category: productCategory, description = "" } = product;
    const searchable = `${title} ${brand} ${productCategory} ${description}`.toLowerCase();
    const matchesQuery = !query || searchable.includes(query);
    const matchesCategory = selectedCategory === "all" || productCategory === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  const sortedProducts = [...matchingProducts];
  const sortRules = {
    "price-low": (a, b) => a.price - b.price,
    "price-high": (a, b) => b.price - a.price,
    rating: (a, b) => b.rating - a.rating,
    name: (a, b) => a.title.localeCompare(b.title),
    featured: (a, b) => b.rating - a.rating || a.price - b.price,
  };

  return sortedProducts.sort(sortRules[sort]);
}

function productCard(product) {
  const { title, brand = "Independent maker", thumbnail, price, rating, category } = product;
  const categoryLabel = category.replaceAll("-", " ");

  return `
    <article class="product-card">
      <div class="product-image-wrap">
        <img src="${thumbnail}" alt="${title}" loading="lazy" />
        <span class="category-tag">${categoryLabel}</span>
      </div>
      <div class="product-info">
        <p class="product-brand">${brand}</p>
        <h3>${title}</h3>
        <div class="product-meta">
          <strong>${formatPrice(price)}</strong>
          <span aria-label="Rated ${rating} out of 5">★ ${rating.toFixed(1)}</span>
        </div>
      </div>
    </article>
  `;
}

function renderProducts() {
  const visibleProducts = getFilteredProducts();
  const countLabel = `${visibleProducts.length} ${visibleProducts.length === 1 ? "product" : "products"}`;
  elements.resultCount.textContent = countLabel;

  if (visibleProducts.length === 0) {
    elements.results.innerHTML = "";
    showState({ empty: true });
    return;
  }

  elements.results.innerHTML = visibleProducts.map(productCard).join("");
  showState();
}

function clearFilters() {
  activeQuery = "";
  elements.searchInput.value = "";
  elements.categoryFilter.value = "all";
  elements.sortFilter.value = "featured";
  renderProducts();
}

async function loadProducts() {
  showState({ loading: true });
  elements.resultCount.textContent = "";

  try {
    products = await getProducts();
    populateCategories(products);
    renderProducts();
  } catch (error) {
    console.error(error);
    showState({ error: true });
  }
}

elements.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  activeQuery = elements.searchInput.value;
  renderProducts();
});

elements.searchInput.addEventListener("input", () => {
  activeQuery = elements.searchInput.value;
  renderProducts();
});

elements.categoryFilter.addEventListener("change", renderProducts);
elements.sortFilter.addEventListener("change", renderProducts);
elements.clearFilters.addEventListener("click", clearFilters);
elements.retryButton.addEventListener("click", loadProducts);

loadProducts();
